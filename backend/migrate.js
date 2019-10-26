const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

(async () => {
  let ds = await db.view("index", "by_ns", {
    keys: ["declaration"],
    reduce: false
  });
  while (ds.rows.length) {
    await db.bulk;
  }
})();
