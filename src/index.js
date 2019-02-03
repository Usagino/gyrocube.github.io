import {
  TweenMax
} from 'gsap';
import Vue from 'vue';
import VueCarousel from 'vue-carousel';

let $ = require('jQuery');
let filename = window.location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
let tl = new TimelineMax();
Vue.use(VueCarousel);

new Vue({
  el: "#contents",
  components: {
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide,

  },
});


let beta = 0;
let gamma = 0;

// ジャイロセンサの値が変化したら実行される deviceorientation イベント
window.addEventListener("deviceorientation", (dat) => {
  beta = dat.beta; // x軸（左右）まわりの回転の角度（引き起こすとプラス）
  gamma = dat.gamma; // y軸（上下）まわりの回転の角度（右に傾けるとプラス）

});

// 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms]) タイマーを設定
let timer = window.setInterval(() => {
  console.log(beta,gamma);
  $(".front").html(`<p>上下: ${Math.floor(beta)}</p>`);
  TweenMax.set('.cube',{
    rotationX:beta * -1,
    rotationY:gamma * -1,
  });


}, 33);
