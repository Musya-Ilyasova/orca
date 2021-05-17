
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
