const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

(async () => {
  let ds_ids = (await db.view("daclarator", "okrug", {
    include_docs: false,
    keys: [
      [85, "Республика Тува (Тыва)"],
      [91, "Чувашская республика - Чувашия"],
      [108, "Ханты-Мансийский автономный округ — Югра"],
      [109, "Республика Крым*"],
      [110, "Севастополь*"]
    ],
    reduce: false
  })).map(row => row.id);
  let dict_of_change = {
    z85: "Республика Тыва",
    z91: "Чувашская Республика",
    z108: "Ханты-Мансийский автономный округ",
    z110: "Севастополь",
    z109: "Республика Крым"
  };
  let completed = 0;
  while (ds_ids.length > 0) {
    if (completed % 1000 === 0)
      console.log(`[${new Date().toJSON()}] ${completed} declarations updated`);
    let resp = await fetch(
      `http://admin:vbyjvtn@tseluyko.ru:5984/mim/_all_docs?keys=["${ds_ids
        .splice(0, ds_ids.length > 1000 ? 1000 : ds_ids.length)
        .join('","')}"]`
    );
    let _part = resp.rows.map(row => row.doc);
    let d2update = [];
    for (let idx = 0; idx < _part.length; idx++) {
      let d = _part[idx];
      if (dict_of_change["z" + d.main.office.region.id]) {
        d.main.office.region.name =
          dict_of_change["z" + d.main.office.region.id];
        d2update.push(d);
      } else throw Error("unexpected data");
    }
    d2update.length && (await db.bulk({ docs: d2update }).then(console.log));
  }
  // Если код уже существует, то смотрим счётчик, много ли вариантов, у кого больше вариантов, тот и верный,
  // Также проверяем словарь замены
})();
