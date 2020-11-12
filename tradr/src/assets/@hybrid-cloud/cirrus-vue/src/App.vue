<template>
  <div class="app">
    <hc-global-header-samples></hc-global-header-samples>

    <div class="container">
      <div class="row u-push-top--large">
        <h1 class="h1 u-push-top--medium">Samples for Cirrus Vue Components</h1>
        <hc-dropdown @change="updateComponent"
          hc-placeholder="Select an component...">
          <hc-dropdown-item v-for="item in items" :value="item" :key="item" :hc-selected="item === initialPrototype" v-text="item">

          </hc-dropdown-item>
        </hc-dropdown>
      </div>

      <h1 class="h1 u-push-top--medium">Samples for Cirrus Vue Components</h1>
      <component :is="activePrototype"></component>
  	</div>
  </div>
</template>

<script>
  // treat header differently as it's pinned to top
  import hcGlobalHeaderSamples from './samples/hc-global-header-samples';

  export default {
    name: 'app',
    components: {
      'hc-global-header-samples': hcGlobalHeaderSamples,
    },
    mounted() {
      // eslint-disable-next-line
      require('../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.js');
    },
    data() {
      return {
        items: [
          'hc-alert-samples',
          'hc-button-samples',
          'hc-card-samples',
          'hc-content-switcher-samples',
          'hc-checkbox-samples',
          'hc-dropdown-samples',
          'hc-heading-samples',
          'hc-file-upload-samples',
          'hc-icon-samples',
          'hc-link-samples',
          'hc-modal-samples',
          'hc-module-samples',
          'hc-overflow-samples',
          'hc-page-header-samples',
          'hc-pagination-samples',
          'hc-progress-samples',
          'hc-radio-samples',
          'hc-search-samples',
          'hc-select-samples',
          'hc-table-samples',
          'hc-tabs-samples',
          'hc-tag-samples',
          'hc-text-samples',
          'hc-toggle-samples',
          'hc-tooltip-samples',
        ],
        activePrototype: 'hc-alert-samples',
        initialPrototype: 'hc-alert-samples',
      };
    },
    methods: {
      updateComponent(ddItem) {
        this.activePrototype = ddItem.value;
      },
    }
  };

</script>

<style lang='scss'>
  // @import './globals/scss/cirrus-core';
</style>
