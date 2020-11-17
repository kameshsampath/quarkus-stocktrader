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
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export const store =  new Vuex.Store({
    // You can use it as state property
    state: {
        userName: "No Name",
        userData: {},
        jwt_token: "",
        refreshToken:"",
        accessToken:""
    },

    // You can use it as a state getter function (probably the best solution)
    getters: {
        userName: state => {
            // console.log(state);
            if(state.userName){
                return state.userName;
            }else{
                return state.userData.id;
            }
        },
        jwtToken: state => {
            return state.jwt_token;
        },
        refreshToken: state => {
            return state.refreshToken;
        }
    },

    // Mutation for when you use it as state property
    mutations: {
        userName(state, payload) {
            console.log("Mutate KeyCloak %s", JSON.stringify(payload.tokenParsed));
            var userAttrs = payload.tokenParsed;
            state.userName = userAttrs.given_name +" "+userAttrs.family_name;
            state.userData = { id: userAttrs.preferred_username,email:userAttrs.email};
            state.jwt_token = payload.token;
            state.refreshToken = payload.refreshToken;
            state.accessToken = payload.token;
        }
    },

    actions: {
        // Perform VueAuthenticate login using Vuex actions
      userName (context) {
        //console.log("Action KeyCloak %s", JSON.stringify(context));
            // axios.get('user/', {headers: {'Authorization': 'Bearer '+localStorage.getItem("user_jwt")}}).then(response => {
            //     if (response.data === null) {
            //         console.log('no session on response')
            //     } else {
            //         localStorage.setItem("userName", response.data.session.user._json.given_name);
            //         localStorage.setItem("userData", response.data.session.user._json);
            //         localStorage.setItem("user_jwt", response.data.token);
            //         localStorage.setItem("refreshToken", response.data.session.user.refreshToken);
            //         localStorage.setItem("accessToken", response.data.session.user.accessToken);
            //         console.log(response.data);
            //         context.commit('userName', {
            //             userName: response.data.session.user._json.given_name,
            //             userData: response.data.session.user._json,
            //             jwt_token: response.data.token,
            //             refreshToken:response.data.session.user.refreshToken,
            //             accessToken: response.data.session.user.accessToken
            //         })
            //     }
            // });
        }
    }
})
