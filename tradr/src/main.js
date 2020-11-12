/*
       Copyright 2018 IBM Corp All Rights Reserved

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import Vuex from 'vuex'
import VueJWT from 'vuejs-jwt'

// HC CTO Artifacts
import CirrusVue from '@hybrid-cloud/cirrus-vue/src/components/index'

Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.use(CirrusVue);
Vue.use(Vuex);
Vue.use(VueJWT, {storage: 'localStorage', keyName: 'user_jwt'})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
