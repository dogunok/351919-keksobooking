/* eslint-disable valid-jsdoc,no-return-assign */
'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var MAX_PHOTOS = '6';
  /**
   * Функция создания фотографий
   * @param photos
   * @returns {DocumentFragment}
   */
  var createPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    var count = (photos.length > MAX_PHOTOS) ? MAX_PHOTOS : photos.length;
    photos = photos.slice(0, count);
    photos.forEach(function (photo) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.style.width = '60px';
      img.style.height = '60px';
      img.src = photo;
      li.style.marginRight = '10px';
      li.appendChild(img);
      fragment.appendChild(li);
    });
    return fragment;
  };
  /**
   * функция создания фич
   * @param featuresList
   * @returns {DocumentFragment}
   */
  var createFeatures = function (featuresList) {
    var fragment = document.createDocumentFragment();
    featuresList.forEach(function (feature) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + feature;

      fragment.appendChild(li);

    });
    return fragment;
  };

  var renderType = function (type) {
    if (type === 'flat') {
      return type = 'Kвартира';
    }
    if (type === 'bungalo') {
      return type = 'Бунгало';
    }
    return type = 'Дом';
  };

  var escClose = function(evt) {
    if (evt.keyCode === window.util.keycode.ESC) {
      var article = document.querySelector('.map__card');
      article.classList.add('hidden');
    }
    document.removeEventListener('keydown', escClose);
  }
  /**
   * Функция создает шаблон, пинов и объявления
   * @param data исходный массив
   * @param numberId номер пина
   */
  window.render = {
    firstRenderPopup: function () {
      var template = document.querySelector('template').
          content.
          querySelector('article');
      var popup = template.cloneNode(true);
      popup.classList.add('hidden');
      popup.querySelector('.popup__close').addEventListener('click', function () {
        popup.classList.add('hidden');
      });


      map.appendChild(popup);
    },
    updatePopup: function (id) {
      var data = window.data.getAdvert(id);
      var windowElement = document.querySelector('.map__card');
      var features = windowElement.querySelector('.popup__features');
      var pictures = windowElement.querySelector('.popup__pictures');
      features.innerHTML = '';
      pictures.innerHTML = '';
      features.appendChild(createFeatures(data.offer.features));
      pictures.appendChild(createPictures(data.offer.photos));
      windowElement.querySelector(' .popup__avatar').src = data.author.avatar;
      windowElement.querySelector(' h3').textContent = data.offer.title;
      windowElement.querySelector(' p').textContent = data.location.x + ',' + data.location.y;
      windowElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
      windowElement.querySelector(' h4').textContent = renderType(data.offer.type);
      windowElement.querySelectorAll('p')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      windowElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      windowElement.querySelectorAll('p')[4].textContent = data.offer.description;

      windowElement.classList.add('hidden');
      windowElement.classList.remove('hidden');
    },
    renderPins: function (data) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        var template = document.querySelector('template').
            content.
            querySelector('button.map__pin');
        var pin = template.cloneNode(true);
        var pinImg = pin.querySelector('.map__pin img');

        pin.addEventListener('click', function (evt) {
          var id = evt.currentTarget.dataset.id;
          window.render.updatePopup(id);
          document.addEventListener('keydown', escClose);
        });

        pin.style.left = data[i].location.x +
          'px';
        pin.style.top = data[i].location.y +
          'px';

        pin.setAttribute('data-id', i);
        pinImg.src = data[i].author.avatar;
        pin.classList.add('hidden');
        fragment.appendChild(pin);
      }
      mapPins.appendChild(fragment);

    }
  };
})();
