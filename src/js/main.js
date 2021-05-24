
@@include('modules/headerLogo.js')
@@include('modules/collections-swipe-tap.js')
@@include('modules/collections-slider.js')


if(document.body.classList.contains("page-collections")) {
  addRotate();
  buildCollectionsSwiper();
  addSwipeDesktop();
  window.onscroll = function() {
    myHeaderScroll();
  };
}
if(document.body.classList.contains("page-allocation")) {
  @@include('modules/lottie.js')
  @@include('modules/pageShareXhr.js')
  @@include('modules/aside.js')
  @@include('modules/copyAllocation.js')
}
