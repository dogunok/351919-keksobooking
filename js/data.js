'use strict';
(function () {
  var MAX_NUMBER_PINS = 5;
  var posts = [];

  /* var successLoadHandler = function (response) {
    window.data.setData(response);
    window.disabledFieldset(true);
  };


  window.backend.load(successLoadHandler, window.util.showMessageError); */


  window.data = {
    setData: function (data) {
      data.forEach(function (post, index) {
        post.id = index;
      });
      posts = data;
    },
    getAdverts: function () {
      return posts.slice(0, MAX_NUMBER_PINS);
    },
    getAdvert: function (id) {
      return posts[id];
    },
    getFilteredAdvers: function () {
      var SELECTED_RANGES = {
        low: {
          min: 0,
          max: 10000
        },
        middle: {
          min: 10000,
          max: 50000
        },
        high: {
          min: 50000,
          max: -1
        },
        any: {
          min: -1,
          max: -1
        }
      };

      var isFeaturesOn = function (features, value) {
        return ~features.indexOf(value);
      };


      var isHousingPriceRange = function (value, price) {
        if (SELECTED_RANGES[value].max < 0) {
          return price >= SELECTED_RANGES[value].min;
        }
        return price >= SELECTED_RANGES[value].min && price <= SELECTED_RANGES[value].max;
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

          if (key === 'housing-type' && post.offer.type !== value) {
            return false;
          }
          if (key === 'housing-price' && !isHousingPriceRange(value, post.offer.price)) {
            return false;
          }
          if (key === 'housing-rooms' && post.offer.rooms !== parseInt(value, 10)) {
            return false;
          }
          if (key === 'housing-guests' && post.offer.guests !== parseInt(value, 10)) {
            return false;
          }
          if (~key.indexOf('filter-') && !isFeaturesOn(post.offer.features, value)) {
            return false;
          }


        }
        return true;
      }).slice(0, MAX_NUMBER_PINS);
    }
  };

})();
