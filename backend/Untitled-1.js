// by_country
function (doc) {
  if (!doc) emit('wrong', 1);
  if (!doc || !doc.country) return;
  emit(doc.country, 1);
}

// by_income
function (doc) {
  if (!doc || !Array.isArray(doc.incomes) || !doc.main || !doc.main.year) return;
  var income = 0;
  var _income = 0;
  for (var idx=0; idx < doc.incomes.length; idx++){
    if (!income && !doc.incomes[idx].relative) income = doc.incomes[idx].size;
    if (!_income) _income = 1;
    _income += doc.incomes[idx].size;
  }
  emit([false, doc.main.year], income);
  emit([true, doc.main.year], _income);
}
// by_possessions
function (doc) {
  if (!doc || !doc.main || !doc.main.person || !doc.main.person.family_name || !doc.main.year) return;
  var title = doc.main.person.family_name
  if (doc.main.person.given_name) title += ' ' + doc.main.person.given_name.substr(0,1).toUpperCase() + '.'
  if (doc.main.person.patronymic_name) title += ' ' + doc.main.person.patronymic_name.substr(0,1).toUpperCase() + '.'
  if (Array.isArray(doc.real_estates) && doc.main.year >= (new Date().getFullYear()-1)){
    var square = 0;
    for (var idx = 0; idx < doc.real_estates.length; idx++){
      if (doc.real_estates[idx] && doc.real_estates[idx].square) square += doc.real_estates[idx].share ? doc.real_estates[idx].square * doc.real_estates[idx].share : doc.real_estates[idx].square;
    }
    if (square > 1) emit('real_estates', [title,square])
  } 
  if (Array.isArray(doc.vehicles) && doc.vehicles.length && doc.main.year >= (new Date().getFullYear()-2)){
    emit('vehicles', [title, doc.vehicles.length])
  }
}
// by_regions
function (doc) {
  if (!doc || !doc.main || !doc.main.year || !doc.main.office|| !doc.main.office.region|| doc.main.year < (new Date().getFullYear()-2)) return;
  if (doc.main.year < (new Date().getFullYear()-1)){
    if (Array.isArray(doc.incomes) && doc.incomes.length){
      var income = 0;
      for(var idx=0; idx < doc.incomes.length; idx++){
        if (doc.incomes[idx] && doc.incomes[idx].size) income += doc.incomes[idx].size
      }
      emit([doc.main.office.region.name, 'incomes'], income)
    }
    if (Array.isArray(doc.real_estates) && doc.real_estates.length){
      var real_estates = 0;
      for(var idx=0; idx < doc.real_estates.length; idx++){
        if (doc.real_estates[idx] && doc.real_estates[idx].square) real_estates += doc.real_estates[idx].share ? doc.real_estates[idx].square *doc.real_estates[idx].share : doc.real_estates[idx].square
      }
      emit([doc.main.office.region.name, 'real_estates'], real_estates)
    }
  }
  if (Array.isArray(doc.vehicles) && doc.vehicles.length){
    emit([doc.main.office.region.name, 'vehicles'], doc.vehicles.length)
  }
}