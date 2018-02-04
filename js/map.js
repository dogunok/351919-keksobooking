'use strict';
var invisibleMap = document.querySelector('.map');
invisibleMap.classList.remove('map--faded');
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var allAvatar = [];

for (var i = 0; i < 9; i++) {
  allAvatar.push('img/avatars/user0' + i + '.png');
}


var listing = [{
  autor: {
    avatar: allAvatar[getRandom(1, allAvatar.length - 1)]
  }
},
{
  offer: {
    title: allTitle[getRandom(0, allTitle.length - 1)],
    adress: 'location.x, location.y',
    price: getRandom(1000, 1000000),
    type: 'house',
    rooms: getRandom(1, 5),
    guests: getRandom(1, 5),
    checkin: '12:00',
    checkout: '12:00',
    features: allFeatures[getRandom(1, allFeatures.length)],
    description: '',
    photos: allPhotos[getRandom(1, allPhotos.length)]
  }
},
{
  location: {
    x: getRandom(300, 900),
    y: getRandom(150, 300)
  }
}
];
var bottuns = document.querySelector('.map__pin');
bottuns.style.left = listing[2].location.x + 'px';
bottuns.style.top = listing[2].location.y + 'px';

var kartinka = document.querySelector('.map__pin img');
kartinka.src = listing[0].autor.avatar;
