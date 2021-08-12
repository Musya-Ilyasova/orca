@@include('modules/collections-slider.js')
@@include('modules/headerLogo.js')
@@include('modules/collections-swipe-tap.js')

if(document.body.classList.contains("page-collections")) {
  addRotate();
  buildCollectionsSwiper();
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.onscroll = function() {
    myHeaderScroll();
  };
  if(window.innerWidth<768) {
    addNewSwipeMobile();
  } else {
    addSwipeDesktop();
  }
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



@@include('modules/calculator.js')
@@include('modules/gia-slider.js')

if(document.body.classList.contains("page-gia")) {
  addGiaSlider();
}


function faqBtnToggle() {
  document.querySelectorAll('.faq-list-item-top').forEach((item) => {
    item.addEventListener('click', function(){
      this.querySelector('.faq-list-item__btn').classList.toggle('open');
      this.parentNode.querySelector('.faq-list-item__description').classList.toggle('show');
    })
  });
};
if(document.body.classList.contains("page-main")) {
  faqBtnToggle();
}