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
import KeyCloak from 'keycloak-js'

// HC CTO Artifacts
import CirrusVue from '@hybrid-cloud/cirrus-vue/src/components/index'

let kcInitOptions = {
  url: process.env.KEYCLOAK_AUTH_URL,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  onLoad: 'login-required'
}

//console.log(kcInitOptions);

let keycloak = new KeyCloak(kcInitOptions)

Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.use(CirrusVue);
Vue.use(Vuex);
Vue.use(VueJWT, { storage: 'localStorage', keyName: 'user_jwt' })

keycloak.init({ onLoad: kcInitOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    //console.log(keycloak);
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
    store.commit("userName",keycloak);
    console.log("Authenticated");
  }

  // //Token refresh
  // setInterval(() => {
  //   keycloak.updateToken(70).then((refreshed) => {
  //     if (refreshed) {
  //       Vue.$log.info('Token refreshed' + refreshed);
  //     } else {
  //       Vue.$log.warn('Token not refreshed, valid for '
  //         + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
  //     }
  //   }).catch(() => {
  //     Vue.$log.error('Failed to refresh token');
  //   });
  // }, 6000)
  // }).catch(() => {
  //   Vue.$log.error("Authenticated Failed");
  // });

})

