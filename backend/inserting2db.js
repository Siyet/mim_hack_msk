const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

let decls = JSON.parse(fs.readFileSync("tmp/declarations.json"));

console.log(decls.length);
