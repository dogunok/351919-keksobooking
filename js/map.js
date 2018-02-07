'use strict'
var invisibleMap = document.querySelector('.map')
invisibleMap.classList.remove('map--faded')
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var listing = []

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
    })
  }
  return listing
}
addArray(8)

var renderButton = function (data) {
  var button = document.createElement('button')
  button.className = 'map__pin'
  button.style.left = data.location.x + 'px'
  button.style.top = data.location.y + 'px'
  var picture = document.createElement('img')
  picture.className = 'map__pin'
  picture.src = data.author.avatar
  return button
}
var fragment = document.createDocumentFragment();

var p = document.querySelector('.map__pins');
for (var j = 0; j < 8; j++){
  fragment.appendChild(renderButton(listing[j]))
}

p.appendChild(fragment);













