function addGiaSlider() {
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    slideToClickedSlide: true,
    // If we need pagination
    pagination: {
      el: '.gia-why-slider-nav-dots',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.gia-why-slider-nav-next',
      prevEl: '.gia-why-slider-nav-prev',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}
