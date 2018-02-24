'use strict';
(function () {
  window.util = {getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  errorUploadHandler: function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    form.insertAdjacentElement('afterbegin', node);
  }
  };
})();
