
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
  @@include('modules/chart-tooltip.js') 
};


if(document.body.classList.contains("page-seo")) {
  function faqBtnToggle() {
    document.querySelectorAll('.faq-list-item-top').forEach((item) => {
      item.addEventListener('click', function(){
        this.querySelector('.faq-list-item__btn').classList.toggle('open');
        this.parentNode.querySelector('.faq-list-item__description').classList.toggle('show');
      })
    });
  };
  faqBtnToggle();
}