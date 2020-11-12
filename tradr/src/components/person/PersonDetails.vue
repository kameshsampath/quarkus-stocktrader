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
    <hc-card>
        <!--<hc-card-title class="headerDivider cardHeader" hc-rank="1" hc-style-level="5">
            {{ this.portfolio.owner }}
        </hc-card-title>
        <br/>-->
        <hc-card-body class="u-text--reg">
            <div class="row">
                <div class="box box--1-4th myDivider">
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1">
                            <span class="u-text--bold">Loyalty Level</span>
                        </div>
                        <div class="box box--5 offset--1 box--center">
                            {{ titleCase(this.portfolio.loyalty) }}
                        </div>
                    </div>
                    <div class="row" style="padding-top: 1em"></div>
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1">
                            <span class="u-text--bold">Account Balance</span>
                        </div>
                        <div class="box box--5 offset--1 box--center">
                            {{ format(this.portfolio.balance) }}
                        </div>
                    </div>
                    <div class="row" style="padding-top: 1em"></div>
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1">
                            <span class="u-text--bold">Spent on Commissions</span>
                        </div>
                        <div class="box box--5 offset--1">
                            {{ format(this.portfolio.commissions) }}
                        </div>
                    </div>
                    <div class="row" style="padding-top: 1em"></div>
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1">
                            <span class="u-text--bold">Commission Next Trade</span>
                        </div>
                        <div class="box box--5 offset--1">
                            {{ format(this.portfolio.nextCommission) }}
                        </div>
                    </div>
                    <div class="row" style="padding-top: 1em"></div>
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1 ">
                            <span class="u-text--bold">Free Trades Available</span>
                        </div>
                        <div class="box box--5 offset--1 box--center">
                            {{ this.portfolio.free }}
                        </div>
                    </div>
                    <div class="row" style="padding-top: 1em"></div>
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1 ">
                            <span class="u-text--bold">Messages from StockTrader </span>
                        </div>
                        <div class="box box--5 offset--1 box--center">
                            {{ typeof(this.portfolio.feedbackMsg) != "undefined" ? this.portfolio.feedbackMsg : "" }}
                        </div>
                    </div>
                    <div class="row" style="padding-top: 1em"></div>
                    <div class="row box--vertical-center box--center">
                        <div class="box box--5 offset--1 ">
                            <span class="u-text--bold">Sentiment</span>
                        </div>
                        <div class="box box--5 offset--1 box--center">
                            <font size="12">{{ this.portfolio.sentiment }}</font>
                        </div>
                    </div>
                </div>
            </div>
        </hc-card-body>
        <hc-card-footer>
            Retrieved {{ new Date().toLocaleString() }}
        </hc-card-footer>
    </hc-card>
</template>
<script>
    import hcModules from '@hybrid-cloud/cirrus-vue/src/components/hc-module/index'
    import hcIcon from '@hybrid-cloud/cirrus-vue/src/components/hc-icon/hc-icon'
    import hcHeadings from '@hybrid-cloud/cirrus-vue/src/components/hc-heading/hc-heading'

    export default {
        name: 'personDetails',
        components: Object.assign({
            'hc-heading': hcHeadings,
            'hc-icon': hcIcon
        }, hcModules.components),
        props: {
            portfolio: Object
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
            },
            titleCase(str) {
                return str.toLowerCase().split(' ').map(function (word) {
                    try {
                        return word.replace(word[0], word[0].toUpperCase());
                    } catch (e) {
                        return '';
                    }
                }).join(' ');
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../styles/styles.scss';
</style>
