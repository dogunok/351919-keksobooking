'use strict';
// объявляем дом элементы
var invisibleMap = document.querySelector('.map');
invisibleMap.classList.remove('map--faded');
var fragment = document.createDocumentFragment();
var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapFiltersConainer = document.querySelector('.map__filters-container');
// объявляем массивы
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var listing = [];
// объявляем функции
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var addArray = function (number) {

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
        features: allFeatures[getRandom(0, allFeatures.length - 1)],
        description: '',
        photos: allPhotos[getRandom(0, allPhotos.length - 1)]
      }, location: {
        x: getRandom(300, 900),
        y: getRandom(150, 300)
      }
    });
  }
  return listing;
};
addArray(8);

var renderButton = function (data) {
  var button = document.createElement('button');
  var picture = document.createElement('img');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  picture.src = data.author.avatar;
  button.appendChild(picture);
  return button;
};
var renderWindow = function (data) {
  var windowElement = template.cloneNode(true);
  windowElement.querySelector('.map__card .popup__avatar').src = data.author.avatar;
  windowElement.querySelector('.map__card h3').textContent = data.offer.title;
  windowElement.querySelector('.map__card p').textContent = data.location.x + ',' + data.location.y;
  windowElement.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd' + '/ночь;';
  windowElement.querySelector('.map__card h4').textContent = data.offer.type;
  windowElement.querySelectorAll('.map__card p ')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  windowElement.querySelectorAll('.map__card p ')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  windowElement.querySelector('.popup__features .feature--wifi').textContent = data.offer.features;
  windowElement.querySelector('.popup__features .feature--dishwasher').textContent = data.offer.features;
  windowElement.querySelector('.popup__features .feature--parking').textContent = data.offer.features;
  windowElement.querySelector('.popup__features .feature--washer').textContent = data.offer.features;
  windowElement.querySelector('.popup__features .feature--elevator').textContent = data.offer.features;
  windowElement.querySelector('.popup__features .feature--conditioner').textContent = data.offer.features;
  windowElement.querySelectorAll('.map__card p ')[4].textContent = data.offer.description;
  windowElement.querySelector('.popup__pictures img').src = data.offer.photos;
  windowElement.querySelector('.popup__pictures img').style.width = '70px';
  map.insertBefore(windowElement, mapFiltersConainer);
};

var mapPins = document.querySelector('.map__pins');
for (var j = 0; j < 8; j++) {
  fragment.appendChild(renderButton(listing[j]));
  mapPins.appendChild(fragment);
  renderWindow(listing[j]);
}
