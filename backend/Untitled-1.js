const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim"),
  rp = require("request-promise");
(async () => {
  let ds_ids = await db
    .view("daclarator", "okrug", {
      include_docs: false,
      keys: [
        [85, "Республика Тува (Тыва)"],
        [91, "Чувашская республика - Чувашия"],
        [108, "Ханты-Мансийский автономный округ — Югра"],
        [109, "Республика Крым*"],
        [110, "Севастополь*"]
      ],
      reduce: false
    })
    .then(resp => resp.rows);

  ds_ids = ds_ids.map(row => row.id);
  let dict_of_change = {
    z85: "Республика Тыва",
    z91: "Чувашская Республика",
    z108: "Ханты-Мансийский автономный округ",
    z110: "Севастополь",
    z109: "Республика Крым"
  };
  let completed = 0;
  while (ds_ids.length > 0) {
    if (completed && completed % 1000 === 0)
      console.log(`[${new Date().toJSON()}] ${completed} declarations updated`);
    let resp = await rp({
      uri: `http://admin:vbyjvtn@tseluyko.ru:5984/mim/_all_docs?keys=["${ds_ids
        .splice(0, ds_ids.length > 100 ? 100 : ds_ids.length)
        .join('","')}"]&include_docs=true`,
      json: true
    });
    let _part = resp.rows.map(row => row.doc);
    let d2update = [];
    for (let idx = 0; idx < _part.length; idx++) {
      let d = _part[idx];
      if (!d.main) console.log(d);
      if (dict_of_change["z" + d.main.office.region.id]) {
        d.main.office.region.name =
          dict_of_change["z" + d.main.office.region.id];
        d2update.push(d);
      } else throw Error("unexpected data");
    }
    d2update.length && (await db.bulk({ docs: d2update }).then(console.log));
    completed++;
  }
  // Если код уже существует, то смотрим счётчик, много ли вариантов, у кого больше вариантов, тот и верный,
  // Также проверяем словарь замены
})();
