'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');

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
    window.backend.save(new FormData(noticeForm), successUploadHandler,
        errorUploadHandler);
    noticeForm.reset();
  });

  noticeForm.addEventListener('reset', function () {
    window.disabledFieldset(true);
  });


  window.disabledFieldset = function (boolenValue) {
    boolenValue = boolenValue || false;
    Array.prototype.slice.call(noticeForm).forEach(function (elem) {
      if (elem.tagName.toLowerCase() !== 'fildset') {
        return;
      }
      elem.disabled = boolenValue;
    });
  };


  /* var pinSolo = document.querySelectorAll('.pin__solo');
  var noticeFormDisabled = document.querySelectorAll('.notice__form fieldset');
  var noticeForm = document.querySelector('.notice__form');
  window.addDisabledFieldset = function (BooleanValue) {
    for (var i = 0; i < noticeFormDisabled.length; i++) {
      if (BooleanValue) {
        noticeFormDisabled[i].setAttribute('disabled', 'disabled');
        window.render.card.classList.add('map--faded');
        noticeForm.classList.add('notice__form--disabled');
        for (var a = 0; a < window.data.posting.length; a++) {
          pinSolo[a].classList.add('hidden');

        }
      } else {
        noticeFormDisabled[i].removeAttribute('disabled', 'disabled');
        window.render.card.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        for (var c = 0; c < window.data.posting.length; c++) {
          pinSolo[c].classList.remove('hidden');

        }

      }
    }

  }; */
  // window.addDisabledFieldset(true);
})();
