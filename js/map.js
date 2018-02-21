/* eslint-disable valid-jsdoc,no-unused-expressions */
'use strict';
// объявляем дом элементы
var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapFiltersConainer = document.querySelector('.map__filters-container');
var noticeForm = document.querySelector('.notice__form');
var noticeFormDisabled = document.querySelectorAll('.notice__form fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var adTitle = document.querySelector('#title');
var adPrice = document.querySelector('#price');
var adType = document.querySelector('#type');
var mapPin = document.querySelector('.map__pin');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
// объявляем массивы
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var allTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
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

/**
 *  Создание массива случайных данных
 * @param array {array} исходный массив данных
 * @param count {number} количество элементов в результирующем массиве
 * @param sort {boolean} производить ли сортировку
 * @returns {Array}
 */
var createRandomArray = function (array, count, sort) {
  var result = [];
  var tempArray = array.slice(0);
  for (var i = 0; i < count; i++) {
    var randomIndex = getRandom(0, tempArray.length);
    result.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  if (sort) {
    return result.sort();
  }
  return result;
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
        type: [allTypes.bungalo, allTypes.flat, allTypes.house][getRandom(0, 2)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 5),
        checkin: '12:00',
        checkout: '12:00',
        features: createRandomArray(allFeatures, getRandom(0, allFeatures.length)),
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

/**
 * Функция создания картинок для объявления
 * @param data массив из которого берем данные
 * @param numberPhoto номер картинки
 * @returns {HTMLLIElement}
 */
var renderPicture = function (data, numberPhoto) {
  var picture = document.createElement('img');
  var li = document.createElement('li');
  picture.src = data.offer.photos[numberPhoto];
  picture.style.width = '60px';
  picture.style.height = '60px';
  li.appendChild(picture);
  return li;
};
/**
 * функция создания особенностей
 * value - значение особенности
 */
/* var renderFeature = function (value) {
  var feature = document.createElement('li');
  feature.classList.add('feature');
  feature.classList.add('feature--' + value);
  return feature;
}; */

/**
 * Функция создает шаблон, пинов и объявления
 * @param data исходный массив
 * @param numberId номер пина
 */
var renderWindow = function (data, numberId) {
  var windowElement = template.cloneNode(true);

  windowElement.querySelector('.map__card .popup__avatar').src = data.author.avatar;
  windowElement.querySelector('.map__card h3').textContent = data.offer.title;
  windowElement.querySelector('.map__card p').textContent = data.location.x + ',' + data.location.y;
  windowElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
  windowElement.querySelector('.map__card h4').textContent = data.offer.type;
  windowElement.querySelectorAll('.map__card p ')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  windowElement.querySelectorAll('.map__card p ')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  windowElement.querySelectorAll('.map__card p ')[4].textContent = data.offer.description;
  var renderPectures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 3; i++) {
      fragment.appendChild(renderPicture(data, i));
    }
    return fragment;
  };
  windowElement.querySelector('.popup__pictures').appendChild(renderPectures());
  /* var renderFeatures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < getRandom(0, 5); i++) {
      fragment.appendChild(renderFeature(getRandom(0, 5)));
    }
    return fragment;
  }; */
  // windowElement.querySelector('.map__card .popup__features').appendChild(renderFeatures());
  windowElement.querySelector('.map__pin').style.left = data.location.x + 'px';
  windowElement.querySelector('.map__pin').style.top = data.location.y + 'px';
  windowElement.querySelector('.map__pin img').src = data.author.avatar;
  windowElement.querySelector('.map__pin').setAttribute('data-id', numberId);
  windowElement.querySelector('.map__pin').classList.add('pin__solo');
  windowElement.querySelector('.map__pin').classList.add('hidden');
  windowElement.querySelector('.map__card').classList.add('hidden');
  map.insertBefore(windowElement, mapFiltersConainer);
};


// Добавляем атрибуты валидации форм
adTitle.setAttribute('required', 'required');
adTitle.setAttribute('minlength', '30');
adTitle.setAttribute('maxlength', '100');
adPrice.setAttribute('required', 'required');
adPrice.setAttribute('type', 'number');
adPrice.setAttribute('max', '1000000');
adPrice.setAttribute('min', '1000');

for (var o = 0; o < 8; o++) {
  renderWindow(posting[o], o);
}

var pinSolo = document.querySelectorAll('.pin__solo');
/**
 * Функция события перевода страницы в активный режим и отображения на ней пинов
 */
var mappinsMouseupHandler = function () {
  addDisabledFieldset(false);
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');

  for (var a = 0; a < 8; a++) {
    pinSolo[a].classList.remove('hidden');
  }
};


var mapCard = document.querySelectorAll('.map__card');

for (var d = 0; d < posting.length; d++) {
  pinSolo[d].addEventListener('mouseup', function (evt) {
    evt.currentTarget.dataset.id;
    for (var f = 0; f < posting.length; f++) {
      mapCard[f].classList.add('hidden');
    }
  });


  pinSolo[d].addEventListener('click', function (evt) {
    var id = evt.currentTarget.dataset.id;
    mapCard[id].classList.remove('hidden');
    var popupClose = mapCard[id].querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      mapCard[id].classList.add('hidden');
    });
  });
}


// обработчики событий
mapPinMain.addEventListener('mouseup', mappinsMouseupHandler);


/**
 * функция валидации списка типа жилья
 */
var typeChangeHandler = function () {

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

adType.addEventListener('change', typeChangeHandler);
/**
 * Функция события выбора времени заезда
 * @param evt
 */
var timeinChangeHandler = function (evt) {
  for (var i = 0; i < 3; i++) {
    if (evt.target.selectedIndex === 0) {

      timeout[i].removeAttribute('selected', 'selected');
      timeout[0].setAttribute('selected', 'selected');
    }
    if (evt.target.selectedIndex === 1) {

      timeout[i].removeAttribute('selected', 'selected');
      timeout[1].setAttribute('selected', 'selected');
    }
    if (evt.target.selectedIndex === 2) {

      timeout[i].removeAttribute('selected', 'selected');
      timeout[2].setAttribute('selected', 'selected');
    }
  }
};

timein.addEventListener('change', timeinChangeHandler);

/**
 *  функиця события выбора времени выезда
 * @param evt
 */
var timeoutChangeHandler = function (evt) {
  for (var i = 0; i < 3; i++) {
    if (evt.target.selectedIndex === 0) {

      timein[i].removeAttribute('selected', 'selected');
      timein[0].setAttribute('selected', 'selected');
    }
    if (evt.target.selectedIndex === 1) {

      timein[i].removeAttribute('selected', 'selected');
      timein[1].setAttribute('selected', 'selected');
    }
    if (evt.target.selectedIndex === 2) {

      timein[i].removeAttribute('selected', 'selected');
      timein[2].setAttribute('selected', 'selected');
    }
  }
};

timeout.addEventListener('change', timeoutChangeHandler);

/**
 * Функция добавлениякоординат в поле адресс центрального пина
 */
mapPin.addEventListener('click', function (evt) {
  var adAdress = document.querySelector('#address');
  var x = evt.clientX + 21.5;
  var y = evt.clientY + 65;
  adAdress.value = 'X = ' + x + '; Y = ' + y;
});

