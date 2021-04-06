document.addEventListener('DOMContentLoaded', function () {
  @@include('modules/svg.js');
  @@include('modules/polyfills.js');
  @@include('modules/faq.js');
});
if(document.body.classList.contains("page-referral_page")) { 
  // INTRO SECTION

  var imgX = $('.intro-referral_image').offset().left + ($('.intro-referral_image').width() / 2);
  var imgY = $('.intro-referral_image').offset().top + ($('.intro-referral_image').height() / 2);

  // Parallax phone image
  $(window).on('mousemove', function (e) {
    var x = (e.clientX - imgX) / 100;
    var y = (e.clientY - imgY) / 100;
    $('.intro-referral_image_guys').css('transform', 'translate3d(' + x * 2 + 'px, ' + y * 2 + 'px, 0)')
    $('.intro-referral_image_logotypes').css('transform', 'translate3d(' + x * 3 + 'px, ' + y * 3 + 'px, 0)')
    $('.intro-referral_image_gifts').css('transform', 'translate3d(' + x * 4 + 'px, ' + y * 4 + 'px, 0)')
    $('.intro-referral_background').css('transform', 'translate3d(' + x * 1 + 'px, ' + y * 1 + 'px, 0)')
  })

  // Text Me a Link - allow input from 0 to 9
  function inputAllowedKeys(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) 
      return false;
    
    return true;
  };

  // rewarded-slider
  (function () {
    "use strict";
    const breakpoint = window.matchMedia("(min-width:768px)");
    let rewardedSlider;
    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (rewardedSlider !== undefined) 
          rewardedSlider.destroy(true, true);
        
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
          el: '.swiper-pagination'
        }
      });
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();
}


// shares-isa-slider

(function () {
  "use strict";
  const breakpoint = window.matchMedia("(min-width:768px)");
  let sharesIsaSlider;
  const breakpointCheckerIsa = function () {
    if (breakpoint.matches === true) {
      if (sharesIsaSlider !== undefined) 
      sharesIsaSlider.destroy(true, true);
      return;
    } else if (breakpoint.matches === false) {
      return enableIsaSwiper();
    }
  };
  const enableIsaSwiper = function () {
    sharesIsaSlider = new Swiper(".shares-isa-slider-container ", {
      speed: 400,
      slidesPerView: 'auto',
      spaceBetween: -15,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination'
      }
    });
  };
  breakpoint.addListener(breakpointCheckerIsa);
  breakpointCheckerIsa();
})();
