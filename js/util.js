'use strict';
(function () {
  window.util = {
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    time: {
      TIME_END: '5000',
      TIME_OUT: '10000'
    },
    keycode: {
      ESC: '27',
      ENTER: '13'
    }
  };
})();
