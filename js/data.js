/* eslint-disable no-console */
'use strict';
(function () {
  var posts = [];
  var noticeForm = document.querySelector('.notice__form');

  var successLoadHandler = function (response) {
    window.data.setData(response);
  };

  var errorLoadHandler = function (errorMessage) {
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

  window.backend.load(successLoadHandler, errorLoadHandler);


  window.data = {
    setData: function (data) {
      posts = data;
    },
    getAdverts: function () {
      return posts;
    },
    getAdvert: function (id) {
      return posts[id];
    }
  };

})();
