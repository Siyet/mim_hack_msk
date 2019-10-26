const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

// let decls = JSON.parse(fs.readFileSync("tmp/declarations.json"));

// console.log(decls.length);

const StreamArray = require("stream-json/streamers/StreamArray");
const path = require("path");

const jsonStream = StreamArray.withParser();

//You'll get json objects here
//Key is an array-index here
let part = [],
  idx = 1;
jsonStream.on("data", ({ key, value }) => {
  value.ns = "declaration";
  part.push(value);
  if (part.length < 1000) return;
  console.log(
    `\n[${new Date().toJSON()}] -=-=-=-= Bulk saving part ${idx} =-=-=-=-\n`
  );
  db.bulk({ docs: part.splice(0, 500) }).then(resp => {
    if (!resp || !resp.ok) console.log(resp);
  });
  idx += 1;
});

jsonStream.on("end", () => {
  console.log(`\n[${new Date().toJSON()}] -=-=-=-= All done =-=-=-=-\n`);
  if (!part.length) return;
  db.bulk({ docs: part }).then(console.log);
});

const filename = path.join(__dirname, "tmp/declarations.json");
fs.createReadStream(filename).pipe(jsonStream.input);
