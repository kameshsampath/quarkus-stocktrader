<!--
  Cirrus style tabs switcher.
  Content: None

  Attributes:
    hc-panel-set: identifier for the set of tabs
-->
<template>
  <div class="hc-tabs__links tabs" role="tablist">
    <a class="tabs__dropdown" href="" :aria-controls="hcId"></a>
    <ul :id="hcId" class="tabs__list">
      <li v-for="tab in tabSet.tabs" :class="['tabs__item', { 'is-selected': tab.isActive }]" role="presentation">
        <a :id="`tabs-link-${tab.id}`" class="tabs__link" href="" :selected="tab.selected"
          :aria-controls="`tab-panel-${tab.id}`" :aria-selected="tab.selected" role="tab"
          @click.prevent="selectedTab(tab)">
          {{tab.hcLinkLabel}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import hcTabsStore from './hc-tabs-store';
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-tabs-links',
    mixins: [hcIds],
    props: {
      hcTabSet: { type: String, required: true },
    },
    data() {
      return {
        tabSet: {}
      };
    },
    created() {
      this.tabSet = hcTabsStore.getTabSet(this.hcTabSet);
    },
    methods: {
      selectedTab(tabToSelect) {
        hcTabsStore.setActiveTab(this.hcTabSet, tabToSelect.id);
      }
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/dropdown/dropdown-variables';
  @import '~@hybrid-cloud/cirrus/src/scss/components/tabs/tabs';
</style>
