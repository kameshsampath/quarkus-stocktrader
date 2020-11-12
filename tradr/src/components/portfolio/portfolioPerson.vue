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
    <tr v-for="row in portfolioData" :row-index="rowIndex" class="table__row" data-table-row="" :key="row">
      <td class="table__cell">
        <router-link :to="{ name: 'Person', params: { user: row.owner }}">
          {{ row.owner }}
        </router-link>
      </td>
      <td class="table__cell">
        <span>{{ formatter(row.total) }}</span>
      </td>
      <td class="table__cell">
        <span>{{ row.loyalty }}</span>
      </td>
      <td class="table__cell">
        <span>
          <hc-overflow class="overflow-sample" hc-placeholder="Select an option...">
            <portfolio-overflow-item hcModalPop="true"
                                     :hcModalTarget="'Buy ' + row.owner">Buy Stocks</portfolio-overflow-item>
            <portfolio-overflow-item hcModalPop="true"
                                     :hcModalTarget="'Sell ' + row.owner">Sell Stocks</portfolio-overflow-item>
            <portfolio-overflow-item hcHasDivider="true" hcModalPop="true" :hcModalTarget="'Delete ' + row.owner">Delete Portfolio</portfolio-overflow-item>
          </hc-overflow>
        </span>
      </td>
      <action-modal action="buy" :portfolio="row" :hcName="'Buy ' + row.owner" :hcTitle="'Buy stocks for '+ row.owner">
      </action-modal>
      <action-modal action="sell" :portfolio="row" :hcName="'Sell ' + row.owner" :hc-title="'Sell stocks for '+ row.owner">
      </action-modal>
      <delete-portfolio-modal :owner="row.owner" :hcName="'Delete ' + row.owner" :hcTitle="'Delete '+ row.owner + '\'s Portfolio'"></delete-portfolio-modal>
    </tr>
  </span>
</template>

<script>
  import portfolioOverflowItem from './MenuModal'
  import actionModal from './ActionModal'
  import deletePortfolioModal from './DeletePortfolioModal'
  import hcOverflow from '@hybrid-cloud/cirrus-vue/src/components/hc-overflow/hc-overflow'
  import hcModal from '@hybrid-cloud/cirrus-vue/src/components/hc-modal/hc-modal'

  import bus from '../bus'

  export default {
    name: 'portfolioPerson',
    components: {
      'portfolio-overflow-item': portfolioOverflowItem,
      'action-modal': actionModal,
      'delete-portfolio-modal': deletePortfolioModal,
      'hc-overflow': hcOverflow,
      'hc-modal': hcModal
    },
    updated () {
      console.log('emit from portfolioPerson')
      bus.$emit('triggerCirrus')
      console.log('done emitting portfolioPerson')
    },
      methods:{
          formatter(number) {
              var formatter = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2
                  // the default value for minimumFractionDigits depends on the currency
                  // and is usually already 2
              })
              console.log('number ' + number);
              if(isNaN(number)){
                  return number;
              }
              var newNum = formatter.format(number);
              console.log('new number ' + newNum);
              return newNum;
          },
      },
    props: {
      portfolioData: Array
    }
  }
</script>
