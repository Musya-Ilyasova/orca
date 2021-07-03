function calculatorCheckbox() {
  let customCheckbox = document.querySelector('.calculator-fields-regular-frequency');
  let btn = document.querySelector('.calculator-fields-yty__btn');
  let checkbox = customCheckbox.querySelector('input');
  checkbox.addEventListener('change', function(e) {
    if(e.target.checked) {
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
  let rangeYtyValue = document.querySelector('#ytyValue');
  let rangeNoyValue = document.querySelector('#noyValue');
  range.forEach((item) => {
    item.addEventListener('input', function () {
      let value = (item.value-item.min)/(item.max-item.min)*100;
      item.style.background = 'linear-gradient(to right, #8FFF00 0%, #8FFF00 ' + `${value}` + '%, #2E2E2E ' + `${value}` + '%, #2E2E2E 100%)';
      if(item.id==='yty') {
        rangeYtyValue.innerText = item.value + "%";
      } else if(item.id==='noy') {
        rangeNoyValue.innerText = item.value;
      }
    })
  })

}

calculatorCheckbox();
calculatorTooltip();
culculatorRange();


