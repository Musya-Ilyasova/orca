@@include('modules/headerLogo.js')
@@include('modules/collections-slider.js')
@@include('modules/collections-swipe-tap.js')
@@include('modules/yellowEyes.js')
@@include('modules/pageShareXhr.js')

if(document.body.classList.contains('page-collections')) {
    buildCollectionsSwiper();
    addSwipeDesktop();
    if(window.innerWidth<=767) {
      addNewSwipeMobile();
      addSwipeMobile();
    }
}


if(document.body.classList.contains('us-page')) {
    yellowsEyes();
}