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
  <span>
    <span></span>
    <tr v-for="row, rowIndex in portfolioData" :row-index="rowIndex" class="table__row" data-table-row="" :key="row">
      <span></span>
      <td class="table__cell">
        <span>{{ row.owner }}</span>
      </td>
      <td class="table__cell">
        <span>{{ row.total }}</span>
      </td>
      <td class="table__cell">
        <span>{{ row.loyalty }}</span>
      </td>
      <td class="table__cell">
        <span>
          <hc-overflow class="overflow-sample" hc-placeholder="Select an option...">
            <hc-overflow-item>Buy Stock</hc-overflow-item>
            <hc-overflow-item>Sell Stock</hc-overflow-item>
            <hc-overflow-item hcHasDivider="true">Delete Portfolio</hc-overflow-item>
          </hc-overflow>
        </span>
      </td>
    </tr>
  </span>
</template>

<script>
  import hcOverflow from '@hybrid-cloud/cirrus-vue/src/components/hc-overflow/hc-overflow'
  import hcOverflowItem from '@hybrid-cloud/cirrus-vue/src/components/hc-overflow/hc-overflow-item'

  export default {
    name: 'portfolioPerson',
    components: {
      'hc-overflow': hcOverflow,
      'hc-overflow-item': hcOverflowItem
    },
    props: {
      portfolioData: Array
    }
  }
</script>

<style lang="scss">
</style>


<template>
  <div>
    <hc-modal hcName="buyStock">
      Stock
    </hc-modal>
  </div>
</template>

<script>
  import hcModal from '@hybrid-cloud/cirrus-vue/src/components/hc-modal/hc-modal'
  import hcButton from '@hybrid-cloud/cirrus-vue/src/components/hc-button/hc-button'

  export default {
    name: 'mBuy',

    components: {
      'hc-modal': hcModal,
      'hc-button': hcButton
    },

    methods: {
    },

    props: {
      caption: String,
      headings: Array,
      person: String
    }
  }
</script>
<style lang="scss">
  @import '~@hybrid-cloud/cirrus-vue/src/globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/tables/tables';
</style>
