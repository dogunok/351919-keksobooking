'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');

  var successUploadHandler = function () {

    inOriginalState();

  };

  var inOriginalState = function () {
    var mapPinMain = document.querySelector('.map__pin--main');
    var mapPins = document.querySelector('.map__pins');
    var map = document.querySelector('.map');
    var rect = mapPins.getBoundingClientRect();
    var central = rect.width / '2';
    var article = document.querySelectorAll('.map__card');
    window.disabledFieldset(true);
    mapPinMain.style.top = '375px';
    mapPinMain.style.left = central + 'px';
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    window.util.removePins();
    for (var i = 0; i < article.length; i++) {
      map.removeChild(article[i]);
    }
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), successUploadHandler,
        window.util.showMessageError);
    noticeForm.reset();

  });

  noticeForm.addEventListener('reset', function () {
    inOriginalState();
  });


  window.disabledFieldset = function (boolenValue) {
    boolenValue = boolenValue || false;
    Array.prototype.slice.call(noticeForm).forEach(function (elem) {
      if (elem.tagName.toLowerCase() !== 'fieldset') {

        return;
      }
      elem.disabled = boolenValue;

    });
  };


})();
