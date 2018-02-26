'use strict';
(function () {
  var successUploadHandler = function () {
    window.disabledFieldset(true);
  };

  var errorUploadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    window.data.noticeForm.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      window.data.noticeForm.removeChild(node);
    }, window.util.time.TIME_END);
  };

  window.data.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.data.noticeForm), successUploadHandler,
        errorUploadHandler);
    window.data.noticeForm.reset();
  });

  window.data.noticeForm.addEventListener('reset', function () {
    window.disabledFieldset(true);
  });


  window.firm = {
    disabledFieldset: function (boolenValue) {
      boolenValue = boolenValue || false;
      Array.prototype.slice.call(window.data.noticeForm).forEach(function (elem) {
        if (elem.tagName.toLowerCase() !== 'fieldset') {
          return;
        }
        elem.disabled = boolenValue;
      });
    },
    noticeForm: document.querySelector('.notice__form')
  };

})();
