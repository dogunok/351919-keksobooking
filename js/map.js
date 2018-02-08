'use strict';
// объявляем дом элементы
var invisibleMap = document.querySelector('.map');
invisibleMap.classList.remove('map--faded');
var fragment = document.createDocumentFragment();

var map = document.querySelector('.map');
var mapFiltersConainer = document.querySelector('.map__filters-container');
// объявляем массивы
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var listing = [];
//объявляем функции
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

var renderWindow = function(data) {
  var infoWindowTemplate = document.querySelector('template article.map__card');
  var insertH3 = document.querySelector('map__card h3');
  var insertAdress= document.querySelector('.map__card p');
  var insertType = document.querySelector('.map__card h4');
  var countGuestsRooms = document.querySelector('.map__card p+p+p');
  var insertCheck = document.querySelector('.map__card p+p+p+p');
  insertH3.textContent = data.offer.title;
  insertAdress.textContent = data.offer.adress;
  insertType.textContent = data.offer.type;
  countGuestsRooms.innerHTML = data.offer.rooms + 'комнаты для' + data.offer.guests + 'гостей';
  insertCheck.innerHTML = 'Заезд после' + data.offer.checkin + ', выезд до' + data.offer.checkout;
  infoWindowTemplate.appendChild(insertH3);
  infoWindowTemplate.appendChild(insertAdress);
  infoWindowTemplate.appendChild(insertType);
  infoWindowTemplate.appendChild(countGuestsRooms);
  infoWindowTemplate.appendChild(insertCheck);
    return infoWindowTemplate;
}

map.insertBefore(renderWindow(listing[1]), mapFiltersConainer);

var mapPins = document.querySelector('.map__pins');
for (var j = 0; j < 8; j++) {
  fragment.appendChild(renderButton(listing[j]));
}
mapPins.appendChild(fragment);