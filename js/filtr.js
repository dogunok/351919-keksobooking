'use strict';
(function () {
/*
window.data = {
    setData: function (data) {
      // присвоить каждому объекту свой id, который присвоить в атрибут при рендеринге.
      // так как после фильтрации порядок изменится, нужно индексировать данные самостоятельно,
      // чтобы не потерялась связь данных и пинов в верстке.
      posts = data;
    },
    getAdverts: function () {
      return posts;
    },
    getAdvert: function (id) {
      return posts[id];
    },
    getFilteredAdvers: function () {
      // вспомогательные функции лучше здесь.
      // выносить в util необязательно

      return posts.filter(function (post) {
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...in
        // перебираем циклом for in наш фильтр который заполняем в обработчике формы в модуле filter
        // если значение фильтра содержит определенный элемент в post, то возвращаем false, тем самым убираем элемент из выборки
        // при этом сам posts остается таким же каким и был
        // в условии можно использовать вспомогательными функциями, чтобы сделать код более читаемым и понятным
        // в конце возвращаем true - значит ниодин фильтр не совпал
      });
    }
  };


  var filtersForm = document.querySelector('.map__filters');

  window.filter = {
    'housing-type': null,
    'housing-price': null,
    'housing-rooms': null,
    'housing-guests': null,
    'filter-wifi': null,
    'filter-dishwasher': null,
    'filter-parking': null,
    'filter-washer': null,
    'filter-elevator': null,
    'filter-conditioner': null
  };


  filtersForm.addEventListener('change', function (evt) {
    var target = evt.target;
    var value = target.value;
    for (var key in window.data.getAdverts()) {
      var wizard = key.map(function (value2) {
        return value2.type;
        console.log(wizard);
      });
      console.log(wizard);
    }
    // через цикл for in ( так как filter Object)
    // перебирать объект фильтр и обработать все условия  для селекторов и чекбоксов
    // Использовать type, checked
    //

    // Далее вне цикла for in Через дебонс запускаем повторную отрисовку. Например:
    // 1. удалить все старые пины map__pin, не задеть мейн и другие элементы window.util.removePins() - нужно создать функцию
    // 2. отрисовать пины window.render.renderPins(window.data.getFilteredAdvers());
    // 3. показать пины, или переделать конструкцию с показом пинов, по умолчанию render пин делает все hidden
    // вынести showAdverts в window.util.showAdverts();
  }); */


  /*
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  // var housingFeatures = document.querySelector('#housing-features');
  // var feature = housingFeatures.querySelectorAll('input');
  var MIDDLE = '20000';
  var LOW = '10000';
  var HIGH = '50000';

  var array = window.data.getAdverts();
  var type = array.map(function (it) {
    return it.offer.type;
  });

  housingType.addEventListener('change', function (evt) {
    var value = evt.target.value;
    if (value === 'any') {
      console.log(type);
    }
    if (value === 'flat') {

    }
    if (value === 'house') {

    }


  });


  housingPrice.addEventListener('change', function (evt) {
    var value = evt.target.value;
    if (value === MIDDLE) {

    }
    if (value === LOW) {

    }
    if (value === HIGH) {

    }

  });

  housingRooms.addEventListener('change', function (evt) {
    var value = evt.target.value;
    if (value === '1') {

    }
    if (value === '2') {

    }
    if (value === '3') {

    }

  });

  housingGuests.addEventListener('change', function (evt) {
    var value = evt.target.value;

    if (value === '1') {

    }
    if (value === '2') {

    }
    return console.log(value);

  });
*/

})();
