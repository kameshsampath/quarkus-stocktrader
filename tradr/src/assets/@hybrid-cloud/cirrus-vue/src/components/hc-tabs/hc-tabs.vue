<!--
  Cirrus style tabs.
  Content: Transcluded
  Purpose: Provides abreviated syntax for declaring tab panels that follow the tab links

  Attributes:

-->

<template>
  <div class="hc-tabs">
    <hc-tabs-links :hc-tab-set="hcId"></hc-tabs-links>

    <hc-tabs-panel-set :hc-tab-set="hcId">
      <slot></slot>
    </hc-tabs-panel-set>
  </div>
</template>

<script>
  import hcTabsLinks from '../hc-tabs/hc-tabs-links';
  import hcTabsPanelSet from '../hc-tabs/hc-tabs-panel-set';
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-tabs',
    mixins: [hcIds],
    components: {
      'hc-tabs-links': hcTabsLinks,
      'hc-tabs-panel-set': hcTabsPanelSet,
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/dropdown/dropdown-variables';
  @import '~@hybrid-cloud/cirrus/src/scss/components/tabs/tabs';
</style>
