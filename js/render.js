'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var MAX_PHOTOS = '6';
  var CODE_ESC = 27;
  var IMG_WIDTH = '60px';
  var IMG_HEIGHT = '60px';
  var APPARTMENT = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };


  var createPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    var count = (photos.length > MAX_PHOTOS) ? MAX_PHOTOS : photos.length;
    photos = photos.slice(0, count);
    photos.forEach(function (photo) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.style.width = IMG_WIDTH;
      img.style.height = IMG_HEIGHT;
      img.src = photo;
      li.style.marginRight = '10px';
      li.appendChild(img);
      fragment.appendChild(li);
    });
    return fragment;
  };

  var createFeatures = function (featuresList) {
    var fragment = document.createDocumentFragment();
    featuresList.forEach(function (feature) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + feature;

      fragment.appendChild(li);

    });
    return fragment;
  };


  var escKeydownHandler = function (evt) {
    if (evt.keyCode === CODE_ESC) {
      var article = document.querySelector('.map__card');
      article.classList.add('hidden');
    }
    document.removeEventListener('keydown', escKeydownHandler);
  };

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
      windowElement.querySelector(' h4').textContent = APPARTMENT[data.offer.type];
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
          document.addEventListener('keydown', escKeydownHandler);
        });
        pin.style.left = data[i].location.x +
          'px';
        pin.style.top = data[i].location.y +
          'px';

        pin.setAttribute('data-id', data[i].id);
        pinImg.src = data[i].author.avatar;
        fragment.appendChild(pin);
      }
      mapPins.appendChild(fragment);

    }
  };
})();
