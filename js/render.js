/* eslint-disable valid-jsdoc */
'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  /**
   * Функция создания фотографий
   * @param photos
   * @returns {DocumentFragment}
   */
  var createPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    var count = (photos.length > 6) ? 6 : photos.length;
    photos = photos.slice(0, count);
    photos.forEach(function (photo) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.style.width = '60px';
      img.style.height = '60px';
      img.src = photo;
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
      popup.querySelector('.popup__close').
          addEventListener('click', function () {
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
      features.appendChild(createPictures(data.offer.photos));
      windowElement.querySelector(' .popup__avatar').src = data.author.avatar;
      windowElement.querySelector(' h3').textContent = data.offer.title;
      windowElement.querySelector(' p').textContent = data.location.x + ',' +
        data.location.y;
      windowElement.querySelector(
          '.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
      windowElement.querySelector(' h4').textContent = data.offer.type;
      windowElement.querySelectorAll('p')[2].textContent = data.offer.rooms +
        ' комнаты для ' + data.offer.guests + ' гостей';
      windowElement.querySelectorAll('p')[3].textContent = 'Заезд после ' +
        data.offer.checkin + ', выезд до ' + data.offer.checkout;
      windowElement.querySelectorAll(
          'p')[4].textContent = data.offer.description;

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
        var pinImg = template.querySelector('.map__pin img');

        pin.addEventListener('click', function (evt) {
          var id = evt.currentTarget.dataset.id;
          window.render.updatePopup(id);
          console.log(id);

        });

        pin.style.left = data[i].location.x +
          'px';
        pin.style.top = data[i].location.y +
          'px';

        pin.setAttribute('data-id', i);
        pinImg.src = data[i].author.avatar;
        console.log(data[i].author.avatar);
        pin.classList.add('hidden');
        fragment.appendChild(pin);
      }
      mapPins.appendChild(fragment);

    },
  };
})();
