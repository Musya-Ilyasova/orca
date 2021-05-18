function asideAnimation() {
  let aside  = document.querySelector('.page-allocation-aside'),
  rewarded = document.querySelector('.page-allocation-rewarded');
  window.onscroll = function() {
    let rewardedBox = rewarded.getBoundingClientRect();
    const posTop = rewardedBox.top;
    if(posTop + rewarded.clientHeight <= window.innerHeight && posTop >= 0) {
      aside.classList.add('visible');
    }
  }

}


