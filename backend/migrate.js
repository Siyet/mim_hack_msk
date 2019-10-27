const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

(async () => {
  let ds = await db.list({
    include_docs: false,
    reduce: false
  });

  while (ds.rows.length) {
    let part =
      ds.rows.length > 1000
        ? ds.rows.splice(0, 1000)
        : ds.rows.splice(0, ds.rows.length);
    console.log(ds.rows.length, part.length);

    await db.bulk({
      docs: part.map(item => {
        if (!item.main) item._deleted = true;
        else {
          item._id = parseStr(
            item.main && item.main.person ? item.main.person.id : item._id
          );
        }

        return item;
      })
    });
  }
})();
