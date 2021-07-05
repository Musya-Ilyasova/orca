function calculatorCheckbox() {
  let customCheckbox = document.querySelector('.calculator-fields-regular-frequency');
  let btn = document.querySelector('.calculator-fields-yty__btn');
  let checkbox = customCheckbox.querySelector('input');
  checkbox.addEventListener('change', function (e) {
    if (e.target.checked) {
      customCheckbox.classList.add('checked');
      document.querySelector('.calculator-fields-regular-frequency__value:first-child').classList.remove('active');
      document.querySelector('.calculator-fields-regular-frequency__value:last-child').classList.add('active');
    } else {
      customCheckbox.classList.remove('checked');
      document.querySelector('.calculator-fields-regular-frequency__value:first-child').classList.add('active');
      document.querySelector('.calculator-fields-regular-frequency__value:last-child').classList.remove('active');
    }
  })
}

function calculatorTooltip() {
  let tooltipBtn = document.querySelector('.calculator-fields-yty__btn');
  let tooltip = document.querySelector('.calculator-fields-yty__tooltip');
  let shim = document.createElement('div');
  shim.classList.add('calculator-fields-yty__shim');
  document.querySelector('body').append(shim);
  tooltipBtn.addEventListener('click', function () {
    tooltip.classList.toggle('open');
    if (tooltip.classList.contains('open')) {
      shim.classList.add('open');
    }
  })
  shim.addEventListener('click', function (e) {
    e.preventDefault();
    tooltip.classList.remove('open');
    shim.classList.remove('open');
  })
};

function culculatorRange() {
  let range = document.querySelectorAll('.calculator-fields-range input');
  let rangeYtyValue = document.querySelector('#ytyValue');
  let rangeNoyValue = document.querySelector('#noyValue');
  range.forEach((item) => {
    item.addEventListener('input', function () {
      let value = (item.value - item.min) / (item.max - item.min) * 100;
      item.style.background = 'linear-gradient(to right, #8FFF00 0%, #8FFF00 ' + `${value}` + '%, #2E2E2E ' + `${value}` + '%, #2E2E2E 100%)';
      if (item.id === 'yty') {
        rangeYtyValue.innerText = item.value + "%";
      } else if (item.id === 'noy') {
        rangeNoyValue.innerText = item.value;
      }
    })
  })
}

function addCalculatorChart() {
  let dates = [[0, 0], [5, 25], [10, 40], [15, 65], [20, 84]];
  Highcharts.chart('calculatorChart', {
    chart: {
      type: 'area',
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null
    },
    xAxis: {
      ordinal: false,
      min: 0,
      tickLength: 0,
      tickInterval: 1,
      lineWidth: 0,
      startOnTick: true,
      endOnTick: false,
      minRange: 5,
      labels: {
        format: '{value} yrs'
      },
      title: {
        text: null
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 25'
      },
      dashStyle: 'Dash',
      crosshair: {
        width: 2,
        color: '#8FFF00'
      }
    },
    yAxis: {
      min:0, 
      max: 100, 
      tickInterval: 25,    
      gridLineDashStyle: 'longdash',
      startOnTick: true,
      endOnTick: false,
      labels: {
        format: '{value} k'
      },
      title: {
        text: null
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 100'
      },
    },
    tooltip: {
      enabled: false
    },
    plotOptions : {
      area : {
        lineWidth : 1,
        marker : {
          enabled : false,
          states : {
            hover : {
              enabled : true,
            }
          }
        },
      },
      series: {
        states: {
          hover: {
            enabled: true,
            halo: {
              size: 0
            }
          }
        }
      }
    },
    series: [{
      data: dates,
      color: '#8FFF00',
      type : 'area',
      threshold: null,
      marker: {
        lineColor: '#8FFF00',
        fillColor: '#2E2E2E',
        lineWidth: 8,
      },
      fillColor : {
        linearGradient : [0, 0, 0, 400],
        stops : [
          [0, '#8FFF00'],
          [1, 'rgba(143, 255, 0, 0)']
        ]
      },
    }],
    
  });
}



calculatorCheckbox();
calculatorTooltip();
culculatorRange();
addCalculatorChart();


