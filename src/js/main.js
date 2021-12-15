function yellowsEyes() {
  let section = document.querySelector('.us-add');
  let img = document.querySelector('.us-add-img-1 span i'),
  imgX = img.offsetLeft+(img.offsetWidth),
  imgY = img.offsetTop+(img.offsetHeight);
  console.log(img.offsetLeft)
  section.addEventListener('mousemove', function(e) {
    let x = (e.clientX - imgX)/100;
    let y = (e.clientY - imgY)/100;
    img.style.transform = `translate3d(${x * 3}px, ${y * 3}px, 0 )`;
    console.log(x);
    console.log(y);

    // img.forEach(i => {
    //   i.style.transform = `translate3d(${x * 2}px, ${y * 2}px, 0 )`;
    // });
    // document.querySelector('.intro-referral_image_logotypes').style.transform = `translate3d(${x * 3}px, ${y * 3}px, 0 )`;
    // document.querySelector('.intro-referral_image_gifts').style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0 )`;
  })
}

yellowsEyes();
