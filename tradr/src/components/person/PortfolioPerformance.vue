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
  <div class="row">
    <div class="box box--half u-text--centered">
      <hc-heading hc-rank="1" hc-style-level="6">PORTFOLIO VALUE</hc-heading>
      <hc-heading class="eyeCatcher u-text--centered u-text--light" hc-rank="3" hc-style-level="1">{{ this.portfolioValue }}</hc-heading>
    </div>
    <div class="box box--half u-text--centered">
      <hc-heading hc-rank="1" hc-style-level="6">YEAR TO DATE</hc-heading>
      <!-- TODO We don't track performance of stocks -->
      <hc-heading class="eyeCatcher u-text--centered u-text--light" v-bind:class="[this.isPositive ? 'stockIncrease' : 'stockDecrease']" hc-rank="3" hc-style-level="1">{{ this.rateOfReturn }}%</hc-heading>
    </div>
  </div>
</template>

<script>
  import hcIcon from '@hybrid-cloud/cirrus-vue/src/components/hc-icon/hc-icon'
  import hcHeadings from '@hybrid-cloud/cirrus-vue/src/components/hc-heading/hc-heading'

  export default {
    name: 'portfolioPerformance',
    components: {
      'hc-heading': hcHeadings,
      'hc-icon': hcIcon
    },
    updated () {
      if (this.portfolioValue === '$0.00') {
        this.rateOfReturn = 0
      }
      this.isPositive = this.rateOfReturn >= 0.0
    },
    props: {
      portfolioValue: String,
      rateOfReturn: String
    },
    data () {
      return {
        isPositive: null
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/styles.scss';
</style>
