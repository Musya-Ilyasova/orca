function faqBtnToggle() {
  document.querySelectorAll('.faq-list-item-top').forEach((item) => {
    item.addEventListener('click', function(){
      this.querySelector('.faq-list-item__btn').classList.toggle('open');
      this.parentNode.querySelector('.faq-list-item__description').classList.toggle('show');
    })
  });
};

function mainHeaderBtnToggle() {
  let btn = document.querySelector('.header-main-btn'),
  body = document.querySelector('body'),
  menu = document.querySelector('.header-main-menu__wrapper');
  btn.addEventListener('click', function() {
    btn.classList.toggle('show');
    if(btn.classList.contains('show')) {
      body.style.overflow = 'hidden';
      menu.classList.add('open');
    } else {
      body.style.overflow= '';
      menu.classList.remove('open');
    }
  })
}

function scrollPage () {
  let scrollTop = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollTopNew = window.scrollY;
    let header = document.querySelector('.header-main');
    if(scrollTopNew > scrollTop){
      header.classList.add('hide');
    }else{
      header.classList.remove('hide');
    }
    scrollTop = scrollTopNew;
  });
}
// function openSubMenu () {
//   let items = document.querySelectorAll('.header-main-menu-item_submenu > a');
//   items.forEach((item) => {
//     let submenuAll = document.querySelectorAll('.header-main-submenu');
//     let submenu = item.parentNode.querySelector('.header-main-submenu');
//     item.addEventListener('mouseover', function(e) {
//       item.classList.add('show');
//       submenu.classList.add('open');
//       item

//       // if(item.classList.contains('show')) {
//       //   item.classList.remove('show');
//       //   submenu.classList.remove('open');
//       // } else {
//       //   items.forEach((i) => {
//       //     i.classList.remove('show')
//       //   });
//       //   submenuAll.forEach((s) => {
//       //     s.classList.remove('open')
//       //   });
//       //   item.classList.add('show');
//       //   submenu.classList.add('open');
//       // };
//     })
//   })
// }

if(document.body.classList.contains("page-main")) {
  faqBtnToggle();
  mainHeaderBtnToggle();
  if (window.innerWidth < 768) {
    scrollPage ();
  }
}
