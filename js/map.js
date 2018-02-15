'use strict';
// объявляем дом элементы
var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapFiltersConainer = document.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var noticeForm = document.querySelector('.notice__form');
var noticeFormDisabled = document.querySelectorAll('.notice__form fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var adTitle = document.querySelector('#title');
var adPrice = document.querySelector('#price');
var adType = document.querySelector('#type');


// var popupPictures = document.querySelector('.popup__pictures');
// объявляем массивы
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// объявляем функции
var addDisabledFieldset = function (BooleanValue) {
  for (var i = 0; i < noticeFormDisabled.length; i++) {
    if (BooleanValue) {
      noticeFormDisabled[i].setAttribute('disabled', 'disabled');
    } else {
      noticeFormDisabled[i].removeAttribute('disabled', 'disabled');
    }

  }
};
addDisabledFieldset(true);

var adAttrubute = function (data, name, value) {
  data.setAttribute(name, value);
};

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

var renderButton = function (data,numberId) {
  var button = document.createElement('button');
  var picture = document.createElement('img');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  adAttrubute(button, 'id', 'pin_' + numberId);
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
  var article = document.querySelectorAll('.map .map__card');
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


var addRenderWindow = function () {

for (var i = 0; i < 8; i++) {
renderWindow(posting[i]);
var article = document.querySelectorAll('.map .map__card');
article[i].setAttribute('id', 'ad_' + i);
  }
};

var addPinsMap = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    fragment.appendChild(renderButton(posting[i], i));
    mapPins.appendChild(fragment);
    
      }
};



adAttrubute(adTitle, 'required', 'required');
adAttrubute(adTitle, 'minlength', '30');
adAttrubute(adTitle, 'maxlength', '100');

adAttrubute(adPrice, 'required', 'required');
adAttrubute(adPrice, 'type', 'number');
adAttrubute(adPrice, 'max', '1000000');
adAttrubute(adPrice, 'min', '1000');


var mappinsMouseupHandler = function () {
  addDisabledFieldset(false);
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  addPinsMap();
  addRenderWindow()
  };

// обработчики событий
mapPinMain.addEventListener('mouseup', mappinsMouseupHandler);

var changePrice = function () {

  if (adType.selectedIndex === 0) {
    adAttrubute(adPrice, 'min', '1000');
  }
  if (adType.selectedIndex === 1) {
    adAttrubute(adPrice, 'min', '0');
  }
  if (adType.selectedIndex === 2) {
    adAttrubute(adPrice, 'min', '5000');
  }
  if (adType.selectedIndex === 3) {
    adAttrubute(adPrice, 'min', '10000');
  }

};
adType.addEventListener('change', changePrice);



/* pin.addEventListener('click', function (evt) {
  var adAdress = document.querySelector('#address');
  var x = evt.clientX + 21.5;
  var y = evt.clientY + 65;
  adAdress.value = 'X = ' + x + '; Y = ' + y;
}); */

for (var i = 0; i < 2; i++) {
var pin = document.querySelector('#pin_' + i);
pin.addEventListener('click', function () {
if(pin_0) {
  return alert('1');
}
if(pin_1){
  return alert('2');
}

})
  
}
