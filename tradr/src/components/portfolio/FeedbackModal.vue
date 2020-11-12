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
    <div class="modal" :data-modal="hcName" role="dialog" :aria-labelledby="`modal-title-${hcId}`"
         :aria-describedby="`modal-desc-${hcId}`">
        <div class="overlay js-close-modal"></div>
        <div class="modal-card">
            <hc-button hc-style="flat" class="modal-card__close js-close-modal">
                <hc-icon href="hc(close-modal)" class="icon--close-modal"></hc-icon>
            </hc-button>
            <h4 :id="`modal-title-${hcId}`" class="h2 modal-card__heading">{{ hcTitle }}</h4>
            <p :id="`modal-desc-${hcId}`" class="modal-card__content">
                <hc-text-area v-model="feedback" name="sendFeedback" placeholder="Feedback for StockTrader"
                              label="Feedback"></hc-text-area>
            </p>
            <hc-button hcStyle="primary" class="js-modal-focus js-close-modal" v-on:click="sendFeedback">Ok</hc-button>
            <hc-button class="js-close-modal" hcStyle="flat">Cancel</hc-button>
        </div>
    </div>
</template>

<script>
    import hcIds from '@hybrid-cloud/cirrus-vue/src/mixins/hc-ids';
    import hcButton from '@hybrid-cloud/cirrus-vue/src/components/hc-button/hc-button';
    import hcTextArea from '@hybrid-cloud/cirrus-vue/src/components/hc-textarea/hc-textarea';
    // MSG Bus to send new portfolio data back to the table.
    import bus from '../bus';
    // REST project
    import axios from 'axios';

    export default {
        name: 'action-modal',
        mixins: [hcIds],
        components: {
            hcButton,
            hcTextArea
        },
        props: {
            portfolio: {
                type: Object,
                required: true
            },
            hcName: {
                type: String,
                required: true
            },
            hcTitle: {
                type: String,
                required: true
            }
        },
        methods: {
            sendFeedback() {
                var config;
                console.log(this.portfolio)
                console.log("Sending feedback for " + this.portfolio.owner)
                var feedback = {'text': this.feedback}
                console.log(feedback)
                config = {
                    method: 'post',
                    url: '/portfolio/' + this.portfolio.owner + '/feedback',
                    headers: {'Authorization': 'Bearer ' + this.$jwt.getToken()},
                    data: {'text': this.feedback}
                }
                axios(config)
                    .then(response => {
                        console.log('here is the response');
                        console.log(response.data);
                        this.updatedPortfolio = this.portfolio;
                        this.updatedPortfolio.free = response.data.free;
                        this.updatedPortfolio.sentiment = response.data.sentiment;
                        this.updatedPortfolio.feedbackMsg = response.data.message;
                        bus.$emit('updatedPortfolio', this.updatedPortfolio);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        },
        data() {
            return {
                feedback: 'Good job',
                updatedPortfolio: null
            }
        }
    }
</script>

<style lang="scss">
</style>
