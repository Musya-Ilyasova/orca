function calculatorCheckbox() {
  let customCheckbox = document.querySelector('.calculator-fields-regular-frequency');
  let btn = document.querySelector('.calculator-fields-yty__btn');
  let checkbox = customCheckbox.querySelector('input');
  checkbox.addEventListener('change', function(e) {
    if(e.target.checked) {
      customCheckbox.classList.add('checked');
    } else {
      customCheckbox.classList.remove('checked');
    }
  })
}

function calculatorTooltip() {
  let tooltipBtn = document.querySelector('.calculator-fields-yty__btn');
  let tooltip = document.querySelector('.calculator-fields-yty__tooltip');
  let shim = document.createElement('div');
  shim.classList.add('calculator-fields-yty__shim');
  document.querySelector('body').append(shim);
  tooltipBtn.addEventListener('click', function() {
    tooltip.classList.toggle('open');
    if(tooltip.classList.contains('open')) {
      shim.classList.add('open');
    }
  })
  shim.addEventListener('click', function(e) {
    e.preventDefault();
    tooltip.classList.remove('open');
    shim.classList.remove('open');
  })
};

function culculatorRange() {
  let range = document.querySelectorAll('.calculator-fields-range input');
  range.forEach((item) => {
    let value = (item.value-item.min)/(item.max-item.min)*100;
    item.style.background = 'linear-gradient(to right, #8FFF00 0%, #8FFF00 ' + value + '%, #2E2E2E ' + value + '%, #2E2E2E 100%)';
    item.addEventListener('change', function () {
      value = (item.value-item.min)/(item.max-item.min)*100;
      item.style.background = 'linear-gradient(to right, #8FFF00 0%, #8FFF00 ' + `${value}` + '%, #2E2E2E ' + `${value}` + '%, #2E2E2E 100%)';
    })
  })

}

calculatorCheckbox();
calculatorTooltip();
culculatorRange();


