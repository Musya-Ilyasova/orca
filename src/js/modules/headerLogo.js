
let headerLogo = document.querySelector('.headerLogo');
function myHeaderScroll() {
  if (window.pageYOffset > 100) {
    headerLogo.classList.add("sticky");
  } else {
    headerLogo.classList.remove("sticky");
  }
}
