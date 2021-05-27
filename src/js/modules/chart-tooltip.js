function chartTooltip() {
  let link  = document.querySelector('.chart-tooltip-link');
  let tooltip  = document.querySelector('.chart-tooltip-box');
  let tooltipBtn  = document.querySelector('.chart-tooltip-box__btn');
  let screen  = document.querySelector('.screen');
  let body = document.querySelector('.page-allocation');
  link.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.add('lock');
    tooltip.classList.add('open');
    removeTooltip(screen);
    removeTooltip(tooltipBtn);
  });
  function removeTooltip(elem) {
    elem.addEventListener('click', function(e) {
      e.preventDefault();
      body.classList.remove('lock');
      tooltip.classList.remove('open');
    });
  }
}
