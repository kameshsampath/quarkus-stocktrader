import Vue from 'vue';
import App from './App';
import CirrusVue from './components/index';
import CirrusVueSamples from './samples/index';

Vue.use(CirrusVue);
Vue.use(CirrusVueSamples);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
