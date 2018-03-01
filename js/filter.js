/* eslint-disable no-return-assign,guard-for-in,consistent-return */
'use strict';
(function () {
  var MIDDLE = '20000';
  var LOW = '10000';
  var HIGH = '50000';

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

  var removePins = function () {
    var map = document.querySelector('.map');
    var mapPin = map.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPin.length; i++) {
      if (mapPin[i].classList.contains('map__pin--main') !== true) {
        mapPin[i].remove();
      }
    }
  };

  filtersForm.addEventListener('change', function (evt) {
    var target = evt.target;
    var value = target.value;

    for (var key in window.filter) {
      if (key === 'housing-type') {
        if (value === 'any') {
          return window.filter[key] = value;
        }
        if (value === 'flat') {
          return window.filter[key] = value;
        }
        if (value === 'house') {
          return window.filter[key] = value;
        }
        return window.filter[key] = value;
      }

      if (key === 'housing-price') {
        if (value === MIDDLE) {
          return window.filter[key] = value;
        }
        if (value === LOW) {
          return window.filter[key] = value;
        }
        if (value === HIGH) {
          return window.filter[key] = value;
        }
        return window.filter[key] = value;
      }

      if (key === 'housing-rooms') {
        if (value === '1') {
          return window.filter[key] = value;
        }
        if (value === '2') {
          return window.filter[key] = value;
        }
        if (value === '3') {
          return window.filter[key] = value;
        }
        return window.filter[key] = value;
      }

      if (key === 'housing-guests') {
        if (value === '1') {
          return window.filter[key] = value;
        }
        if (value === '2') {
          return window.filter[key] = value;
        }
        return window.filter[key] = value;
      }


    }
    removePins();
    window.render.renderPins(window.data.getFilteredAdvers());


  });
/*
      if (key === 'filter-dishwasher') {
        return console.log(window.filter[key] = value);
      }

      if (key === 'filter-wifi') {
        return window.filter[key] = value;
      }

      if (key === 'filter-parking') {
        return window.filter[key] = value;
      }

      if (key === 'filter-elevator') {
        return window.filter[key] = value;
      }

      if (key === 'filter-conditioner') {
        return console.log(window.filter[key] = value);

      }
    }

*/
  // через цикл for in ( так как filter Object)
  // перебирать объект фильтр и обработать все условия  для селекторов и чекбоксов
  // Использовать type, checked
  //

  // Далее вне цикла for in Через дебонс запускаем повторную отрисовку. Например:
  // 1. удалить все старые пины map__pin, не задеть мейн и другие элементы window.util.removePins() - нужно создать функцию
  // 2. отрисовать пины window.render.renderPins(window.data.getFilteredAdvers());
  // 3. показать пины, или переделать конструкцию с показом пинов, по умолчанию render пин делает все hidden
  // вынести showAdverts в window.util.showAdverts();

})();
