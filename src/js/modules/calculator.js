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


function calculateToggleBtn() {
  let spField = document.querySelector('#sp');
  let rpmField = document.querySelector('#rp');
  let calculatorBtn = document.querySelector('.calculator-fields__btn');
  calculatorBtn.addEventListener('click', function () {
    if ((spField.value !== "") || (rpmField.value !== "")) {
      checkField(spField, rpmField)
      addCalculateValues();
      calculatorInnerFields();
      addCalculatorChart();
    } else {
      checkField(spField, rpmField);
    };
  });
  spField.addEventListener('input', function () {
    checkField(spField, rpmField);
  })
  rpmField.addEventListener('input', function () {
    checkField(spField, rpmField);
  })
}

function checkField(spField, rpmField) {
  let field = document.querySelectorAll('.calculator-fields-value');
  if (spField.value == "" && rpmField.value == "") {
    field.forEach(item => item.classList.add('warn'));
    console.log(spField.value);
  } else {
    field.forEach(item => item.classList.remove('warn'));
  };
}

function addCalculateValues() {
  window.calculate.dates = [];
  let spField = document.querySelector('#sp'),
    rpmField = document.querySelector('#rp'),
    ypgField = document.querySelector('#yty'),
    nyField = document.querySelector('#noy'),
    frequencyField = document.querySelector('#frequency');
  window.calculate.growth = 0;
  window.calculate.sp = parseInt(spField.value, 10);
  window.calculate.rpm = parseInt(rpmField.value, 10);
  window.calculate.ypg = parseInt(ypgField.value, 10) / 100;
  window.calculate.ny = parseInt(nyField.value, 10);
  if (isNaN(window.calculate.sp)) {
    window.calculate.sp = 0;
  } else if (isNaN(window.calculate.rpm)) {
    window.calculate.rpm = 0;
  }
  if (window.calculate.sp > 0) {
    window.calculate.dates.push([0, window.calculate.sp / 1000]);
  } else {
    window.calculate.dates.push([0, 0]);
  };

  if (!frequencyField.checked) {
    let firstYr = ((window.calculate.sp + window.calculate.rpm * 11) + (window.calculate.sp + window.calculate.rpm * 11) * window.calculate.ypg);
    window.calculate.dates.push([1, firstYr / 1000]);

    let growthfirstYr = (window.calculate.sp + window.calculate.rpm * 11) * window.calculate.ypg;
    window.calculate.growth += checkGrowth(growthfirstYr);

    if (window.calculate.ny >= 2) {
      let nextYr = ((firstYr + window.calculate.rpm * 12) + (firstYr + window.calculate.rpm * 12) * window.calculate.ypg);
      window.calculate.dates.push([2, nextYr / 1000]);
      let growthNextYr = (firstYr + window.calculate.rpm * 12) * window.calculate.ypg;
      window.calculate.growth += checkGrowth(growthNextYr);

      if (window.calculate.ny > 2) {
        for (let i = 3; i <= window.calculate.ny; i++) {
          nextYr = ((nextYr + window.calculate.rpm * 12) + (nextYr + window.calculate.rpm * 12) * window.calculate.ypg);
          window.calculate.dates.push([i, nextYr / 1000]);
          growthNextYr = (nextYr + window.calculate.rpm * 12) * window.calculate.ypg;
          window.calculate.growth += checkGrowth(growthNextYr);
        }
      }
    }
    window.calculate.taxReturn = window.calculate.sp + window.calculate.rpm * 11 + (window.calculate.rpm * 12 * (window.calculate.ny - 1));
  } else {
    let firstYr = ((window.calculate.sp + window.calculate.rpm) + (window.calculate.sp + window.calculate.rpm) * window.calculate.ypg);
    window.calculate.dates.push([1, firstYr / 1000]);

    let growthfirstYr = (window.calculate.sp + window.calculate.rpm) * window.calculate.ypg;
    window.calculate.growth += checkGrowth(growthfirstYr);

    if (window.calculate.ny >= 2) {
      let nextYr = ((firstYr + window.calculate.rpm) + (firstYr + window.calculate.rpm) * window.calculate.ypg);
      window.calculate.dates.push([2, nextYr / 1000]);

      let growthNextYr = (firstYr + window.calculate.rpm) * window.calculate.ypg;
      window.calculate.growth += checkGrowth(growthNextYr);

      if (window.calculate.ny > 2) {
        for (let i = 3; i <= window.calculate.ny; i++) {
          nextYr = ((nextYr + window.calculate.rpm) + (nextYr + window.calculate.rpm) * window.calculate.ypg);
          window.calculate.dates.push([i, nextYr / 1000]);
          growthNextYr = (nextYr + window.calculate.rpm) * window.calculate.ypg;
          window.calculate.growth += checkGrowth(growthNextYr);
        }
      }
    }
    window.calculate.taxReturn = window.calculate.sp + window.calculate.rpm + (window.calculate.rpm * (window.calculate.ny - 1));
  }
  window.calculate.maxX = window.calculate.ny;

  console.log(window.calculate.dates);
}

function checkGrowth(x) {
  if(x > 20000) {
    return 20000;
  } else {
    return x;
  }
}

function calculatorInnerFields() {
  let growthOver = document.querySelectorAll('.calculator-chart__title_value'),
    newIsa = document.querySelectorAll('#newIsa'),
    existingIsa = document.querySelectorAll('#existingIsa'),
    growth = document.querySelectorAll('#growthIsa'),
    taxReturn = document.querySelectorAll('#taxReturn');
  window.calculate.growthOver = Math.round(window.calculate.dates[window.calculate.dates.length - 1][1] * 1000);

  window.calculate.maxY = Math.round(window.calculate.dates[window.calculate.dates.length - 1][1])+(Math.round(window.calculate.dates[window.calculate.dates.length - 1][1]))*0.2;
  growthOver[0].textContent = '£' + numberWithCommas(window.calculate.growthOver);
  newIsa[0].textContent = numberWithCommas(Math.round(window.calculate.growthOver));
  existingIsa[0].textContent = numberWithCommas(Math.round(window.calculate.sp));
  taxReturn[0].textContent = numberWithCommas(Math.round(window.calculate.taxReturn));
  growth[0].textContent = numberWithCommas(Math.round(window.calculate.growth));
}

function numberWithCommas(x) {
  return x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addCalculatorChart() {
  Highcharts.chart('calculatorChart', {
    chart: {
      type: 'area',
    },
    legend: {
      color: '#666666',
      fontFamily: 'inter',
      itemMargintop: 50,
      itemMarginright: 50,
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
      max: window.calculate.maxX,
      tickLength: 0,
      lineWidth: 0,
      startOnTick: true,
      endOnTick: false,
      minRange: 5,
      minTickInterval: 1,
      labels: {
        format: '{value} y',
        y: 30
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
      },
    },
    yAxis: {
      min: 0,
      max: window.calculate.maxY,
      gridLineDashStyle: 'longdash',
      startOnTick: true,
      endOnTick: false,
      labels: {
        format: '{value} k',
        x: -20
      },
      title: {
        text: null
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 100'
      },
    },
    tooltip: {
      headerFormat: '<span>£{point.y}</span> <br>',
      formatter: function () {
        return '<b>£' + numberWithCommas(Math.round(this.y*1000)) + '</b>';
      },
      pointFormat: '',
      borderRadius: '10',
      padding: 12,
      style: {
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '28px',
        fontSize: '18px'
      },
      verticalAlign: "bottom",
      itemMarginTop: "20px",
      hideDelay: 100
    },
    plotOptions: {
      area: {
        lineWidth: 1,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
            }
          }
        },
      },
      series: {
        states: {
          pointPlacement: 'on',
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
      type: 'area',
      threshold: null,
      marker: {
        lineColor: '#8FFF00',
        fillColor: '#2E2E2E',
        lineWidth: 8,
        borderWidth: 2,
        radius: 8,
      },
      fillColor: {
        linearGradient:  { x1: 1, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, '#8FFF00'],
          [1, 'rgba(143, 255, 0, 0)']
        ]
      },
    }],
  });
}


if (document.body.classList.contains("page-calculator")) {
  window.calculate = {
    sp: 0,
    rpm: 0,
    ypg: 0,
    ny: 0,
    growth: 0,
    maxX: 5,
    maxY: 16,
    growthOver: 13.92459075,
    taxReturn: 11800,
    dates: [[0, 0], [1, 2.52], [2, 5.166], [3, 7.9443], [4, 10.861514999999999], [5, 13.92459075]],
  };

  calculatorCheckbox();
  calculatorTooltip();
  culculatorRange();
  addCalculatorChart();
  calculateToggleBtn();
}




