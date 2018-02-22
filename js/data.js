'use strict';
(function () {
  var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var allTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var addArray = function (number) {
    var listing = [];
    for (var i = 1; i <= number; i++) {
      listing.push({
        author: {
          avatar: 'img/avatars/user0' + window.getRandom(1, number) + '.png'
        }, offer: {
          title: allTitle[window.getRandom(0, allTitle.length - 1)],
          adress: '',
          price: window.getRandom(1000, 1000000),
          type: [allTypes.bungalo, allTypes.flat, allTypes.house][window.getRandom(0, 2)],
          rooms: window.getRandom(1, 5),
          guests: window.getRandom(1, 5),
          checkin: '12:00',
          checkout: '12:00',
          features: allFeatures,
          description: '',
          photos: allPhotos
        }, location: {
          x: window.getRandom(300, 900),
          y: window.getRandom(150, 500)
        }
      });
    }
    return listing;
  };
  window.data = {
    posting: addArray(8),
    photos: allPhotos
  };
})();
