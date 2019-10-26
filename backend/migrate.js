const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

(async () => {
  let ds = await db.view("index", "ny_ns", { keys: ["declaration"] });
  console.log(ds);
})();
