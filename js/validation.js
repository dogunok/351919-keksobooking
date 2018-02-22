'use strict';
(function () {
  var adTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var adType = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  adTitle.setAttribute('required', 'required');
  adTitle.setAttribute('minlength', '30');
  adTitle.setAttribute('maxlength', '100');
  adPrice.setAttribute('required', 'required');
  adPrice.setAttribute('type', 'number');
  adPrice.setAttribute('max', '1000000');
  adPrice.setAttribute('min', '1000');

  /**
   * функция валидации списка типа жилья
   */
  var typeChangeHandler = function () {

    if (adType.selectedIndex === 0) {
      adPrice.setAttribute('min', '1000');
    }
    if (adType.selectedIndex === 1) {
      adPrice.setAttribute('min', '0');
    }
    if (adType.selectedIndex === 2) {
      adPrice.setAttribute('min', '5000');
    }
    if (adType.selectedIndex === 3) {
      adPrice.setAttribute('min', '10000');
    }

  };

  adType.addEventListener('change', typeChangeHandler);

  var timeChangeHandler = function (evt) {
    synchronizeTime(evt.target.value);
  };

  timein.addEventListener('change', timeChangeHandler);
  timeout.addEventListener('change', timeChangeHandler);

  var synchronizeTime = function (time) {
    timeout.value = time;
    timein.value = time;
  };

  var guest = document.querySelector('#capacity');
  var room = document.querySelector('#room_number');
  var guests = guest.querySelectorAll('option');

  var guestChangeHandler = function () {
    for (var i = 0; i < room.length; i++) {
      if (room.value === '1') {
        guests[i].removeAttribute('disabled', 'disabled');
        guests[i].removeAttribute('selected', 'selected');
        guest[0].setAttribute('disabled', 'disabled');
        guest[1].setAttribute('disabled', 'disabled');
        guest[3].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('selected', 'selected');
      }
      if (room.value === '2') {
        guests[i].removeAttribute('disabled', 'disabled');
        guests[i].removeAttribute('selected', 'selected');
        guest[0].setAttribute('disabled', 'disabled');
        guest[3].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('selected', 'selected');
      }
      if (room.value === '3') {
        guest[i].removeAttribute('disabled', 'disabled');
        guests[i].removeAttribute('selected', 'selected');
        guest[3].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('selected', 'selected');

      }
      if (room.value === '100') {
        guests[i].removeAttribute('disabled', 'disabled');
        guests[i].removeAttribute('selected', 'selected');
        guest[0].setAttribute('disabled', 'disabled');
        guest[1].setAttribute('disabled', 'disabled');
        guest[2].setAttribute('disabled', 'disabled');
        guest[3].setAttribute('selected', 'selected');
      }
    }
  };
  room.addEventListener('change', guestChangeHandler);


})();
