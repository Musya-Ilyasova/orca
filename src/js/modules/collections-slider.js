
var initialPoint;
var finalPoint;
let swipeBox = document.querySelector('.first-swipe-box');
// swipeBox.addEventListener('click', function )
let imageTop = document.querySelector('.collections-slider-item-img-top');
let imageBottom = document.querySelector('.collections-slider-item-img-bottom');
function buildCollectionsSwiper() {
  (function () {
    "use strict";
    var breakpoint = window.matchMedia("(min-width:768px)");
    var collectionsSwiper;

    var breakpointChecker = function breakpointChecker() {
      if (breakpoint.matches === true) {
        if (breakpointChecker !== undefined) {
          window.onresize = function() {
            collectionsSwiper.destroy(true, true);
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
        effect: 'fade',
        speed: 1000,
        allowTouchMove: false,
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: '.collections-slider-next',
          prevEl: '.collections-slider-prev',
        },
        touchEventsTarget: ".first-swipe-box",
        on: {
          init: function () {
            addSwipeMobile();
          },
          slideChangeTransitionEnd: function () {
            if(document.querySelector('.swipe-box-mobile')) {
              document.querySelector('.swipe-box-mobile').remove();
              document.querySelector('.tap-box-mobile').remove();
            }
            if(document.querySelector('.swiper-slide-active .collections-slider-item-img__top').classList.contains('opacity')) {
              return;
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
addRotate();
buildCollectionsSwiper();



