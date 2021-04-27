function pageShareXhr() {
  var shareXhr = new XMLHttpRequest();
  shareXhr.open('GET', 'js/json/chart.json', true);
  shareXhr.responseType="json";
  shareXhr.send();
  shareXhr.onload = function () {
    if (shareXhr.status !== 200) {
      console.error('Failed to fetch faq data')
      return
    }
    let shareObj = shareXhr.response.payload;
    addGap(shareObj);
    dataTimeInner(shareObj);
    sharedFieldInner(shareObj);
    linkGapToggle(shareObj);
    addChartBox(shareObj);
    collectDonutObj(shareObj)
    addDonutBox(shareObj);
    addSectors(shareObj);
    toggleDonutLink(shareObj);
    filterStocks(shareObj);
  };
  shareXhr.onerror = function () {
    console.error("An error occurred during request");
  };
}

function sharedFieldInner(shareRequest) {
  document.querySelector('.chart__title span').textContent = shareRequest.user.first_name;
  document.querySelector('.chart-results-details__period').textContent = shareRequest.states[period].title;
  if(shareRequest.states[period].change.percent<0) {
    document.querySelector('.chart-results-details__arrow').classList.add('down');
  }else {
    document.querySelector('.chart-results-details__arrow').classList.remove('down');
  };
  document.querySelector('.chart-results-details__percent span').textContent = Math.floor(shareRequest.states[period].change.percent * 100) / 100;
}

function dataTimeInner(shareRequest) {
  let a = new Date(shareRequest.created);
  let thisTime = " " + a.toLocaleTimeString("en-US", {hour12:true}).slice(0, 5) + a.toLocaleTimeString().slice(7);
  // let thisTime = " " + a.toLocaleTimeString().slice(0, 4) + a.toLocaleTimeString().slice(7);
  document.querySelector('.chart-datatime__date').textContent = a.toLocaleDateString();
  document.querySelector('.chart-datatime__time').textContent = thisTime;
}

function addGap(shareRequest) {
  let gapList = document.querySelector('.chart-results-changes-gap');
  for(let i=0; i<=shareRequest.states.length-1; i++) {
    let li = document.createElement('li');
    li.classList.add('chart-results-changes-gap-item');
    let a = document.createElement('a');
    a.classList.add('chart-results-changes-gap-item__link');
    a.innerText = shareRequest.states[i].label;
    li.appendChild(a);
    a.setAttribute('data-gap', i);
    a.setAttribute('data-type', shareRequest.states[i].type);
    gapList.appendChild(li);
  }
  document.querySelector('a[data-type='+shareRequest.default_state_type +']').classList.add('active');
  period = gapList.querySelector('li .chart-results-changes-gap-item__link.active').dataset.gap;
}

function addChartBox(shareRequest) {
  let ctx = document.getElementById('myChart').getContext('2d');
  let gradientFill = ctx.createLinearGradient(0, 0, 0, 330);
  gradientFill.addColorStop(0, '#5579F7');
  gradientFill.addColorStop(1, 'rgba(118, 47, 230, 0.3');
  let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, '#B484FF');
  gradientStroke.addColorStop(1, '#D4DEFF');
  let labels = [];
  let dates = [];
  let datesLastValue = [];
  let datesItem, datesItemTime, datesItemDate;
  for(let i=0; i<= shareRequest.states[period].states.length-1; i++) {
    datesItem = new Date(shareRequest.states[period].states[i].datetime);
    datesItemTime = " " + datesItem.toLocaleTimeString().slice(0, 4) + datesItem.toLocaleTimeString().slice(7);
    datesItemDate= datesItem.toLocaleDateString();
    labels.push(datesItemDate + datesItemTime);
    dates.push(shareRequest.states[period].states[i].percent);
    if(i==shareRequest.states[period].states.length-1) {
      datesLastValue.push(shareRequest.states[period].states[i].percent);
    }
  };
  myChart = new Chart(ctx, {
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          usePointStyle: true,
          callbacks: {
            title: function(tooltipItems) {
              return 'Date: ' + tooltipItems[0].label;
            },
            label: function(context) {
              context.dataset.fill=false;
              var label = context.dataset.label || '';
              return label = Math.floor(context.parsed.y * 100) / 100 + '%';
            },
          },
          displayColors: false,
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            yMin: 0,
            yMax: 0,
            value: 5,
            borderColor: '#EA8D01',
            borderWidth: 1,
            borderDash: [1,1],
            label: {
              enabled: false,
              content: 'Test label'
            }
          }]
        }
      },
      layout:{
        right: 10
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            tickLength: 0,
            color: function(value, index, values) {
              if(dates.length>31) {
                if(value.index == "0") {
                  return 'rgba(225, 225, 255, 0)';
                } else if(Number(value.index)%8==0) {
                  return 'rgba(225, 225, 255, 0.2)';
                } else {
                  return 'rgba(225, 225, 255, 0)';
                };
              }
              else if (dates.length>29&& dates.length<31) {
                if(value.index == "0") {
                  return 'rgba(225, 225, 255, 0)';
                } else if(Number(value.index)%5==0) {
                  return 'rgba(225, 225, 255, 0.2)';
                } else {
                  return 'rgba(225, 225, 255, 0)';
                };
              } else if (dates.length<29 && dates.length>20){
                if(value.index == "0") {
                  return 'rgba(225, 225, 255, 0)';
                } else if(Number(value.index)%5==0) {
                  return 'rgba(225, 225, 255, 0.2)';
                } else {
                  return 'rgba(225, 225, 255, 0)';
                };
              } else {
                if(value.index == "0") {
                  return 'rgba(225, 225, 255, 0)';
                } else if(Number(value.index)%2==0) {
                  return 'rgba(225, 225, 255, 0.2)';
                } else {
                  return 'rgba(225, 225, 255, 0)';
                };
              }
            },
            borderColor: 'rgba(225, 225, 255, 0.05)',
          },
          ticks: {
            display: false,
          }
        },
        y: {
          display: true,
          position: 'right',
          grid: {
            tickLength: 0,
            color: function(value) {
              if(value.index == "0") {
                return 'rgba(225, 225, 255, 0.05)';
              } else {
                return 'rgba(225, 225, 255, 0.2)';
              };
            },
            borderColor: 'rgba(0, 0, 0, 1)',
          },
          ticks: {
            color: 'white',
            stepSize : 4,
            offset: true,
            tickLength: 0,
            maxTicksLimit: 0,
            padding: 10,
            font: {
              size: 13,
              family: 'inter, san-serif',
            },
            callback: function(value, index, values) {
              return value + '%';
            }
          }
        },
      },
    },
    data: {
      labels: labels,
      datasets: [{
        type: 'line',
        fill: 'start',
        data: dates,
        backgroundColor: gradientFill,
        borderColor: gradientStroke,
        borderWidth: 1,
        pointRadius: "0",
      }]
    },
  });
};

@@include('donut.js');

function linkGapToggle(shareRequest) {
  let linkGap = document.querySelectorAll('.chart-results-changes-gap-item__link');
  toggle= true;
  linkGap.forEach((item)=> {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      for(let i=0; i<=linkGap.length-1; i++) {
        linkGap[i].classList.remove('active');
      };
      period=this.dataset.gap;
      this.classList.add('active');
      sharedFieldInner(shareRequest);
      dataTimeInner(shareRequest);
      myChart.destroy();
      addChartBox(shareRequest);
    })
  })
}

// rewarded-slider
function buildRewardedSlider() {
  (function () {
    "use strict";
    const breakpoint = window.matchMedia("(min-width:768px)");
    let rewardedSlider;
    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (rewardedSlider !== undefined)
          rewardedSlider.destroy(true, true);
        return;
      } else if (breakpoint.matches === false) {
        return enableTopSwiper();
      }
    };
    const enableTopSwiper = function () {
      rewardedSlider = new Swiper(".rewarded-slider-container", {
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination'
        }
      });
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();
}

@@include('stocks.js');


if(document.body.classList.contains("page-allocation")) {
  var period;
  var toggle = false;
  var myChart  = {};
  pageShareXhr();
  buildRewardedSlider();
}


