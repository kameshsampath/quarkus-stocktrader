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
        <table class="table">
            <caption v-if="caption" class="table-header">
                <span class="u-text--bold">Clients</span>
                <hc-button class="js-modal" data-modal-target="Add Portfolio" hcStyle="primary"
                           hc-icon-href="hc(add-new)" style="float: right;">Add Client
                </hc-button>
            </caption>
            <thead v-if="headings" class="table__head">
            <tr class="table__row">
                <th v-for="heading in headings" class="table__cell" scope="col" :key="heading.id"
                    v-on:click="sortColumn (columnIndex)">
                    <span v-if="heading.label && !heading.hideLabel" v-text="heading.label"></span>
                    <hc-icon v-if="heading.sortable" class="icon"
                             :class="{ 'icon--down': !heading.sortedReverse, 'icon--up': heading.sortedReverse }"
                             :href="heading.sortedReverse ? 'hc (arrow-up)' : 'hc (arrow-down)'"></hc-icon>
                </th>
            </tr>
            </thead>
            <tbody class="table__body">
                <portfolioPerson v-bind:portfolioData=data></portfolioPerson>
            </tbody>
        </table>
        <!-- portfolio data must exist in trader database otherwise the modal doesn't pop up -->
        <!-- might need to have mounted emit a cirrus trigger -->
        <add-portfolio-modal v-cloak hcTitle="Add Portfolio" hcName="Add Portfolio"></add-portfolio-modal>
    </div>
</template>

<script>
    import hcIcon from '@hybrid-cloud/cirrus-vue/src/components/hc-icon/hc-icon'
    import hcButton from '@hybrid-cloud/cirrus-vue/src/components/hc-button/hc-button'
    import portfolioPerson from './portfolioPerson'
    import addPortfolioModal from './AddPortfolioModal'

    import bus from '../bus'

    export default {
        name: 'portfolioTable',

        components: {
            'hc-icon': hcIcon,
            'hc-button': hcButton,
            'portfolioPerson': portfolioPerson,
            'add-portfolio-modal': addPortfolioModal
        },
        updated() {
            // import('../../../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.js')
        },
        mounted() {
            console.log("mounted table")
            bus.$emit('triggerCirrus')
        },
        methods: {
            sortColumn(columnIndex) {
                console.log(columnIndex)
                this.$emit('sortColumn', columnIndex)
            }
        },
        props: {
            caption: String,
            headings: Array,
            data: Array
        }
    }
</script>
<style lang="scss">
    @import '~@hybrid-cloud/cirrus-vue/src/globals/scss/cirrus-globals';
    @import '~@hybrid-cloud/cirrus/src/scss/elements/tables/tables';
</style>
