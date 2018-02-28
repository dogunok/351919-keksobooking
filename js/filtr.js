'use strict';
(function () {

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


})();
