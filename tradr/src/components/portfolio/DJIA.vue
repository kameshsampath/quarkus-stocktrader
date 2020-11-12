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
        <hc-card-title class="headerDivider cardHeader" hc-rank="1" hc-style-level="5">
          Dow Jones Industrial Average
        </hc-card-title>
      <br/>
        <hc-card-body class="u-text--reg">
          <div class="row">
            <div class="box box--1-4th myDivider">
              <div class="row">
                <div class="box box--center">
                  <hc-heading class="u-text--centered u-text--light eyeCatcher" hc-rank="3" hc-style-level="1">21,899.89</hc-heading>
                </div>
              </div>
              <div class="row">
                <div class="box box--center">
                  <hc-heading class="u-text--centered u-text--light stockIncrease" hc-rank="3" hc-style-level="2">196.14 (0.90%)</hc-heading>
                </div>
              </div>
              <div class="row u-divider"></div>
              <div class="row">
                <div class="box u-push-left--xlarge">
                  <div class="row">
                    <div class="box box--3rd">
                      <span class="u-text--bold">Open</span>
                    </div>
                    <div class="box box--3rd">
                      21,739.78
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="box u-push-left--xlarge">
                  <div class="row">
                    <div class="box box--3rd">
                      <span class="u-text--bold">High</span>
                    </div>
                    <div class="box box--3rd">
                      21,912.83
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="box u-push-left--xlarge">
                  <div class="row">
                    <div class="box box--3rd">
                      <span class="u-text--bold">Low</span>
                    </div>
                    <div class="box box--3rd">
                      21,738.13
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </hc-card-body>
      <hc-card-footer>
        <b>INDEXDJX: .DJI</b> - Retrieved {{ new Date().toLocaleString() }}
      </hc-card-footer>
    </hc-card>
</template>
<script>
  import hcModules from '@hybrid-cloud/cirrus-vue/src/components/hc-module/index'
  import hcIcon from '@hybrid-cloud/cirrus-vue/src/components/hc-icon/hc-icon'
  import hcHeadings from '@hybrid-cloud/cirrus-vue/src/components/hc-heading/hc-heading'

  export default {
    name: 'djia',
    components: Object.assign({
      'hc-heading': hcHeadings,
      'hc-icon': hcIcon}, hcModules.components),
    props: {
      portfolioData: Array
    }
  }
</script>
<style scoped lang="scss">
  @import '../../styles/styles.scss';
</style>
