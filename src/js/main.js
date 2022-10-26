function yellowsEyes() {
  let section = document.querySelector('.us-add');
  let eyes = document.querySelectorAll('.us-add-img-1 span');
  let massXY = [];
  eyes.forEach((e) => {
    let img = e.querySelector('i');
    let item = {
      wrapper: e.getBoundingClientRect(),
      imgX: - img.offsetLeft,
      imgY: - img.offsetTop,
      wrapperH: e.getBoundingClientRect().height,
      wrapperW: e.getBoundingClientRect().width,
      maxX: - img.offsetLeft + e.getBoundingClientRect().width - img.getBoundingClientRect().width,
      maxY: - img.offsetTop + e.getBoundingClientRect().height - img.getBoundingClientRect().height,
    }
    massXY.push(item);
  })

  let items = document.querySelectorAll(".us-add-img-1 span i");
  for(let i=0; i<=items.length-1; i++) {
    items[i].setAttribute("data-count", String(i));
  }
  window.addEventListener('mousemove', function(e) {
    let coordX = e.clientX;
    let coordY = e.clientY;
    eyes.forEach((item) =>  {
      let img = item.querySelector('i');
      let imgData = Number(item.querySelector('i').dataset.count);

      let wrapperLeft = item.getBoundingClientRect().left;
      let wrapperTop = item.getBoundingClientRect().top;

      let diffX = massXY[imgData].wrapperW / window.screen.width;
      let diffY = massXY[imgData].wrapperH / window.screen.height;

      let deviationX = Math.abs(window.screen.width / 2 - wrapperLeft) / window.screen.width * massXY[imgData].wrapperW - img.getBoundingClientRect().width/2;
      let deviationY = Math.abs(window.screen.height / 2 - wrapperTop) / window.screen.height * massXY[imgData].wrapperH;

      let x = massXY[imgData].imgX + (coordX * diffX) + deviationX;
      let y = massXY[imgData].imgY + (coordY * diffY) + deviationY;

      if(x < massXY[imgData].imgX) x = massXY[imgData].imgX;
      if(y < massXY[imgData].imgY) y = massXY[imgData].imgY;
      if(x > massXY[imgData].maxX) x = massXY[imgData].maxX;
      if(y > massXY[imgData].maxY) y = massXY[imgData].maxY;
      img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    })

  }, true);

  section.addEventListener('mouseout', function(e) {
    items.forEach((i) => {
      i.style.transform = `translate3d(0px, 0px, 0 )`;
    })
  });
}


yellowsEyes();
