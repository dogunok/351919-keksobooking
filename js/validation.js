/* eslint-disable valid-jsdoc */
'use strict';
(function () {
  var MINPRICES = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var ROOM_CAPACITY_VALIDATION = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var guest = document.querySelector('#capacity');
  var room = document.querySelector('#room_number');

  /**
   * функция валидации списка типа жилья
   */
  var typeChangeHandler = function (evt) {
    var value = evt.target.value;
    for (var type in MINPRICES) {
      if (type === value) {
        adPrice.min = MINPRICES[value];
        adPrice.placeholder = MINPRICES[value];
      }
    }
  };


  /**
   * Функция события заезда и выезда
   * @param evt
   */
  var timeChangeHandler = function (evt) {
    synchronizeTime(evt.target.value);
  };


  /**
   * Функция синхронизации заезда и выезда
   * @param time
   */
  var synchronizeTime = function (time) {
    timeout.value = time;
    timein.value = time;
  };


  var guestChangeHandler = function (evt) {
    var value = evt.target.value;
    var newCapacity = ROOM_CAPACITY_VALIDATION[value];
    for (var i = 0; i < guest.children.length; i++) {
      guest.children[i].setAttribute('disabled', 'disabled');
      guest.children[i].removeAttribute('selected');
      if (~newCapacity.indexOf(guest.children[i].value)) {
        guest.children[i].removeAttribute('disabled');
        guest.children[i].setAttribute('selected', 'selected');
      }
    }
  };


  timein.addEventListener('change', timeChangeHandler);
  timeout.addEventListener('change', timeChangeHandler);
  adType.addEventListener('change', typeChangeHandler);
  room.addEventListener('change', guestChangeHandler);


})();
