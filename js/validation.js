/* eslint-disable valid-jsdoc */
'use strict';
(function () {
  var adTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var MINLENGHT_TITLE = '30';
  var MAXLENGHT_TITLE = '100';
  var MIN_PRICE_INDEX_0 = '1000';
  var MIN_PRICE_INDEX_1 = '0';
  var MIN_PRICE_INDEX_2 = '5000';
  var MIN_PRICE_INDEX_3 = '10000';

  adTitle.setAttribute('required', 'required');
  adTitle.setAttribute('minlength', MINLENGHT_TITLE);
  adTitle.setAttribute('maxlength', MAXLENGHT_TITLE);

  /**
   * функция валидации списка типа жилья
   */
  var typeChangeHandler = function () {

    if (adType.selectedIndex === 0) {
      adPrice.setAttribute('min', MIN_PRICE_INDEX_0);
    }
    if (adType.selectedIndex === 1) {
      adPrice.setAttribute('min', MIN_PRICE_INDEX_1);
    }
    if (adType.selectedIndex === 2) {
      adPrice.setAttribute('min', MIN_PRICE_INDEX_2);
    }
    if (adType.selectedIndex === 3) {
      adPrice.setAttribute('min', MIN_PRICE_INDEX_3);
    }

  };

  adType.addEventListener('change', typeChangeHandler);
  /**
   * Функция события заезда и выезда
   * @param evt
   */
  var timeChangeHandler = function (evt) {
    synchronizeTime(evt.target.value);
  };

  timein.addEventListener('change', timeChangeHandler);
  timeout.addEventListener('change', timeChangeHandler);
  /**
   * Функция синхронизации заезда и выезда
   * @param time
   */
  var synchronizeTime = function (time) {
    timeout.value = time;
    timein.value = time;
  };

  var guest = document.querySelector('#capacity');
  var room = document.querySelector('#room_number');
  var guests = guest.querySelectorAll('option');

  var guestChangeHandler = function () {
    for (var i = 0; i < room.length; i++) {
      guests[i].removeAttribute('disabled', 'disabled');
      guests[i].removeAttribute('selected', 'selected');
      if (room.value === '1') {
        guest[0].setAttribute('disabled', 'disabled');
        guest[1].setAttribute('disabled', 'disabled');
        guest[3].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('selected', 'selected');
      }
      if (room.value === '2') {
        guest[0].setAttribute('disabled', 'disabled');
        guest[3].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('selected', 'selected');
      }
      if (room.value === '3') {
        guest[3].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('selected', 'selected');
      }
      if (room.value === '100') {
        guest[0].setAttribute('disabled', 'disabled');
        guest[1].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('disabled', 'disabled');
        guest[3].setAttribute('selected', 'selected');
      }
    }
  };
  room.addEventListener('change', guestChangeHandler);


})();
