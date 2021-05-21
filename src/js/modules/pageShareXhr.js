function pageShareXhr() {
  var shareXhr = new XMLHttpRequest();
  shareXhr.open('GET', 'js/json/chart-full.json', true);
  shareXhr.responseType="json";
  shareXhr.send();
  shareXhr.onload = function () {
    if (shareXhr.status !== 200) {
      console.error('Failed to fetch faq data')
      return
    };
    let shareObj = shareXhr.response.payload;
    if(shareXhr.response.payload["status"]=="DONE") {
      addNameAndDate(shareObj)
      if(shareObj.states.length>0) {
        addGap(shareObj);
        sharedFieldInner(shareObj);
        linkGapToggle(shareObj);
        addChartBox(shareObj);
      } else {
        document.querySelector(".chart").style.minHeight = "0";
        document.querySelector(".chart-results").style.display = "none";
      }
      if(shareObj.breakdowns.length>0) {
        collectDonutObj(shareObj);
        addSectors(shareObj);
        addDonutBox(shareObj);
        toggleDonutLink(shareObj);
        if(shareObj.states.length==0) {
          document.querySelector(".breakdown__title").style.display = "none";
        }
      } else {
        document.querySelector(".breakdown").style.display = "none";
      }
      if(shareObj.symbols.length>0) {
        filterStocks(shareObj);
      } else {
        document.querySelector(".stocks").style.display = "none";
      }
    }
  };
  shareXhr.onerror = function () {
    console.error("An error occurred during request");
  };
}

function addNameAndDate(shareRequest) {
  document.querySelector('.chart__title span').textContent = shareRequest.user.first_name;
  let a = new Date(shareRequest.created);
  let timeStr = a.toLocaleTimeString("en-US", {hour12:true});
  let thisTime = " " + timeStr.substr(0, timeStr.length-6) + timeStr.substr(timeStr.length-3, timeStr.length-1);
  document.querySelector('.chart-datatime__date').textContent = a.toLocaleDateString();
  document.querySelector('.chart-datatime__time').textContent = thisTime;
}

function sharedFieldInner(shareRequest) {
  document.querySelector('.chart-results-details__period').textContent = shareRequest.states[period].title;
  if(shareRequest.states[period].change.percent<0) {
    document.querySelector('.chart-results-details__arrow').classList.add('down');
  }else {
    document.querySelector('.chart-results-details__arrow').classList.remove('down');
  };
  document.querySelector('.chart-results-details__percent span').textContent = Math.floor(shareRequest.states[period].change.percent * 100) / 100;
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
  let labels = [],
  dates = [],
  max = shareRequest.states[period].states[0].percent,
  min = shareRequest.states[period].states[0].percent,
  datesItem, datesItemTime, datesItemDate;
  for(let i=0; i<= shareRequest.states[period].states.length-1; i++) {
    datesItem = new Date(shareRequest.states[period].states[i].datetime);
    datesItemTime = " " + datesItem.toLocaleTimeString().slice(0, 4) + datesItem.toLocaleTimeString().slice(7);
    datesItemDate= datesItem.toLocaleDateString();
    labels.push(datesItemDate + datesItemTime);
    dates.push(shareRequest.states[period].states[i].percent);
    if(max<shareRequest.states[period].states[i].percent) {
      max=shareRequest.states[period].states[i].percent;
    } else if(min>shareRequest.states[period].states[i].percent){
      min = shareRequest.states[period].states[i].percent;
    };
  };
  let stepSize = 0,
  minValue = 0,
  maxValue = 0;
  if(max-min<=5) {
    stepSize=1;
    minValue = Math.floor((min-stepSize)/stepSize)*stepSize;
    maxValue = Math.floor((max+stepSize)/stepSize)*stepSize;
  } else if(max-min>5 && max-min<=7.5 ) {
    stepSize = 4;
    minValue = Math.floor((min-stepSize)/stepSize)*stepSize;
    maxValue = Math.floor((max+stepSize)/stepSize)*stepSize;
  } else if(max-min>7.5) {
    stepSize = Math.floor((max-min/2));
    minValue = Math.floor((min-stepSize)/stepSize)*stepSize;
    maxValue = Math.floor((max+stepSize)/stepSize)*stepSize;
  }
  Chart.defaults.scales.linear.min = Math.floor(minValue);
  Chart.defaults.scales.linear.max = Math.floor(maxValue);
  myChart = new Chart(ctx, {
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          intersect: false,
          callbacks: {
            title: function(tooltipItems) {
              var label = tooltipItems[0].raw;
              label = Math.floor(label * 100) / 100 + '%';
              return label
            },
            // label: function(context) {
            //   context.dataset.fill=false;
            //   var label = context.dataset.label || '';
            //   label = Math.floor(context.parsed.y * 100) / 100 + '%';
            //   return label
            // },
            // labelTextColor: function(tooltipItem) {
            //   if(Number(tooltipItem.formattedValue)>=0) {
            //     return "#34C759";
            //   } else {
            //     return "#EA5555";
            //   }
            // }

          },
          displayColors: false,
          backgroundColor: '#2C2C2E',
          cornerRadius: 8,
          padding: 12,
          fontSize: 18,
          bodyFont: 'Inter',
          titleFontSize: 18,
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
            stepSize: stepSize,
            offset: true,
            maxTicksLimit: 0,
            padding: 10,
            font: {
              size: 13,
              family: 'inter, san-serif',
            },
            callback: function(value, index, values) {
              return value + '%';
            },
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
        borderJoinStyle: "round",
        lineTension: 0.4,
        borderWidth: 1,
        pointRadius: "0",
        pointHoverRadius: "4",
        hitRadius: 500,
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


