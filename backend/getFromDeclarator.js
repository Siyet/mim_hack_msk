// https://declarator.org/media/dumps/declarations.json

const request = require("request"),
  // nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  fs = require("fs");
// db = nano.db.use("mim"),
// PART_QUOTA = 500;
// (async () => {
if (!process.argv || process.argv.length < 2 || !process.argv[2])
  throw "script need argument with target url";
let f_name = process.argv[2].split("/").slice(-1);
console.log(f_name);
request
  .get(process.argv[2])
  .on("error", function(err) {
    console.error(err);
  })
  .pipe(fs.createWriteStream(f_name[0]));
// .pipe(request.put("http://mysite.com/img.png"));
// console.time("getting declarations");
// let declarations = await rp({
//   uri: "https://declarator.org/media/dumps/declarations.json",
//   json: true // Automatically parses the JSON string in the response
// });
// console.timeEnd("getting declarations");
// if (!Array.isArray(declarations)) {
//   throw ("declarations not array:", declarations);
// }
// console.log(
//   `[${new Date().toJSON()}] recieved ${
//     declarations.length
//   } declarations, inserting into db...`
// );
// let idx = 1;
// while (declarations.length) {
//   console.time(`load part ${idx}`);
//   let part2insert =
//     declarations.length > PART_QUOTA
//       ? declarations.splice(0, PART_QUOTA)
//       : declarations.splice(0, declarations.length);
//   let resp = db.bulk({ docs: part2insert });
//   console.log(resp);
//   console.timeEnd(`load part ${idx}`);
// }
// })();
