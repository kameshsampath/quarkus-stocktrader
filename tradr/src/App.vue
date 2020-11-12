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
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    // Import global event bus
    import bus from './components/bus'

    // We needed to fork cirrus to allow us to trigger updates
    // of cirrus components.
    import cirrus from './cirrus-js/cirrus.es5.hccto.js'

    export default {
        name: 'app',
        mounted () {
            // We needed to trigger cirrus updates
            // when a component is updated
            bus.$on('triggerCirrus', function () {
                cirrus()
            })
        }
    }
</script>

<style>
  @import '~@hybrid-cloud/cirrus/dist/css/cirrus.min.css';
</style>

