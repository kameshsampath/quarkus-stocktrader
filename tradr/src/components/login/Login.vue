<!--
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
 -->
<template>
  <div>
    <stock-header></stock-header>
    <div class="container">
      <div class="row u-push-top--large">
        <hc-heading hc-rank="1">Login</hc-heading>
      </div>
      <div class="row u-push-top--large">
        <div class="box box--2-3rd">
          <hc-card>
            <hc-card-body>
              <button @click="login()">Login</button>
            </hc-card-body>
          </hc-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import stockHeader from '../Header'
  import portfolio from '../portfolio/Portfolios'
  import DJIA from '../portfolio/DJIA'

  import hcHeadings from '@hybrid-cloud/cirrus-vue/src/components/hc-heading/hc-heading'
  import hcCards from '@hybrid-cloud/cirrus-vue/src/components/hc-card/index.js'

  export default {
    name: 'login',
    components:
      Object.assign({
        'stockHeader': stockHeader,
        'djia': DJIA,
        'portfolios': portfolio,
        'hc-heading': hcHeadings
      }, hcCards.components),
    computed: {
      isAuthenticated: function () {
        return this.$store.getters.isAuthenticated()
      }
    },
    updated () {
      // import('../../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.js')
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login').then(function () {
          // Execute application logic after successful login
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '~@hybrid-cloud/cirrus-vue/src/globals/scss/cirrus-globals';

  .headerDivider {
    padding: 10px;
    border-color: black;
    border-width: 3px;
    border-bottom-style: solid;
  }
</style>
