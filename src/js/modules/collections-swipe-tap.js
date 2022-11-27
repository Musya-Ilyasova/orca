
function addSwipeDesktop() {
  var initialPoint;
  var finalPoint;
  let collectionItem = document.querySelectorAll('.collections-slider-item');
  let imageFee = document.querySelector('.collections-new-item-fee');
  collectionItem.forEach((item) => {
    let swipeBox = document.createElement('div');
    swipeBox.classList.add('swipe-box');
    let tapBox = document.createElement('div');
    tapBox.classList.add('tap-box');
    let imageBox = item.querySelector('.collections-slider-item-img');
    let imageTop = item.querySelector('.collections-slider-item-img__top');
    let imageBottom = item.querySelector('.collections-slider-item-img__bottom');
    let imageCard = item.querySelector('.collections-slider-item-img__card');
    imageBox.prepend(tapBox);
    imageBox.prepend(swipeBox);
    swipeBox.addEventListener('mousedown', function (e) {
      e.preventDefault();
      e.stopPropagation();
      initialPoint = e.screenX;
    }, false);
    swipeBox.addEventListener('mouseup', function (e) {
      e.preventDefault();
      e.stopPropagation();
      finalPoint = e.screenX;
      var xAbs = Math.abs( finalPoint - initialPoint);
      if (xAbs>30) {
        imageTop.classList.add('next-step');
        imageBottom.classList.add('next-step');
        tapBox.style.display = "block";
        imageBox.style.transform = "";
        if(imageBox.classList.contains("show-swipe")) {
          imageBox.classList.add('opacity-swipe');
          imageBox.classList.add('show-tap');
        }
        if(imageFee) {
          imageFee.classList.add('opacity');
        }
        tapBox.addEventListener('click', function(e) {
          e.preventDefault();
          imageTop.classList.add('opacity');
          imageBottom.classList.add('opacity');
          if(imageBox.classList.contains("show-tap")) {
            imageBox.classList.add('opacity-tap');
          };
          tapBox.style.display = 'none';
          swipeBox.style.display = 'none';
          imageCard.classList.add('scale');
          function map(val, minA, maxA, minB, maxB) {
            return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
          }
          function Card3D(imageCard, ev) {
            let img = imageCard.querySelector('img');
            let imgRect = imageCard.getBoundingClientRect();
            let width = imgRect.width;
            let height = imgRect.height;
            let mouseX = ev.offsetX;
            let mouseY = ev.offsetY;
            let rotateY = map(mouseX, 0, width, -25, 25);
            let rotateX = map(mouseY, 0, height, 25, -25);
            let brightness = map(mouseY, 0, height, 1.5, 0.5);
            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            img.style.filter = `brightness(${brightness})`;
          }
          imageCard.addEventListener('mousemove', (ev) => {
            Card3D(imageCard, ev);
          });
          imageCard.addEventListener('mouseout', (ev) => {
            let img = imageCard.querySelector('img');
            img.style.transform = 'rotateX(0deg) rotateY(0deg)';
            img.style.filter = 'brightness(1)';
          });
        }, true)
      }
    }, true);
  });
};

function addNewSwipeMobile() {
  let wrapper = document.querySelector('.collections-new-item-wrapper');
  let swipeNewBox = document.createElement('div');
  swipeNewBox.classList.add('swipe-box-mobile');
  wrapper.appendChild(swipeNewBox);
  let tapNewBox = document.createElement('div');
  tapNewBox.classList.add('tap-box-mobile');
  wrapper.appendChild(tapNewBox);
  let initialPoint;
  let finalPoint;
  let imageBox = wrapper.querySelector('.collections-slider-item-img');
  let imageFee = wrapper.querySelector('.collections-new-item-fee');
  let imageTop = wrapper.querySelector('.collections-slider-item-img__top');
  let imageBottom = wrapper.querySelector('.collections-slider-item-img__bottom');
  let imageCard = wrapper.querySelector('.collections-slider-item-img__card');
  let imageCardImg = wrapper.querySelector('.collections-slider-item-img__card img');
  imageCardImg.style.opacity = "0";
  imageBox.classList.add("show-swipe");
  swipeNewBox.addEventListener('touchstart', function(event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
  }, false);
  swipeNewBox.addEventListener('touchend', function(event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX) {
          imageCardImg.style.opacity = "";
          imageTop.classList.add('next-step');
          imageFee.classList.add('opacity');
          imageBottom.classList.add('next-step');
          imageBox.classList.add('next-step')
          swipeNewBox.classList.add('tap');
          tapNewBox.style.display='block';
          if(imageBox.classList.contains("show-swipe")) {
            imageBox.classList.add('opacity-swipe');
            imageBox.classList.add('show-tap');
          }
        }
      };
    }
  }, true);
  tapNewBox.addEventListener('click', function(event) {
    event.preventDefault();
    imageTop.classList.add('opacity');
    imageBottom.classList.add('opacity');
    setTimeout(() => imageCard.style.transform = "scale(1.2)", 500);
    if(imageBox.classList.contains("show-tap")) {
      imageBox.classList.add('opacity-tap');
    }
  }, false);
}

function addSwipeMobile() {
  let slider = document.querySelector('.collections-slider-container');
  let swipeBox = document.createElement('div');
  swipeBox.classList.add('swipe-box-mobile');
  slider.appendChild(swipeBox);
  let tapBox = document.createElement('div');
  tapBox.classList.add('tap-box-mobile');
  slider.appendChild(tapBox);
  let initialPoint;
  let finalPoint;
  let imageBox = document.querySelector('.swiper-slide-active .collections-slider-item-img');
  let imageTop = document.querySelector('.swiper-slide-active .collections-slider-item-img__top');
  let imageBottom = document.querySelector('.swiper-slide-active .collections-slider-item-img__bottom');
  let imageCard = document.querySelector('.swiper-slide-active .collections-slider-item-img__card');
  let imageCardImg = document.querySelector('.swiper-slide-active .collections-slider-item-img__card img');
  imageCardImg.style.opacity = "0";
  imageBox.classList.add("show-swipe");
  if(imageTop.classList.contains('next-step')) {
    tapBox.style.display='block';
    imageCardImg.style.opacity = "1";
    tapBox.addEventListener('click', function(event) {
      event.preventDefault();
      imageTop.classList.add('opacity');
      imageBottom.classList.add('opacity');
      setTimeout(() => imageCard.style.transform = "scale(1.2)", 500);
      if(imageBox.classList.contains("show-tap")) {
        imageBox.classList.add('opacity-tap');
      }
    }, false);
  } else {
    swipeBox.addEventListener('touchstart', function(event) {
      event.preventDefault();
      event.stopPropagation();
      initialPoint = event.changedTouches[0];
    }, false);
    swipeBox.addEventListener('touchend', function(event) {
      event.preventDefault();
      event.stopPropagation();
      finalPoint = event.changedTouches[0];
      var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
      var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
      if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
          if (finalPoint.pageX < initialPoint.pageX) {
            imageCardImg.style.opacity = "";
            imageTop.classList.add('next-step');
            imageBottom.classList.add('next-step');
            imageBox.classList.add('next-step')
            swipeBox.classList.add('tap');
            tapBox.style.display='block';
            if(imageBox.classList.contains("show-swipe")) {
              imageBox.classList.add('opacity-swipe');
              imageBox.classList.add('show-tap');
            }
          }
        };
      }
    }, true);
    tapBox.addEventListener('click', function(event) {
      event.preventDefault();
      imageTop.classList.add('opacity');
      imageBottom.classList.add('opacity');
      setTimeout(() => imageCard.style.transform = "scale(1.2)", 500);
      if(imageBox.classList.contains("show-tap")) {
        imageBox.classList.add('opacity-tap');
      }
    }, false);
  }
}


