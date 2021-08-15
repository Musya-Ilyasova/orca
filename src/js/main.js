function faqBtnToggle() {
  document.querySelectorAll('.faq-list-item-top').forEach((item) => {
    item.addEventListener('click', function(){
      this.querySelector('.faq-list-item__btn').classList.toggle('open');
      this.parentNode.querySelector('.faq-list-item__description').classList.toggle('show');
    })
  });
};

function mainHeaderBtnToggle() {
  let btn = document.querySelector('.header-main-btn');
  btn.addEventListener('click', function() {
    btn.classList.toggle('show');
  })
}

if(document.body.classList.contains("page-main")) {
  faqBtnToggle();
  mainHeaderBtnToggle();
}