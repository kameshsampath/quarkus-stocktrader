<!--
  Cirrus style tabs-panels.
  Content: none

  Attributes:
    hc-tab-set: id of the tabset
-->

<template>
  <div class="hc-tabs__panel-set">
    <slot></slot>
  </div>
</template>

<script>
  import hcTabsStore from './hc-tabs-store';
  import hcTabsPanel from './hc-tabs-panel';

  export default {
    name: 'hc-tabs-panel-set',
    props: {
      hcTabSet: { type: String, required: true },
    },
    data() {
      return {
        tabSet: {}
      };
    },
    created() {
      this.tabSet = hcTabsStore.addTabSet(this.hcTabSet, this.$children);
    },
    components: {
      'hc-tabs-panel': hcTabsPanel,
    }
  };
</script>
