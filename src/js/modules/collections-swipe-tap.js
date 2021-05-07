
function addSwipeDesktop() {
  var initialPoint;
  var finalPoint;
  let collectionItem = document.querySelectorAll('.collections-slider-item');
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
    let hoverBox = document.createElement('div');
    hoverBox.classList.add('hover-box');
    imageCard.prepend(hoverBox);
    for(let i=0; i<=8; i++) {
      let a = document.createElement('a');
      hoverBox.prepend(a);
    }
    let hoverBoxItems = hoverBox.querySelectorAll('a');
    swipeBox.addEventListener('touchstart', function (e) {
      console.log(swipeBox);
      e.preventDefault();
      e.stopPropagation();
      initialPoint = e.changedTouches[0];
    }, false);
    swipeBox.addEventListener('touchend', function (e) {
      e.preventDefault();
      e.stopPropagation();
      finalPoint = e.changedTouches[0];
      var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
      var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
      if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
          if (finalPoint.pageX < initialPoint.pageX) {
            imageTop.classList.add('next-step');
            imageBottom.classList.add('next-step');
            tapBox.style.display = "block";
            imageBox.style.transform = "";
            if(imageBox.classList.contains("show-swipe")) {
              imageBox.classList.add('opacity-swipe');
              imageBox.classList.add('show-tap');
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
            }, false)
          }
        };
      }
    }, true);
    for (let i = 0; i<=hoverBoxItems.length-1; i++) {
    hoverBoxItems[i].addEventListener('click', function(e) {
      e.preventDefault;
      if(i==0) {
        imageCard.style.transform = "rotate3d(-4, 1, 0, 28deg) scale(1.2)";
      } else if (i==1) {
        imageCard.style.transform = "rotateX(28deg) scale(1.2)";
      } else if (i==2) {
        imageCard.style.transform = "rotate3d(2, 1, 0, 28deg) scale(1.2)";
      } else if (i==3) {
        imageCard.style.transform = "rotateY(-28deg) scale(1.2)";
      } else if (i==4) {
        imageCard.style.transform = "scale(1.2)";
      } else if (i==5) {
        imageCard.style.transform = "rotateY(28deg) scale(1.2)";
      } else if (i==6) {
        imageCard.style.transform = "rotate3d(-1, 1, 0, 28deg) scale(1.2)";
      } else if (i==7) {
        imageCard.style.transform = "rotateX(28deg) scale(1.2)";
        console.log(i);
      } else if (i==8) {
        imageCard.style.transform = "rotate3d(1, 1, 0, 28deg) scale(1.2)";
      }
    }, false);
    hoverBox.addEventListener('click', function(e) {
      e.preventDefault;
      this.style.transform = "scale(1.2)";
    });
    hoverBox.addEventListener('mouseoute', function() {
      this.style.transform = "scale(1)";
      e.preventDefault;
      imageCard.style.transform = "rotate3d(1, 1, 1, 0))";
    });
  };
  });
};
addSwipeDesktop();

function addSwipeMobile() {
  let slider = document.querySelector('.collections-slider-container');
  let swipeBox = document.createElement('div');
  swipeBox.classList.add('swipe-box-mobile');
  slider.appendChild(swipeBox);
  let tapBox = document.createElement('div');
  tapBox.classList.add('tap-box-mobile');
  slider.appendChild(tapBox);
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
          if(imageBox.classList.contains("show-swipe")) {
            imageBox.classList.add('opacity-swipe');
            imageBox.classList.add('show-tap');
          }
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
      };
    }
  }, true);
}
