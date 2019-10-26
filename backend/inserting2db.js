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
jsonStream.on("data", ({ key, value }) => {
  console.log(key, value);
});

jsonStream.on("end", () => {
  console.log("All done");
});

const filename = path.join(__dirname, "tmp/declarations.json");
fs.createReadStream(filename).pipe(jsonStream.input);
