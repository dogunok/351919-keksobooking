/* eslint-disable valid-jsdoc,no-unused-expressions */
'use strict';
// объявляем дом элементы
var noticeForm = document.querySelector('.notice__form');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPin = document.querySelector('.map__pin');


for (var o = 0; o < window.data.posting.length; o++) {
  window.render.renderWindow(window.data.posting[o], o);
}

var pinSolo = document.querySelectorAll('.pin__solo');
/**
 * Функция события перевода страницы в активный режим и отображения на ней пинов
 */
var mappinsMouseupHandler = function () {
  window.addDisabledFieldset(false);
  window.render.card.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');

  for (var a = 0; a < window.data.posting.length; a++) {
    pinSolo[a].classList.remove('hidden');
  }
};


var mapCard = document.querySelectorAll('.map__card');

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


// обработчики событий
mapPinMain.addEventListener('mouseup', mappinsMouseupHandler);

/**
 * Функция добавлениякоординат в поле адресс центрального пина
 */
mapPin.addEventListener('click', function (evt) {
  var adAdress = document.querySelector('#address');
  var x = evt.clientX + 21.5;
  var y = evt.clientY + 65;
  adAdress.value = 'X = ' + x + '; Y = ' + y;
});

