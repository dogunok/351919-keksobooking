/* eslint-disable valid-jsdoc,no-unused-expressions */
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
var windowElement = template.cloneNode(true);

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

var renderButton = function (data, numberId) {
  var button = document.createElement('button');
  var picture = document.createElement('img');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  button.setAttribute('data-id', numberId);
  picture.src = data.author.avatar;
  picture.style.width = '40px';
  picture.style.height = '40px';
  picture.draggable = false;
  button.appendChild(picture);
  return button;
};


var renderWindow = function (data) {
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
  return windowElement;
};


/**
 * Функция отображает определенное количество пинов в зависимости от длины основного массива
 */
var addPinsMap = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < posting.length; i++) {
    var button = renderButton(posting[i], i);
    button.addEventListener('click', pinClickHandler);
    fragment.appendChild(button);

    mapPins.appendChild(fragment);

  }

};
// Добавляем атрибуты валидации форм
adTitle.setAttribute('required', 'required');
adTitle.setAttribute('minlength', '30');
adTitle.setAttribute('maxlength', '100');
adPrice.setAttribute('required', 'required');
adPrice.setAttribute('type', 'number');
adPrice.setAttribute('max', '1000000');
adPrice.setAttribute('min', '1000');

/**
 * Функция события перевода страницы в активный режим и отображения на ней пинов
 */
var mappinsMouseupHandler = function () {
  addDisabledFieldset(false);
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  addPinsMap();
};

/**
 * Функция события нажатия на пин и вывода окна
 * @param evt
 */
var pinClickHandler = function (evt) {
  var id = evt.target.dataset.id;
  renderWindow(posting[id]);

};
// обработчики событий
mapPinMain.addEventListener('mouseup', mappinsMouseupHandler);

/**
 * функция валидации списка
 */
var changePrice = function () {

  if (adType.selectedIndex === 0) {
    adPrice.setAttribute('min', '1000');
  }
  if (adType.selectedIndex === 1) {
    adPrice.setAttribute('min', '0');
  }
  if (adType.selectedIndex === 2) {
    adPrice.setAttribute('min', '5000');
  }
  if (adType.selectedIndex === 3) {
    adPrice.setAttribute('min', '10000');
  }

};

adType.addEventListener('change', changePrice);


/* pin.addEventListener('click', function (evt) {
  var adAdress = document.querySelector('#address');
  var x = evt.clientX + 21.5;
  var y = evt.clientY + 65;
  adAdress.value = 'X = ' + x + '; Y = ' + y;
}); */

