function buildCollectionsSwiper() {
  (function () {
    "use strict";
    var breakpoint = window.matchMedia("(min-width:768px)");
    var collectionsSwiper;

    var breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (breakpointChecker !== undefined) {
          if(document.querySelector('.collections-slider-container').classList.contains('swiper-container-initialized')) {
            collectionsSwiper.destroy(true, true);
          }
          window.onresize = function() {
            if(document.querySelector('.collections-slider-container').classList.contains('swiper-container-initialized')) {
              collectionsSwiper.destroy(true, true);
            }
          }
          return;
        }
      } else if (breakpoint.matches === false) {
        return enableCollectionsSwiper();
      }
    };

    var enableCollectionsSwiper = function enableCollectionsSwiper() {
      collectionsSwiper = new Swiper(".collections-slider-container", {
        lidesPerView: 1,
        spaceBetween: 22,
        speed: 300,
        allowTouchMove: false,
        navigation: {
          nextEl: '.collections-slider-next',
          prevEl: '.collections-slider-prev',
        },
        touchEventsTarget: ".first-swipe-box",
        on: {
          init: function () {
            addSwipeMobile();
          },
          slideChange: function () {
            document.querySelector('.swiper-slide-active .collections-slider-item-img__card').style.transform="";
          },
          slideChangeTransitionStart: function () {
            if(document.querySelector('.swipe-box-mobile')) {
              document.querySelector('.swipe-box-mobile').remove();
              document.querySelector('.tap-box-mobile').remove();
            };
            if(document.querySelector('.swiper-slide-active .collections-slider-item-img__top').classList.contains('opacity')) {
              document.querySelector('.swiper-slide-active .collections-slider-item-img__card').style.transitionDelay="0.2s";
              document.querySelector('.swiper-slide-active .collections-slider-item-img__card').style.transform="scale(1.2)";
            } else {
              addSwipeMobile();
            }
          }
        },
      });
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();
}


function addRotate() {
  let collectionImg = document.querySelectorAll('.collections-slider-item-img');
  for(let i=0; i<=collectionImg.length-1; i++) {
    if(i%2 === 0) {
      collectionImg[i].style.transform = 'rotate(-2deg)';
    } else {
      collectionImg[i].style.transform = 'rotate(2deg)';
    }
  };
};


buildCollectionsSwiper();


