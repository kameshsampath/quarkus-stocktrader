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
    <tr v-for="row in portfolioData.stocks" :row-index="rowIndex" class="table__row" data-table-row="" :key="row">
      <td class="table__cell">
        <span>{{ row.symbol }}</span>
      </td>
      <td class="table__cell">
        <span>{{ row.shares }}</span>
      </td>
      <td class="table__cell">
        <span>{{ format(row.commission) }}</span>
      </td>
      <td class="table__cell">
        <span>{{ format(row.price) }}</span>
      </td>
      <td class="table__cell">
        <span>{{ row.date }}</span>
      </td>
      <td class="table__cell">
        <span>{{ format(row.total) }}</span>
      </td>
    </tr>
  </span>
</template>

<script>
  import hcModal from '@hybrid-cloud/cirrus-vue/src/components/hc-modal/hc-modal'

  export default {
    name: 'stocks',
    components: {
      'hc-modal': hcModal
    },
    props: {
      portfolioData: Object
    },
    methods: {
        format(number) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
                // the default value for minimumFractionDigits depends on the currency
                // and is usually already 2
            })
            return formatter.format(number)
        }
    }
  }
</script>
