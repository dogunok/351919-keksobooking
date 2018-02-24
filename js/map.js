/* eslint-disable valid-jsdoc,no-unused-expressions */
'use strict';
(function () {
  // объявляем дом элементы
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');


  var successUploadHandler = function () {
    window.addDisabledFieldset(false);
  };

  var errorUploadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    noticeForm.insertAdjacentElement('afterbegin', node);
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), successUploadHandler, errorUploadHandler);
  });
  /**
   * Функция отрисовки шаблона на карте
   */
  var drawWindow = function () {
    for (var i = 0; i < 8; i++) {
      window.render.renderWindow(window.data.posting, i);
    }
  };
  drawWindow();

  var pinSolo = document.querySelectorAll('.pin__solo');


  var mapCard = document.querySelectorAll('.map__card');
  var invisibleOpen = function () {
    for (var d = 0; d < window.data.posting.length; d++) {
      pinSolo[d].addEventListener('mouseup', function (evt) {
        evt.currentTarget.dataset.id;
        for (var f = 0; f < window.data.posting.length; f++) {
          mapCard[f].classList.add('hidden');
        }
      });

      pinSolo[d].addEventListener('click', function (evt) {
        var id = evt.currentTarget.dataset.id;
        mapCard[id].classList.remove('hidden');
        var popupClose = mapCard[id].querySelector('.popup__close');
        popupClose.addEventListener('click', function () {
          mapCard[id].classList.add('hidden');
        });
      });
    }
  };
  invisibleOpen();
  var onMouseDown = function (evt) {
    evt.preventDefault();
    var start = {
      x: evt.clientX,
      y: evt.clientY
    };
    window.addDisabledFieldset(false);


    var onMouseMove = function (moveEvt) {
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

  mapPinMain.addEventListener('mousedown', onMouseDown);


})();

