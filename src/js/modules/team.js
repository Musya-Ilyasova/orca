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
    card.addEventListener('onmouseleave', cardRemoveRotate(card));
      // card.onmouseleave = function (e) {
      //   setTimeout(() => {
      //     this.classList.remove('rotate');

      //   }, 500)
      // }

    function cardRemoveRotate(item) {
      if(item.classList.contains('rotate')) {
        setTimeout(() => {
          this.classList.remove('rotate');
        }, 500)
      }
    }
}

teamRotate();

