const fs = require("fs"),
  nano = require("nano")("http://admin:vbyjvtn@tseluyko.ru:5984"),
  db = nano.db.use("mim");

(async () => {
  let ds_ids = await db.list({
    include_docs: false,
    reduce: false
  });
  let okreg = {};
  while (ds_ids.rows.length) {
    let part =
      ds_ids.rows.length > 500
        ? ds_ids.rows.splice(0, 500)
        : ds_ids.rows.splice(0, ds_ids.rows.length);
    console.log(ds_ids.rows.length, part.length);
    part = await db.list({
      include_docs: false,
      reduce: false,
      keys: part.map(row => row._id)
    });

    part.rows.map(row => {
      if (
        row &&
        row.main &&
        row.main.office &&
        row.main.office.region &&
        row.main.office.region.id
      ) {
        okreg["id" + row.main.office.region.id] = row.main.office.region.name;
      }

      return;
    });
    // await db.bulk({
    //   docs: part.map(item => {
    //     if (!item.main) item._deleted = true;
    //     else {
    //       item._id = parseStr(
    //         item.main && item.main.person ? item.main.person.id : item._id
    //       );
    //     }

    //     return item;
    //   })
    // });
  }
  console.log(okreg);
})();
