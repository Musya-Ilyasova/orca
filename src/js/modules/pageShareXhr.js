@@include('lottie.js');
@@include('copyAllocation.js')
@@include('donut.js');
@@include('stocks.js');
@@include('chart-tooltip.js');

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
    let shareObj= shareXhr.response.payload;
    renderData(shareObj);
  };

  shareXhr.onerror = function () {
    console.error("An error occurred during request");
  };

}

function renderData(shareObj) {
  copyAllocationReferralCode(shareObj);
  if(shareObj["status"]=="DONE") {
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
  } else if(shareObj["status"]=="ERROR") {
    document.querySelector(".chart").style.display = "none";
    document.querySelector(".chart-results").style.display = "none";
    document.querySelector(".breakdown").style.display = "none";
    document.querySelector(".stocks").style.display = "none";
    let section = document.createElement('section');
    section.classList.add('page-allocation-error');
    let img = document.createElement('div');
    img.classList.add('page-allocation-error__img');
    let title = document.createElement('span');
    title.classList.add('page-allocation-error__title');
    let text = document.createElement('p');
    text.classList.add('page-allocation-error__text');
    title.innerText = "The data hasn't loaded";
    text.innerText = "But we've already received a notification about this case. Ask a friend to generate a link on the portfolio again.";
    section.appendChild(img);
    section.appendChild(title);
    section.appendChild(text);
    document.querySelector('.shares-page__wrapper').prepend(section);
  } else if(shareObj["status"]==="GENERATION") {
    setTimeout(pageShareXhr, 5000);
  }
};
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
  lastDate = 0,
  lastLabel = "",
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
    if(i == shareRequest.states[period].states.length-1) {
      lastDate = shareRequest.states[period].states[i].percent;
      lastLabel = datesItemDate + datesItemTime;
    }
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
          enabled: false,
          external: function(context) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');
            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            }
            tooltipEl.innerHTML = '<table></table>';

            // Hide if no tooltip
            var tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }
            function getBody(bodyItem) {
              return bodyItem.lines;
            }
            // Set Text
            if (tooltipModel.body) {
              var bodyLines = tooltipModel.title || [];
              var titleLines= tooltipModel.body.map(getBody);
              var innerHtml = '<thead style="text-align: left;">';
              titleLines.forEach(function(title) {
                var style = 'font-weight: 400; font-size: 18px;';
                if(Number(title)>=0) {
                  style += 'color: #34C759;';
                } else {
                  style += 'color: #EA5555;';
                }
                var span = '<span style="' + style + '">';

                if(Number(title)>0) {
                  innerHtml += '<tr><th>' + span + '+' + Math.floor(title * 100) / 100 + '%' + '</span></th></tr>';
                } else {
                  innerHtml += '<tr><th>' + span + Math.floor(title * 100) / 100 + '%' + '</span></th></tr>';
                }
              });
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function(body, i) {
                var style = 'background:#2C2C2E; line-height: 16px; display: inline-block; padding-top: 8px;';
                var span = '<span style="' + style + '">';
                let months = (new Date(body)).toLocaleDateString(void(0), { month: 'long' });
                let day = (new Date(body)).toLocaleDateString(void(0), { day: '2-digit' });
                innerHtml += '<tr><td>' + span + 'on ' + months + ' ' + day + '</span></td></tr>';
              });
              innerHtml += '</tbody>';

              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            var position = context.chart.canvas.getBoundingClientRect();
            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            if(window.innerWidth<=767) {
              if(position.left+tooltipModel.caretX+tooltipEl.offsetWidth>=position.width) {
                tooltipEl.style.left = position.width-tooltipEl.offsetWidth + 'px';
              } else {
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
              };
            } else {
              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            }
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 12 + 'px';
            tooltipEl.style.font = '14px "Inter", sans-serif';
            tooltipEl.style.padding = 12 + 'px ' + 12 + 'px';
            tooltipEl.style.borderRadius = '8px';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.backgroundColor = '#2C2C2E';
            tooltipEl.style.padding = '#2C2C2E';
            tooltipEl.style.titleAlign = 'left';
            tooltipEl.style.weight = '400';
            tooltipEl.style.transition = '.2s ease';
          },
          displayColors: false,
          bodyWaight: '400',
          bodyColor: '#ffffff',
          footerFont: {
            weight: 'regular',
          },
          footerSpacing: -0.1,
        },
        annotation: {
          annotations: {
            line: {
              type: 'line',
              mode: 'horizontal',
              yMin: lastDate,
              yMax: lastDate,
              value: 5,
              borderColor: '#EA8D01',
              borderWidth: 2,
              borderDash: [2,3],
              label: {
                enabled: false,
                content: ''
              }
            },
            point: {
              type: 'point',
              xValue: lastLabel,
              yValue: lastDate,
              backgroundColor: '#fff',
              radius: 4,
              borderColor: '#EA8D01',
              borderWidth: 2,
              order: 0,
              drawTime: 'afterDatasetsDraw',
            }
          }
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
              family: "'inter', san-serif",
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
      order: 3,
      datasets: [{
        type: 'line',
        fill: 'start',
        data: dates,
        backgroundColor: gradientFill,
        borderColor: gradientStroke,
        borderJoinStyle: 'round',
        lineTension: 0.4,
        borderWidth: 1,
        pointRadius: '0',
        pointHoverRadius: '5',
        hoverBorderWidth: '3',
        pointBorderColor: '#EA8D01',
        pointBackgroundColor: '#fff',
        hitRadius: 500,
      }]
    },
  });
};




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



if(document.body.classList.contains("page-allocation")) {
  var period;
  var toggle = false;
  var myChart  = {};
  chartTooltip();
  pageShareXhr();
  buildRewardedSlider();
}


