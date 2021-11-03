if(document.body.classList.contains("page-main")) {
  faqBtnToggle();
  mainHeaderBtnToggle();
  if (window.innerWidth < 768) {
    scrollPage ();
  }
}


@@include('modules/team.js');
