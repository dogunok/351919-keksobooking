'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var successUploadHandler = function () {
    noticeForm.reset();
  };


  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), successUploadHandler,
        window.util.showMessageError);


  });

  noticeForm.addEventListener('reset', function () {
    window.map.inOriginalState();
  });


  window.form = {
    disabledFieldset: function (boolenValue) {
      boolenValue = boolenValue || false;
      Array.prototype.slice.call(noticeForm).forEach(function (elem) {
        if (elem.tagName.toLowerCase() !== 'fieldset') {

          return;
        }
        elem.disabled = boolenValue;

      });

    }
  };

})();
