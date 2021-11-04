function teamRotate() {
  let card;
  let list = document.querySelectorAll('.team-list');
  list.forEach((item) => {
    item.onclick = function (e) {
      let target = e.target;
      if (target.closest('.team-list-item') && !target.closest('.notBack')){
        rotateItem(target);
      }
    }
  })
  function rotateItem(li) {
    card = li.closest('.team-list-item:not(.notBack)');
    card.classList.add('rotate');
    card.onmouseleave = function() {
      setTimeout(() => card.classList.remove('rotate'), 200)
    }
  }
}
function teamMore() {
 let btn = document.querySelectorAll('.team__more');
 let teamList = document.querySelectorAll('.team-list');
 btn.forEach((i) => {
   i.addEventListener('click', function(e) {
    e.preventDefault();

    if(i.previousElementSibling.closest('.team-list') && !i.classList.contains('less')) {
      i.previousElementSibling.style.maxHeight = i.previousElementSibling.scrollHeight + 20 + 'px';
      i.classList.add('less');
      i.querySelector('span').textContent = "Show less";
    } else if(i.classList.contains('less')) {
      i.previousElementSibling.style.maxHeight = '';
      i.classList.remove('less');
      i.querySelector('span').textContent = "Show more";
    }
   })
 })
}

teamRotate();
teamMore();

