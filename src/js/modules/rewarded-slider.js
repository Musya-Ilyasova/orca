// const swiper = new Swiper('.rewarded-slider-container', {
//   speed: 400,
//   spaceBetween: 10,
//   slidesPerView: 'auto',
//   pagination: {
//     el: '.swiper-pagination',
//   },
// });

(function () {
  "use strict";
  const breakpoint = window.matchMedia("(min-width:768px)");
  let rewardedSlider;
  const breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (rewardedSlider !== undefined) rewardedSlider.destroy(true, true);
      return;
    } else if (breakpoint.matches === false) {
      return enableTopSwiper();
    }
  };
  const enableTopSwiper = function () {
    rewardedSlider = new Swiper(".rewarded-slider-container", {
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
      },
    });
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
})();