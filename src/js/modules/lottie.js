var svgContainer = document.getElementById('svgContainer');

var animation = bodymovin.loadAnimation({
  container: document.getElementById('loadingAnimation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'js/json/order_placing_lottie_cycle_first_collection.json'
});

var animItem1 = {
  wrapper: svgContainer,
  animType: 'svg',
  autoplay: true,
  loop: true,
  path: 'js/json/order_placing_lottie_dot_in.json'
};
var animItem2 = {
  wrapper: svgContainer,
  animType: 'svg',
  autoplay: true,
  loop: true,
  path: 'js/json/order_placing_lottie_dot_pulse.json'
};
var animItem3 = {
  wrapper: svgContainer,
  animType: 'svg',
  autoplay: true,
  loop: false,
  path: 'js/json/order_placing_lottie_dot_out.json'
};

var anim = lottie.loadAnimation(animItem1);

function animPulse() {
  anim.destroy();
  anim = lottie.loadAnimation(animItem2);
}
function animOut() {
  anim.destroy();
  anim = lottie.loadAnimation(animItem3);
}
setTimeout(animPulse, 700);
// document.querySelector('#svgContainer').addEventListener('click', function() {

// });

let generation = document.querySelector('.chart-loading__text');
generation.addEventListener('click', function() {
  animOut();
  animation.destroy();
  let content = document.querySelectorAll('.content');
  content.forEach(item=> item.classList.toggle('visibility'))
  document.querySelector('.chart-loading').classList.toggle('opacity');
})
