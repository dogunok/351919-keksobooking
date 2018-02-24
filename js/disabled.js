'use strict';
(function () {
  var pinSolo = document.querySelectorAll('.pin__solo');
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

  };
  window.addDisabledFieldset(true);
})();
