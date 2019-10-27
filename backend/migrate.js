const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

(async () => {
  let ds = await db.view("index", "by_country", {
    include_docs: false,
    reduce: false
  });

  while (ds.rows.length) {
    let part =
      ds.rows.length > 1000
        ? ds.rows.splice(0, 1000)
        : ds.rows.splice(0, db.rows.length);
    await db.bulk({
      docs: part.map(item => {
        item._id =
          (item.main && item.main.person && item.main.person.id) || item._id;
      })
    });
  }
})();
