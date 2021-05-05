
function addSwipeDesktop() {
  var initialPoint;
  var finalPoint;
  let swipeBox = document.querySelector('.first-swipe-box');
  let imageTop = document.querySelector('.collections-slider-item-img-top');
  let imageBottom = document.querySelector('.collections-slider-item-img-bottom');
  
  swipeBox.addEventListener('touchstart', function (event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
  }, false);
  swipeBox.addEventListener('touchend', function (event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX) {
          imageTop.classList.add('next-step');
          imageBottom.classList.add('next-step');
        }
      };
    }
  }, true);
}

function addSwipeMobile() {
  var initialPoint;
  var finalPoint;
  let swipeBox = document.querySelector('.first-swipe-box-mobile');
  let imageTop = document.querySelector('.swiper-slide-active .collections-slider-item-img-top');
  let imageBottom = document.querySelector('.swiper-slide-active .collections-slider-item-img-bottom');
  
  swipeBox.addEventListener('touchstart', function (event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
  }, false);
  swipeBox.addEventListener('touchend', function (event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX) {
          imageTop.classList.add('next-step');
          imageBottom.classList.add('next-step');
        }
      };
    }
  }, true);
  swipeBox.classList.add('tap');
  if(swipeBox.classList.contains('tap')) {
    swipeBox.addEventListener('click', function() {
      imageTop.classList.add('opacity');
      imageBottom.classList.add('opacity');
    })
  }
}
addSwipeMobile();
// addSwipe();