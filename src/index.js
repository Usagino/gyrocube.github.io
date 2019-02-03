import {
  TweenMax
} from 'gsap';
import Vue from 'vue';
import VueCarousel from 'vue-carousel';

let $ = require('jQuery');
let filename = window.location.href.match('.+/(.+?)\.[a-z]+([\?#;].*)?$')[1];
let tl = new TimelineMax();
Vue.use(VueCarousel);

new Vue({
  el: '#contents',
  components: {
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide,

  },
});

let alpha = 0;
let beta = 0;
let gamma = 0;

window.addEventListener('deviceorientation', (dat) => {
  alpha = dat.alpha;
  beta = dat.beta;
  gamma = dat.gamma;

});

const cube_move = (beta,gamma) =>{
  TweenMax.set('.cube',{
    rotationX:beta,
    rotationY:gamma,
  });
}

let timer = window.setInterval(() => {

  console.log(gamma);

  $('.front').html(`<p>${Math.floor(beta)}°</p>`);

  if (beta > 0) {
    beta < 70 ? cube_move(beta,0) : cube_move(70,0);
  }else if (beta < 0) {
    beta > -70 ? cube_move(beta,0) : cube_move(-70,0);
  }

  if ((beta >= 90 && beta < 91) || (beta < -89 && beta >= -90) || (beta >= 0 && beta < 1)) {
    TweenMax.set('#contents',{background:'#19cfff'});
    TweenMax.set('.cube div',{borderColor:'#ffffff'});
    TweenMax.set('.cube p',{color:'#ffffff'});

  }else {
    TweenMax.set('#contents',{background:''});
    TweenMax.set('.cube div',{borderColor:''});
    TweenMax.set('.cube p',{color:''});
  }

  // if(
  //   (30 >  alpha || alpha > -30) &&
  //   (110 >  beta || beta > 70) &&
  //   (110 > gamma || gamma > 70)
  // ){
  //   TweenMax.set('.stage',{rotation:-90});
  // }else {
  //   TweenMax.set('.stage',{rotation:0});
  // }
}, 30);
