// if(document.body.classList.contains('page-help-centre')) {
//   let faqFront = document.getElementById('faqFront');
//   const faqUrl = faqFront.dataset.url + '?name=Landing';
//   let faqXhr = new XMLHttpRequest();
//   faqXhr.open("GET", faqUrl, true);
//   faqXhr.responseType="json";
//   faqXhr.send();
//   var count=10;
//   faqXhr.onload = function () {
//     document.querySelectorAll('.faq-list-item-loading').forEach((item) => {
//       item.classList.add('hide');
//     });
//     let faqObj = faqXhr.response;
//     console.log(faqObj.categories);
//     let faqObjItem = faqObj.payload;
//     var faqList = document.querySelector('.faq-list'),
//     faqBtnLoading = document.querySelector('.faq-btn');
//     for (var key in faqObjItem) {
//       var li = document.createElement('li');      
//       li.classList.add('faq-list-item');
//       id = document.createAttribute('id');
//       id.value = key;
//       li.setAttributeNode(id);
//       li.innerHTML = "<button class='faq-list-item__btn'>open</button> <h3 class='faq-list-item__title'>" + faqObjItem[key].title + "</h3> <p class='faq-list-item__description'>" + faqObjItem[key].text + "</p>";
//       faqList.appendChild(li);
//     }
//     if(faqList.querySelectorAll('.faq-list-item').length>count) {
//       let hideItems = Array.from(faqList.querySelectorAll('.faq-list-item')).slice(count);
//       hideItems.forEach((item) => {
//         item.style.display="none";
//       });
//     };
//     faqBtnLoading.addEventListener('click',showFaqItems, true);
//     function showFaqItems() {
//       count+=5;
//       let showItems = Array.from(faqList.querySelectorAll('.faq-list-item')).slice(0, count);
//       faqBtnLoading.style.display="inline-flex";
//       showItems.forEach((item) => {
//         item.style.display="";        
//       });
//       if(faqList.querySelectorAll('.faq-list-item').length<count) {
//         faqBtnLoading.style.display="none";
//       }
//     }
//     faqBtnToggle();
//   };  
// }
// function faqBtnToggle() {
//   document.querySelectorAll('.faq-list-item__btn').forEach((item) => {
//     item.addEventListener('click', function(e){
//       e.preventDefault;
//       this.classList.toggle('open');
//       this.parentNode.querySelector('.faq-list-item__description').classList.toggle('show');
//     })
//   });
// }


function faqTagsToggle() {
  let faqTag = document.querySelectorAll('.faq-search-tags-item__btn');
  faqTag.forEach((item) => {
    item.addEventListener('click', function() {
      for(var i=0; i<=faqTag.length-1; i++) {
        faqTag[i].classList.remove('active')
      }
      this.classList.add('active');
    })
  })
}

faqTagsToggle();