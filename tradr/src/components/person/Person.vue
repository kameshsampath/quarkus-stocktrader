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
                <div class="box box--full">
                    <hc-page-header
                            hc-breadcrumb-text="Previous"
                            :hc-title="this.user"></hc-page-header>
                </div>
            </div>
            <div class="row u-push-top--large">
                <div class="box box--full">
                    <span style="font-weight: bold;" class="eyeCatcher">
                        <span v-html="msg"></span>
                    </span>
                </div>
            </div>
            <div class="row u-push-top--large">
                <div class="box box--full">
                    <hc-tabs>
                        <hc-tabs-panel id="portfolioOverview" hc-link-label="Portfolio Overview" :hc-selected="true">
                            <hc-card>
                                <!--<hc-card-title class="headerDivider cardHeader" hc-rank="1" hc-style-level="5">
                                    Portfolio Overview
                                </hc-card-title>-->
                                <hc-card-body>
                                    <portfolioPerformance :portfolioValue="format(this.data.total)"
                                                          :rateOfReturn="this.rateOfReturn"></portfolioPerformance>
                                    <br/>
                                    <personTable :caption="caption" :headings="headings" :data="data"
                                                 v-on:sortColumn="sortColumn"></personTable>
                                </hc-card-body>
                            </hc-card>
                        </hc-tabs-panel>
                        <hc-tabs-panel id="userInfo" hc-link-label="User Details">
                            <div class="box box--3rd box--center">
                                <personDetails :portfolio="this.data"></personDetails>
                            </div>
                        </hc-tabs-panel>
                    </hc-tabs>

                </div>
            </div>
            <div class="row u-push-top--large">

            </div>
        </div>
    </div>
</template>

<script>
import hcPageHeader from '@hybrid-cloud/cirrus-vue/src/components/hc-page-header/hc-page-header';
import hcCards from '@hybrid-cloud/cirrus-vue/src/components/hc-card/index.js';

import hcTabs from '@hybrid-cloud/cirrus-vue/src/components/hc-tabs/hc-tabs';
import hcTabsPanel from '@hybrid-cloud/cirrus-vue/src/components/hc-tabs/hc-tabs-panel';

// Build on top of cirrus-vue
import personTable from './PersonTable';
import stockHeader from '../Header';
import portfolioPerformance from './PortfolioPerformance';
import personDetails from './PersonDetails';
// Import msg bus
import bus from '../bus';
// REST project
import axios from '../../portfolioApi';

// Get cirrus lib

export default {
    name: 'person',
    components:
        Object.assign({
            'hc-page-header': hcPageHeader,
            'hc-abs': hcTabs,
            'hc-tabs-panel': hcTabsPanel,
            'stockHeader': stockHeader,
            'personTable': personTable,
            'portfolioPerformance': portfolioPerformance,
            'personDetails': personDetails
        }, hcCards.components),
    updated() {
        // import('../../../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.js')
        if (this.portfolioValue) {
            this.getPortfolioReturns(this.user); //2nd param current portfolio value
        }
    },
    created() {
        bus.$on('updatedPortfolio', this.updateTable);
    },
    mounted() {
        this.user = this.$route.params.user;
        console.log(this.user);
        this.getPortfolio(this.user);
    },
    methods: {
        format(number) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
                // the default value for minimumFractionDigits depends on the currency
                // and is usually already 2
            });
            console.log('number ' + number);
            if(isNaN(number)){
                return number;
            }
            var newNum = formatter.format(number);
            console.log('new number ' + newNum);
            return newNum;
        },
        getEmoji(sentiment) {
            var emoji = "😶";
            switch (sentiment) {
                case 'Anger':
                    emoji = "😡";
                    break;
                case 'Sadness':
                    emoji = "😭";
                    break;
                case 'Fear':
                    emoji = "😨";
                    break;
                case 'Joy':
                    emoji = "😁";
                    break;
                case 'Analytical':
                    emoji = "🤓";
                    break;
                case 'Confident':
                    emoji = "👍";
                    break;
                case 'Tentative':
                    emoji = "🤔";
                    break;
                default:
                    emoji = "😐";
                    break;
            }
            console.log("Sentiment is " + emoji);
            return emoji;
        },
        getPortfolio(user) {
            console.log('user is ' + user);
            axios.get('/' + user, {headers: {'Authorization': 'Bearer ' + this.$store.getters.jwtToken}})
                .then(response => {
                    console.log('here comes the response from viewPortfolio');
                    var person = response.data;
                    console.log(person);
                    this.data = person;
                    this.data.sentiment = this.getEmoji(person.sentiment);
                    this.portfolioValue = person.total;
                    this.$set(this.data, 'feedbackMsg', '');
                    this.msg = "";
                    bus.$emit('triggerCirrus');
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getPortfolioReturns(user) {
            console.log('getting returns for ' + user + ' with current portfolio value ' + this.portfolioValue);
            axios.get('/' + user + '/returns', {headers: {'Authorization': 'Bearer ' + this.$store.getters.jwtToken}})
                .then(response => {
                    console.log('response from getting ROI');
                    var returnPercentage = response.data;
                    console.log(returnPercentage);
                    this.rateOfReturn = returnPercentage;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        updateTable(profileData) {
            console.log('got an updated set of stock data');
            console.log(profileData);
            console.log(this.owner);
            console.log(this.data);
            if (profileData.constructor !== Array) {
                console.log('got an object');
                this.data = profileData;
                this.data.sentiment = this.getEmoji(profileData.sentiment);
                if(this.data.feedbackMsg){
                    this.msg = 'Message from StockTrader: <font size="6">' + this.data.sentiment + "</font> "+
                        this.data.feedbackMsg;
                }

                bus.$emit('triggerCirrus');
            } else {
                console.log('getting portfolio data for user ' + this.user);
                this.getPortfolio(this.user);
            }
        },
        sortColumn(colIndex) {
            // TODO Broken
            // NOTE: A sample sort, not a sensible one. Columns like status and date will likely need specific sorts

            let sortFn;

            console.log(colIndex);
            console.log(this.headings[colIndex].sortedReverse);
            if (this.headings[colIndex].sortedReverse) {
                this.headings[colIndex].sortedReverse = false;
                sortFn = (a, b) => {
                    console.log('sort normal');
                    console.log(b);
                    console.log(a);
                    console.log(a[this.headings[colIndex].field]);
                    console.log(b[this.headings[colIndex].field]);
                    a[this.headings[colIndex].field].localeCompare(b[this.headings[colIndex].field]);
                }
            } else {
                // may not exist, use this.$set
                this.$set(this.headings[colIndex], 'sortedReverse', true);
                console.log('sort reverse');
                sortFn = (a, b) => {
                    console.log(b);
                    console.log(a);
                    console.log(a[this.headings[colIndex].field]);
                    console.log(b[this.headings[colIndex].field]);
                    b[this.headings[colIndex].field].localeCompare(a[this.headings[colIndex].field]);
                    var options = {
                        options: {
                            ignorePunctuation: true
                        }
                    };
                    console.log(b[this.headings[colIndex].field].localeCompare(a[this.headings[colIndex].field],
                        options));
                }
                this.data.sort(sortFn);
            }
        }
    },
    data() {
        return {
            errors: [],
            caption: `<span class="u-text--bold">Clients</span>`,
            headings: [
                {
                    label: 'Symbol',
                    hideLabel: false,
                    sortable: true,
                    field: 'symbol'
                }, {
                    label: 'Shares',
                    sortable: true,
                    field: 'shares'
                }, {
                    label: 'Commission',
                    sortable: true,
                    field: 'commission'
                }, {
                    label: 'Price',
                    sortable: true,
                    sortedReverse: true,
                    field: 'price'
                }, {
                    label: 'Date Quoted',
                    sortable: false,
                    field: 'date'
                }, {
                    label: 'Total',
                    sortable: true,
                    field: 'total'
                }
            ],
            user: null,
            data: [],
            portfolioValue: null,
            rateOfReturn: null,
            msg: null
        }
    }
}
</script>

<style lang="scss">
    @import '~@hybrid-cloud/cirrus-vue/src/globals/scss/cirrus-globals';
    @import '../../styles/styles.scss';

    .headerDivider {
        padding: 10px;
        border-color: black;
        border-width: 3px;
        border-bottom-style: solid;
    }

    .cardHeader {
        text-align: left !important;
        margin: 15px 0 5px;
    }
</style>
