/* eslint-disable valid-jsdoc,no-unused-expressions */
'use strict';
(function () {
  // объявляем дом элементы
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var showMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
  };

  var showAdverts = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('hidden');
    }
  };


  var onMouseDown = function (evt) {
    evt.preventDefault();
    var start = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.disabledFieldset(false);
      var shift = {
        x: start.x - mapPinMain.offsetLeft,
        y: start.y - mapPinMain.offsetTop
      };

      start = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var minMaxComposition = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
      };

      var newX = minMaxComposition(start.x - shift.x, 300, 900);
      var newY = minMaxComposition(start.y - shift.y, 150, 500);
      var adAdress = document.querySelector('#address');
      adAdress.value = 'x:' + (newX + 20) + ' y:' + (newY + 44);
      mapPinMain.style.top = newY + 'px';
      mapPinMain.style.left = newX + 'px';
    };

    var onMouseUp = function (upEv) {
      upEv.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  var onFirstMousedown = function () {
    if (window.data.getAdverts().length > 0) {

      window.render.firstRenderPopup();
      window.render.renderPins(window.data.getAdverts());
      showMap();
      showAdverts();
      mapPinMain.removeEventListener('mousedown', onFirstMousedown);
    }
  };

  mapPinMain.addEventListener('mousedown', onMouseDown);
  mapPinMain.addEventListener('mousedown', onFirstMousedown);


})();

