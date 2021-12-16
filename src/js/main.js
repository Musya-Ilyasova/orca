function yellowsEyes() {
  let section = document.querySelector('.us-add');
  let wrapper = document.querySelector('.us-add-img-1 span:nth-of-type(2)').getBoundingClientRect(),
  img = document.querySelector('.us-add-img-1 span:nth-of-type(2) i'),
  imgX = img.offsetLeft+(img.offsetWidth),
  imgY = img.offsetTop+(img.offsetHeight);

  console.log(wrapper);
  section.addEventListener('mousemove', function(e) {
    let x = (e.clientX - imgX)/100;
    let y = (e.clientY - imgY)/100;
    img.style.transform = `translate3d(${x * 5}px, ${y * 5}px, 0 )`;
    // console.log(x);
    // console.log(y);

    // img.forEach(i => {
    //   i.style.transform = `translate3d(${x * 2}px, ${y * 2}px, 0 )`;
    // });
    // document.querySelector('.intro-referral_image_logotypes').style.transform = `translate3d(${x * 3}px, ${y * 3}px, 0 )`;
    // document.querySelector('.intro-referral_image_gifts').style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0 )`;
  });
  section.addEventListener('mouseleave', function() {
    img.style.transform = `translate3d(0, 0, 0 )`;
  });
}

yellowsEyes();
