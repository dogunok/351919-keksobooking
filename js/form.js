'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');

  var successUploadHandler = function () {
    window.disabledFieldset(false);
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
    setTimeout(function () {
      noticeForm.removeChild(node);
    }, 5000);
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
      if (elem.tagName.toLowerCase() !== 'fieldset') {
        return;
      }
      elem.disabled = boolenValue;
    });
  };


})();
