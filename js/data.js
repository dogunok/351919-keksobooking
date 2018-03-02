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
    window.disabledFieldset(true);
  };


  window.backend.load(successLoadHandler, window.util.errorUploadHandler);


  window.data = {
    setData: function (data) {
      data.forEach(function (post, index) {
        post.id = index;
      });
      posts = data;
    },
    getAdverts: function () {
      return posts.slice(0, 5);
    },
    getAdvert: function (id) {
      return posts[id];
    },
    getFilteredAdvers: function () {
      var isFeaturesOn = function (features, value) {
        return ~features.indexOf(value);
      };
      var filter = window.filter;
      return posts.filter(function (post) {

        for (var key in filter) {

          if (!filter.hasOwnProperty(key)) {
            continue;
          }
          var value = filter[key];
          if (!value) {
            continue;
          }

          // if (~key.indexOf('housing-')) {
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
          //   }
          if (~key.indexOf('filter-') && !isFeaturesOn(post.offer.features, value)) {
            return false;
          }


        }
        return true;
      }).slice(0, 5);
    }
  };

})();
