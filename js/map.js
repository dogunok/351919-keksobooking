'use strict';
// объявляем дом элементы
var invisibleMap = document.querySelector('.map');
invisibleMap.classList.remove('map--faded');
var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapFiltersConainer = document.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var popupPictures = document.querySelector('.popup__pictures');
// объявляем массивы
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// объявляем функции
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var addArray = function (number) {
  var listing = [];
  for (var i = 1; i <= number; i++) {
    listing.push({
      author: {
        avatar: 'img/avatars/user0' + getRandom(1, number) + '.png'
      }, offer: {
        title: allTitle[getRandom(0, allTitle.length - 1)],
        adress: '',
        price: getRandom(1000, 1000000),
        type: 'house',
        rooms: getRandom(1, 5),
        guests: getRandom(1, 5),
        checkin: '12:00',
        checkout: '12:00',
        features: allFeatures,
        description: '',
        photos: allPhotos
      }, location: {
        x: getRandom(300, 900),
        y: getRandom(150, 300)
      }
    });
  }
  return listing;
};

var posting = addArray(8);

var renderButton = function (data) {
  var button = document.createElement('button');
  var picture = document.createElement('img');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  picture.src = data.author.avatar;
  picture.style.width = '40px';
  picture.style.height = '40px';
  picture.draggable = false;
  button.appendChild(picture);
  return button;
};

// var addPicture = function (data) {
//  var li = document.createElement('li');
//  var picture = document.createElement('img');
//  picture.src = data;
//  li.appendChild(picture);
//  return li;
// };
// var addPictureTamplate = function () {
//  var fragment = document.createDocumentFragment();
//  for (var j = 0; j < 3; j++) {
//    fragment.appendChild(addPicture(allPhotos[j]));
//    popupPictures.appendChild(fragment);
//  }
// };

// var addFeature = function () {
// for (var i = 0; i < allFeatures.length; i++) {
//   if (listing[1].offer.features === 'wifi') {
//     return 'feature';
//   }
//   if (listing[1].offer.features === 'washer') {
//     return 'feature--dishwasher';
//   }
//   if (listing[1].offer.features === 'parking') {
//     return 'feature--parking';
//   }
//   if (listing[1].offer.features === 'elevator') {
//     return 'feature--elevator';
//   }
//   if (listing[1].offer.features === 'dish') {
//     return 'feature--washer';
//   }
//   return 'feature--conditioner';
// }
// };
var renderWindow = function (data) {

  var windowElement = template.cloneNode(true);
  windowElement.querySelector('.map__card .popup__avatar').src = data.author.avatar;
  windowElement.querySelector('.map__card h3').textContent = data.offer.title;
  windowElement.querySelector('.map__card p').textContent = data.location.x + ',' + data.location.y;
  windowElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
  windowElement.querySelector('.map__card h4').textContent = data.offer.type;
  windowElement.querySelectorAll('.map__card p ')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  windowElement.querySelectorAll('.map__card p ')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  windowElement.querySelectorAll('.feature')[getRandom(0, allFeatures.length - 1)].remove('feature');
  windowElement.querySelectorAll('.map__card p ')[4].textContent = data.offer.description;
  windowElement.querySelector('.popup__pictures img').src = data.offer.photos[1];
  windowElement.querySelector('.popup__pictures img').style.width = '70px';
  map.insertBefore(windowElement, mapFiltersConainer);
};

renderWindow(posting[1]);

var addPinsMap = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < 8; j++) {
    fragment.appendChild(renderButton(posting[j]));
    mapPins.appendChild(fragment);
  }
};

addPinsMap();
