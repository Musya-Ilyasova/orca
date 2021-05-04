const swiper = new Swiper('.collections-slider-container', {
  // Optional parameters
  lidesPerView: 1,
  spaceBetween: 22,
  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: '.collections-slider-next',
    prevEl: '.collections-slider-prev',
  },
  on: {
    init: addRotate(),
  }

});

function addRotate() {
  let collectionImg = document.querySelectorAll('.collections-slider-item-img');
  // for(let i=1; i<=collectionImg.length; i++) {
  //   console.log(i);
  // }
  for(let i=1; i<=collectionImg.length; i++) {
    if(i%2 ===0) {
      collectionImg[i].style.transform = 'rotate(2deg)';
    } else {
      collectionImg[i].style.transform = 'rotate(-2deg)';
    }
  }
}
