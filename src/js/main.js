function sendEmailForm() { 
  let form = document.querySelector('form');
  let node = form.querySelector('button');
  const XHR = new XMLHttpRequest();
  const FD = new FormData(form);
  XHR.addEventListener("loadend", function (event) {
    const response = XHR.response;
    if (response) {
      if (XHR.status == 200) {
        document.querySelector('.field-wrapper').style.display="none";
        document.querySelector('.success').style.display="flex"
      } else {
        form.querySelector('.error-request').style.display = 'block';
      } 
    }else {
      form.querySelector('.error-request').style.display = 'block';
    } 
  });
  XHR.open("POST", form.action);
  XHR.send(FD);
  node.disabled = false;
}


function comicconForm() {
  let btn = document.querySelector('.comiccon-subscribe-btn button');
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    sendEmailForm()
  })
}
comicconForm();