let aaa = {
  _id: "0916aa1a7ca84fcff338ce3f94000b85",
  _rev: "1-8e8aef1fa7edf6fd625523b3bd67f00f",
  main: {
    person: {
      id: 3460,
      name: "Котлярович Людмила Васильевна",
      family_name: "Котлярович",
      given_name: "Людмила",
      patronymic_name: "Васильевна",
      gender: "F"
    },
    office: {
      id: 1405,
      name: "Гусевский - городской округ",
      url: "http://www.admgusev.ru/",
      type: {
        id: 20,
        name: "Муниципальный, без структуры"
      },
      region: {
        id: 46,
        name: "Калининградская область"
      }
    },
    party: null,
    year: 2013,
    document_type: {
      id: 1,
      name: "Антикоррупционная декларация"
    }
  },
  incomes: [
    {
      size: 669943,
      relative: null,
      comment: ""
    }
  ],
  real_estates: [
    {
      name: "",
      square: 66.7,
      country: "Россия",
      region: null,
      comment: "",
      type: {
        id: 3,
        name: "Жилой дом"
      },
      own_type: {
        id: 22,
        name: "Совместная собственность"
      },
      share: 0.5,
      relative: null
    },
    {
      name: "",
      square: 300,
      country: "Россия",
      region: null,
      comment: "",
      type: {
        id: 1,
        name: "Земельный участок"
      },
      own_type: {
        id: 20,
        name: "Индивидуальная"
      },
      share: null,
      relative: {
        id: 2,
        name: "Супруг(а)"
      }
    },
    {
      name: "",
      square: 66.7,
      country: "Россия",
      region: null,
      comment: "",
      type: {
        id: 3,
        name: "Жилой дом"
      },
      own_type: {
        id: 21,
        name: "Долевая собственность"
      },
      share: 0.5,
      relative: {
        id: 2,
        name: "Супруг(а)"
      }
    }
  ],
  vehicles: [],
  savings: [],
  stocks: [],
  bonds: [],
  spendings: [],
  country: "Russia"
};

function test(doc) {
  if (!doc || !Array.isArray(doc.incomes) || !doc.main || !doc.main.year)
    return;
  var income = 0;
  var _income = 0;
  for (var idx = 0; idx < doc.incomes.length; idx++) {
    if (!income && !doc.incomes[idx].relative) income = doc.incomes[idx].size;
    if (!_income) _income = 1;
    _income += doc.incomes[idx].size;
  }
  console.log([false, doc.main.year], income);
  console.log([true, doc.main.year], _income);
}
test(aaa);
