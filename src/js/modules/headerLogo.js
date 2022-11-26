let header = document.querySelector('.header-main');
function myHeaderScroll() {
  if (window.pageYOffset > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


function mainHeaderBtnToggle() {
  let btn = document.querySelector('.header-main-btn'),
    body = document.querySelector('body'),
    menu = document.querySelector('.header-main-menu__wrapper'),
    header = document.querySelector('header');
  btn.addEventListener('click', function () {
    btn.classList.toggle('show');
    if (btn.classList.contains('show')) {
      body.style.overflow = 'hidden';
      menu.classList.add('open');
      header.classList.add('black');
    } else {
      body.style.overflow = '';
      menu.classList.remove('open');
      header.classList.remove('black');
    }
  })
}
document.addEventListener('scroll', (e) => {

  myHeaderScroll();

})

mainHeaderBtnToggle();