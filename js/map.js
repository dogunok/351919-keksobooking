'use strict';
(function () {
  var CODE_ENTER = 13;
  var HORIZONTAL_SIZE = 44;
  var VERTICAL_SIZE = 20;
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');


  var showMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
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

      var newX = minMaxComposition(start.x - shift.x, 300, 1165);
      var newY = minMaxComposition(start.y - shift.y, 150, 500);
      var adAdress = document.querySelector('#address');
      adAdress.value = 'x:' + (newX + VERTICAL_SIZE) + ' y:' + (newY + HORIZONTAL_SIZE);
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


  var onFirstKeydown = function (evt) {
    if (evt.keyCode === CODE_ENTER) {
      if (window.data.getAdverts().length > 0) {

        window.render.firstRenderPopup();
        window.render.renderPins(window.data.getAdverts());

        showMap();
        window.util.showAdverts();
      }
      mapPinMain.removeEventListener('mousedown', onFirstMousedown);
    }
  };

  var onFirstMousedown = function () {
    if (window.data.getAdverts().length > 0) {

      window.render.firstRenderPopup();
      window.render.renderPins(window.data.getAdverts());

      showMap();
      window.util.showAdverts();

      mapPinMain.removeEventListener('mousedown', onFirstMousedown);
    }
  };

  mapPinMain.addEventListener('keydown', onFirstKeydown);
  mapPinMain.addEventListener('mousedown', onMouseDown);
  mapPinMain.addEventListener('mousedown', onFirstMousedown);


})();

