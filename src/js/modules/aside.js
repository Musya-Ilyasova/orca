function asideAnimation() {
  let aside  = document.querySelector('.page-allocation-aside__wrapper'),
  stocks = document.querySelector('.stocks');
  window.onscroll = function() {
    let stocksBox = stocks.getBoundingClientRect();
    const posTop = stocksBox.top;
    if(posTop <=0) {
      aside.style.top = "100%";
    }
    else {
      aside.style.top = '';
    }
  }
}


