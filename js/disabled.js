'use strict';
(function () {
  var noticeFormDisabled = document.querySelectorAll('.notice__form fieldset');
  window.addDisabledFieldset = function (BooleanValue) {
    for (var i = 0; i < noticeFormDisabled.length; i++) {
      if (BooleanValue) {
        noticeFormDisabled[i].setAttribute('disabled', 'disabled');
      } else {
        noticeFormDisabled[i].removeAttribute('disabled', 'disabled');
      }

    }
  };
  window.addDisabledFieldset(true);
})();
