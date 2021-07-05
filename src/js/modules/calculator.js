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


function calculateToggleBtn () {
  let spField = document.querySelector('#sp');
  let rpmField = document.querySelector('#rp');
  let calculatorBtn = document.querySelector('.calculator-fields__btn');
  calculatorBtn.addEventListener('click', function() {
    if((spField.value !=="") && (rpmField.value !=="")) {
      checkField(spField, rpmField)
      addCalculateValues();
      addCalculatorChart();
    } else {
      checkField(spField, rpmField);
    };
  });
  spField.addEventListener('input', function() {
    checkField(spField, rpmField);
  })
  rpmField.addEventListener('input', function() {
    checkField(spField, rpmField);
  })
}

function checkField(spField, rpmField) {
  let field = document.querySelectorAll('.calculator-fields-value');
  if(spField.value =="" && rpmField.value =="") {
    field.forEach(item=>item.classList.add('warn'));
  } else {
    field.forEach(item=>item.classList.remove('warn'));
  };
}

function addCalculateValues() {
  window.calculate.dates = [];
  let spField = document.querySelector('#sp');
  let rpmField = document.querySelector('#rp');
  let ypgField = document.querySelector('#yty');
  let nyField = document.querySelector('#noy');
  window.calculate.sp = parseInt(spField.value, 10);
  window.calculate.rpm = parseInt(rpmField.value, 10);
  window.calculate.ypg = parseInt(ypgField.value, 10);
  window.calculate.ny = parseInt(nyField.value, 10);
  window.calculate.dates.push([0, 0]);

  if(window.calculate.ny>=1) {
    let firstYr = ((window.calculate.sp+window.calculate.rpm*11) + (window.calculate.sp+window.calculate.rpm*11)* 0.05);
    window.calculate.dates.push([1, firstYr/1000]);

    if(window.calculate.ny>=2) {
      let nextYr = ((firstYr+window.calculate.rpm*12) + (firstYr+window.calculate.rpm*12)* 0.05);
      window.calculate.dates.push([2, nextYr/1000]);
      if(window.calculate.ny>2) {
        for(let i=3; i<=window.calculate.ny; i++) {
          nextYr = ((nextYr+window.calculate.rpm*12) + (nextYr+window.calculate.rpm*12)* 0.05);
          window.calculate.dates.push([i, nextYr/1000]);
        }
      }
    }
  }
}

function addCalculatorChart() {
  Highcharts.chart('calculatorChart', {
    chart: {
      type: 'area',
    },
    legend: {
      color: '#666666',
      fontFamily: 'inter',
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
      // tickInterval: 3,
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
      // max: 100,
      // tickInterval: 25,
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
      // enabled: false
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
      data: window.calculate.dates,
      color: '#8FFF00',
      type : 'area',
      threshold: null,
      marker: {
        lineColor: '#8FFF00',
        fillColor: '#2E2E2E',
        lineWidth: 8,
        borderWidth: 2,
        radius: 8,
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


if(document.body.classList.contains("page-calculator")) {
  window.calculate = {
    sp: 0,
    rpm: 0,
    ypg: 0,
    ny: 0,
    dates: [[0, 0], [1, 2.52], [2, 5.166], [3, 7.9443], [4, 10.861514999999999], [5, 13.92459075]],
  };

  calculatorCheckbox();
  calculatorTooltip();
  culculatorRange();
  addCalculatorChart();
  calculateToggleBtn();
}




