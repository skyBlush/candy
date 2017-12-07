// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Carousel from './components/Carousel'
import Lazy from './components/Lazy'
import Home from './components/Home'
import Shop from './components/Shop'
// import Register from './components/Register'
// import Login from './components/Login'
import Detail from './components/Detail'
import HelloWorld from './components/HelloWorld'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui';
Vue.use(MintUI)


// Vue.use(Lazyload);
Vue.component(Carousel.name,Carousel);
Vue.component(Lazy.name,Lazy);
Vue.component(Home.name,Home);
// Vue.component(Shop.name,Shop);
// Vue.component(Register.name,Register);
// Vue.component(Login.name,Login);
Vue.component(Detail.name,Detail);
Vue.component(HelloWorld.name,HelloWorld);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
