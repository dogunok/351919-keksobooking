/* eslint-disable no-console,valid-jsdoc */
'use strict';
(function () {
  var posts = [];
  /**
   * Функция удачной загрузки данных с сервера
   * @param response
   */
  var successLoadHandler = function (response) {
    window.data.setData(response);
    console.log(response)
    window.disabledFieldset(true);
  };


  window.backend.load(successLoadHandler, window.util.errorUploadHandler);


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

      return posts.filter(function (posts) {

        if (!filter.hasOwnProperty(filterName)) {
          continue;
        }
        for (var key in window.filter) {
          if (key === 'housing-type' && post.offer.type !== value) {
            return false;
          }
          if (key === 'housing-price' && post.offer.price !== value) {
            return false;
          }
          if (key === 'housing-rooms' && post.offer.rooms !== value) {
            return false;
          }
          if (key === 'housing-guests' && post.offer.guests !== value) {
            return false;
          }

        }



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
