'use strict';
(function () {
  var MIN_HIGHT = 150;
  var MAX_HIGHT = 500;
  var MIN_WIDTH = 0;
  var HORIZONTAL_SIZE = 44;
  var VERTICAL_SIZE = 20;
  var CENTRAL_HEIGHT = '375px';
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var showMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
  };
  var hideMap = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
  };

  var mappinmainMousedownHandler = function (evt) {
    evt.preventDefault();
    var start = {
      x: evt.clientX,
      y: evt.clientY
    };

    var documentMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
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
      var rect = mapPins.getBoundingClientRect();
      var newX = minMaxComposition(start.x - shift.x, MIN_WIDTH, rect.width);
      var newY = minMaxComposition(start.y - shift.y, MIN_HIGHT, MAX_HIGHT);
      var adAdress = document.querySelector('#address');
      adAdress.value = (newX + VERTICAL_SIZE) + ', ' + (newY + HORIZONTAL_SIZE);
      mapPinMain.style.top = newY + 'px';
      mapPinMain.style.left = newX + 'px';
    };

    var documentMouseupHandler = function (upEv) {
      upEv.preventDefault();


      document.removeEventListener('mousemove', documentMousemoveHandler);
      document.removeEventListener('mouseup', documentMouseupHandler);
    };
    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };

  window.map = {
    inOriginalState: function () {
      var rect = mapPins.getBoundingClientRect();
      var centralWidth = rect.width / '2';
      var article = document.querySelector('.map__card');
      mapPinMain.style.top = CENTRAL_HEIGHT;
      mapPinMain.style.left = centralWidth + 'px';
      window.util.removePins();
      map.removeChild(article);
      window.form.disabledFieldset(true);
      hideMap();
      mapPinMain.addEventListener('click', mappinmainClickHandler);
    }
  };

  var mappinmainClickHandler = function () {
    var successLoadHandler = function (response) {
      window.data.setData(response);
      window.form.disabledFieldset(false);
      window.render.firstRenderPopup();
      window.render.renderPins(window.data.getAdverts());
      mapPinMain.removeEventListener('click', mappinmainClickHandler);
    };
    showMap();
    window.backend.load(successLoadHandler, window.util.showMessageError);

  };

  mapPinMain.addEventListener('mousedown', mappinmainMousedownHandler);
  mapPinMain.addEventListener('click', mappinmainClickHandler);

})();


