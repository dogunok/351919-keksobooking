/* eslint-disable valid-jsdoc */
'use strict';
(function () {
  var template = document.querySelector('template').content;
  var map = document.querySelector('.map');
  var mapFiltersConainer = document.querySelector('.map__filters-container');
  /**
   * Функция создания картинок для объявления
   * @param data массив из которого берем данные
   * @param numberPhoto номер картинки
   * @return {HTMLLIElement}
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
   * Функция создает шаблон, пинов и объявления
   * @param data исходный массив
   * @param numberId номер пина
   */
  window.render = {
    renderWindow: function (data, numberId) {
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
        for (var i = 0; i < window.data.photos.length; i++) {
          fragment.appendChild(renderPicture(data, i));
        }
        return fragment;
      };
      windowElement.querySelector('.popup__pictures').appendChild(renderPectures());
      windowElement.querySelector('.map__pin').style.left = data.location.x + 'px';
      windowElement.querySelector('.map__pin').style.top = data.location.y + 'px';
      windowElement.querySelector('.map__pin img').src = data.author.avatar;
      windowElement.querySelector('.map__pin').setAttribute('data-id', numberId);
      windowElement.querySelector('.map__pin').classList.add('pin__solo');
      windowElement.querySelector('.map__pin').classList.add('hidden');
      windowElement.querySelector('.map__card').classList.add('hidden');
      map.insertBefore(windowElement, mapFiltersConainer);
    },
    card: map
  };
})();
