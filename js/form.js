'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');


  var successUploadHandler = function () {
    window.disabledFieldset(true);
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), successUploadHandler,
        window.util.showMessageError);
    noticeForm.reset();

  });

  noticeForm.addEventListener('reset', function () {
    window.disabledFieldset(true);

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
