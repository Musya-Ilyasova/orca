
function addSwipeDesktop() {
  var initialPoint;
  var finalPoint;
  let swipeBox = document.querySelector('.first-swipe-box');
  let imageTop = document.querySelector('.collections-slider-item-img__top');
  let imageBottom = document.querySelector('.collections-slider-item-img__bottom');
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
  let slider = document.querySelector('.collections-slider-container');
  let swipeBox = document.createElement('div');
  swipeBox.classList.add('swipe-box-mobile');
  slider.appendChild(swipeBox);
  let tapBox = document.createElement('div');
  tapBox.classList.add('tap-box-mobile');
  slider.appendChild(tapBox);
  let hoverBox = document.createElement('div');
  hoverBox.classList.add('hover-box-mobile');
  for(let i=0; i<=3; i++) {
    let a = document.createElement('a');
    hoverBox.appendChild(a);
  }
  let hoverBoxItems = hoverBox.querySelectorAll('a');
  slider.appendChild(hoverBox);
  var initialPoint;
  var finalPoint;
  let imageBox = document.querySelector('.swiper-slide-active .collections-slider-item-img');  
  let imageTop = document.querySelector('.swiper-slide-active .collections-slider-item-img__top');
  let imageBottom = document.querySelector('.swiper-slide-active .collections-slider-item-img__bottom');
  let imageCard = document.querySelector('.swiper-slide-active .collections-slider-item-img__card');  
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
          imageTop.classList.add('next-step');
          imageBottom.classList.add('next-step');
          imageBox.classList.add('next-step')
          swipeBox.classList.add('tap');
          tapBox.style.display='block';
          tapBox.addEventListener('click', function(event) {
            event.preventDefault();
            imageTop.classList.add('opacity');
            imageBottom.classList.add('opacity');
            hoverBox.style.display='grid';
          }, false);
        }
      };
    }
  }, true);
  for (let i = 0; i<=hoverBoxItems.length-1; i++) {
    hoverBoxItems[i].addEventListener('mouseover', function() {
      if(i==0) {
        imageCard.style.transform = "rotate3d(-1, 1, 0, 28deg)";
      }
      if(i==1) {
        imageCard.style.transform = "rotate3d(1, 1, 0, 28deg)";
      }
      if(i==2) {
        imageCard.style.transform = "rotate3d(-1, 1, 0, 28deg)";
      }
      if(i==3) {
        imageCard.style.transform = "rotate3d(1, 1, 0, 28deg))";
      }
    })
    hoverBoxItems[i].addEventListener('mouseoute', function() {
      imageCard.style.transform = "rotate3d(1, 1, 1, 0))";
    });
  };
}
