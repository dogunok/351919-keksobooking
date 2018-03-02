'use strict';
(function () {
  window.util = {
    showMessageError: function (errorMessage) {
      var noticeForm = document.querySelector('.notice__form');
      var TIME_END = '5000';
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
      }, TIME_END);
    },
    showAdverts: function () {
      var pins = document.querySelectorAll('.map__pin');
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('hidden');
      }
    }
  };
})();
