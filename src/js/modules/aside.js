function asideAnimation() {
  let aside  = document.querySelector('.page-allocation-aside__wrapper'),
  rewarded = document.querySelector('.page-allocation-rewarded');
  window.onscroll = function() {
    let rewardedBox = rewarded.getBoundingClientRect();
    const posTop = rewardedBox.top;
    if(posTop <= window.innerHeight) {
      aside.style.top = "100%";
    }else {
      aside.style.top = '';
    }
  }
}


