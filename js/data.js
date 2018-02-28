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
    }, window.util.time.TIME_END);
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
    },
    getFilteredAdvers: function () {
      // вспомогательные функции лучше здесь.
      // выносить в util необязательно

      return posts.filter(function (post) {
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...in
        // перебираем циклом for in наш фильтр который заполняем в обработчике формы в модуле filter
        // если значение фильтра содержит определенный элемент в post, то возвращаем false, тем самым убираем элемент из выборки
        // при этом сам posts остается таким же каким и был
        // в условии можно использовать вспомогательными функциями, чтобы сделать код более читаемым и понятным
        // в конце возвращаем true - значит ниодин фильтр не совпал
      });
    }
  };

})();
