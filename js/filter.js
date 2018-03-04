'use strict';
(function () {
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
    for (var key in window.filter) {

      if (!window.filter.hasOwnProperty(key)) {
        continue;
      }
      if (target.id !== key) {
        continue;
      }
      if (target.type === 'select-one') {
        window.filter[key] = value === 'any' ? null : value;
      }
      if (target.type === 'checkbox') {
        window.filter[key] = !target.checked ? null : value;
      }


    }
    var article = document.querySelector('article');
    article.classList.add('hidden');

    window.debounce(function () {
      window.util.removePins();
      window.render.renderPins(window.data.getFilteredAdvers());
      window.util.showAdverts();
    });

  });

})();
