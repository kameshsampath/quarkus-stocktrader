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
    <hc-global-header hcTitleHref="..">
        <template slot="header-title">
            ACME Stock Co
        </template>
        <template slot="header-links">
            <hc-global-header-item hc-href="">
                <hc-icon href="hc(user)"></hc-icon>
                {{ userName }}
            </hc-global-header-item>
            <hc-global-header-item hc-href="">
                <hc-icon href="hc(manage)"></hc-icon>
                Settings
            </hc-global-header-item>
            <hc-global-header-item hc-href="">
                <hc-icon href="hc(help)"></hc-icon>
                Help
            </hc-global-header-item>
        </template>
        <template slot="header-nav-links">
            <hc-global-header-nav-item hc-href="">
                <hc-icon class="icon icon--caret" href="hc(caret)"></hc-icon>
                Home
            </hc-global-header-nav-item>
        </template>
    </hc-global-header>
</template>

<script>
    import hcIcon from '@hybrid-cloud/cirrus-vue/src/components/hc-icon/hc-icon'
    import hcGlobalHeader from '@hybrid-cloud/cirrus-vue/src/components/hc-global-header/hc-global-header'
    import hcGlobalHeaderItem from '@hybrid-cloud/cirrus-vue/src/components/hc-global-header/hc-global-header-item'
    import hcGlobalHeaderNavItem from '@hybrid-cloud/cirrus-vue/src/components/hc-global-header/hc-global-header-nav-item'
    import { mapGetters } from 'vuex'

    export default {
        name: 'stockHeader',
        components: {
            'hc-global-header': hcGlobalHeader,
            'hc-global-header-item': hcGlobalHeaderItem,
            'hc-global-header-nav-item': hcGlobalHeaderNavItem,
            'hc-icon': hcIcon
        },
        computed: {
            ...mapGetters(['userName'])
        },
        methods: {
            getUserName: function () {
                this.$store.dispatch('userName').then(function () {
                    // Execute application logic after successful login
                })
            }
        },
        created() {
            this.getUserName();
        }
    }
</script>

<style type="scss">
</style>
