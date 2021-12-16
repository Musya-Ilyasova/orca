function yellowsEyes() {
  let section = document.querySelector('.us-add');
  let wrapper = document.querySelector('.us-add-img-1 span:nth-of-type(2)').getBoundingClientRect();
  let img = document.querySelector('.us-add-img-1 span:nth-of-type(2) i');
  let startX, startY;
  section.addEventListener('mouseenter', function(e) {
    startX = wrapper.top;
    startY = wrapper.left;
  });
  section.addEventListener('mousemove', function(e) {
    let imgX = img.offsetLeft-(img.offsetWidth),
    imgY = img.offsetTop + (img.offsetHeight);
    let nextX = e.clientX;
    let nextY = e.clientY;
    let fractionX = (nextX - wrapper.top) / section.offsetWidth;
    let fractionY = (nextY - wrapper.left) / section.offsetHeight;
    console.log(fractionX, fractionY);

    let x = imgX * fractionX;
    let y = imgY * fractionY;

    // if (x < -(img.offsetLeft)) x = -(img.offsetLeft);
    // if (x > imgX) x = imgX;
    // if (y < img.offsetTop) y = img.offsetTop;
    // if (y > imgY) y = imgY+img.offsetHeight;
    // console.log("startX, startY")
    // console.log(startX, startY)
    // console.log("e.clientX, e.clientY")
    // console.log(e.clientX, e.clientY)

    img.style.transform = `translate3d(${x*2}px, ${y*2}px, 0 )`;
   console.log(img.style.transform);

    // if (x < minX) x = minX;
    // if (x > maxX) x = maxX;
    // if (y < minY) y = minY;
    // if (y > maxY) y = maxY;

    // img.style.transform = `translate3d(${}px, ${}px, 0 )`;
    // console.log(img.style.transform);
    // if(nextX > startX) {

    // }
    // let x = (e.clientX - imgX)/100;
    // let y = (e.clientY - imgY)/100;
    // img.style.transform = `translate3d(${x * 3}px, ${y * 3}px, 0 )`;
    // console.log(startX, startY,  nextX, nextY);

    // img.forEach(i => {
    //   i.style.transform = `translate3d(${x * 2}px, ${y * 2}px, 0 )`;
    // });
    // document.querySelector('.intro-referral_image_logotypes').style.transform = `translate3d(${x * 3}px, ${y * 3}px, 0 )`;
    // document.querySelector('.intro-referral_image_gifts').style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0 )`;
  }, true);
  section.addEventListener('mouseout', function(e) {
    img.style.transform = `translate3d(0px, 0px, 0 )`;
  });
}

yellowsEyes();
