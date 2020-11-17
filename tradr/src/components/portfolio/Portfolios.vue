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
        <div class="row">
            <div class="box box--full">
                <portfolioTable :caption="caption" :headings="headings" :data="data"
                                v-on:sortColumn="sortColumn"></portfolioTable>
            </div>
        </div>
    </div>
</template>

<script>
    // cirrus-vue
    import hcOverflow from '@hybrid-cloud/cirrus-vue/src/components/hc-overflow/hc-overflow'
    import hcModal from '@hybrid-cloud/cirrus-vue/src/components/hc-modal/hc-modal'
    // Build on top of cirrus-vue
    import stockHeader from '../Header'
    import portfolioTable from './PortfolioTable'
    import portfolioOverflowItem from './MenuModal'
    // Import msg bus
    import bus from '../bus'
    // REST project
    import axios from '../../portfolioApi'

    // Get cirrus lib
    // import cirrus from '../../cirrus-js/cirrus.es5.hccto.js'

    export default {
        name: 'portfolios',
        components: {
            'stockHeader': stockHeader,
            'portfolioTable': portfolioTable,
            'portfolio-overflow-item': portfolioOverflowItem,
            'hc-overflow': hcOverflow,
            'hc-modal': hcModal
        },
        updated() {
            // import('../../../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.js')
        },
        created() {
            bus.$on('updatedPortfolio', this.updateTable);
            bus.$on('addPerson', this.addPerson);
            bus.$on('removePerson', this.removePerson);
        },
        mounted() {
            this.updateTable()
        },
        methods: {
            addPerson(newPerson) {
                console.log('add new person');
                console.log(newPerson);
                this.data.push(newPerson);
            },
            removePerson(oldPerson) {
                console.log('removing person');
                console.log(oldPerson);
                this.data = this.data.filter(function (el) {
                    return el.owner !== oldPerson.owner;
                })
            },
            changeValue(arr, owner, value) {
                arr.map((project) => {
                    project.owner === owner ? project.total = value : null
                })
            },
            updateTable(profileData) {
                if (profileData) {
                    this.changeValue(this.data, profileData.owner, profileData.total)
                } else {
                    console.log("Getting portfolio with auth token ")
                    axios.get('/all', {headers: {'Authorization': 'Bearer ' + this.$store.getters.jwtToken}})
                        .then(response => {
                            console.log("Got portfolios {}",response.data);
                            for (var i in response.data) {
                                console.log(response.data[i]);
                                this.data.push(response.data[i]);
                            }
                        })
                        .catch(e => {
                            console.log(e)
                            console.log("trying with credentials from local store");
                            //It looks like there is a race condition here between $jwt and the storage of tokens in localstorage
                            //so let's fall back to localStorage just in case.
                            axios.get('/all', {headers: {'Authorization': 'Bearer ' + this.$store.getters.jwtToken}})
                                .then(response => {
                                    for (var i in response.data) {
                                        console.log(response.data[i]);
                                        this.data.push(response.data[i]);
                                    }
                                    console.log(response.data)
                                })
                                .catch(e => {
                                    console.log(e)
                                    console.log("Failed again")
                                });
                        });
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
                        a[this.headings[colIndex].field].localeCompare(b[this.headings[colIndex].field])
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
                        console.log(b[this.headings[colIndex].field].localeCompare(a[this.headings[colIndex].field], options))
                    };
                    this.data.sort(sortFn)
                }
            }
        },
        data() {
            return {
                errors: [],
                caption: `<span class="u-text--bold">Clients</span>`,
                headings: [
                    {
                        label: 'Name',
                        hideLabel: false,
                        sortable: true,
                        field: 'owner'
                    }, {
                        label: 'Total Assets',
                        sortable: true,
                        field: 'total'
                    }, {
                        label: 'Member Level',
                        sortable: true,
                        sortedReverse: true,
                        field: 'loyalty'
                    }, {
                        label: 'Action',
                        sortable: false
                    }
                ],
                data: []
            }
        }
    }
</script>

<style>

</style>
