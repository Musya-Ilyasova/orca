function copyAllocationReferralCode(shareObj) {
  let textCopy = document.querySelector('.refferal-link-copy__text'),
  btnCopy = document.querySelector('.refferal-link-copy__btn');
  textCopy.value = shareObj.user.ref_code;
  btnCopy.addEventListener('click', function() {
    textCopy.select();
    document.execCommand("copy");
    document.querySelector('.refferal-link-copy').classList.add('copy');
    setTimeout(copied, 2000);
  });
}
function copied() {
  document.querySelector('.refferal-link-copy').classList.remove('copy');
}
