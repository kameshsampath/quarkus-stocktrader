<!--
  Cirrus style tabs-panel.
  Content: Transcluded

  Attributes:
    id: standard html props
    hc-link-label: text displayed in link
    hc-selected: panel is selected / visible
    hc-heading: { if one is to be displayed for the tab
      hcTitle: 'Heading text',
      hcRank: rank of heading 1,2,3,4...
    }
-->

<template>
  <div v-show="isActive" :id="id" :class="['hc-tabs__panel tab-panels__panel', {
      'is-selected': isActive
    }]" :aria-labelled-by="`tabs-link-${id}`" :aria-hidden="!isActive" role="tabpanel"
    >
    <hc-heading v-if="hcHeading" class="tab-panel__heading" :hc-style-level="hcHeading.hcStyleLevel" hc-rank="4">
      {{hcHeading.hcTitle}}
    </hc-heading>
    <slot></slot>
  </div>
</template>

<script>
  import hcHeading from '../hc-heading/hc-heading';

  export default {
    name: 'hc-tabs-panel',
    data() {
      return {
        isActive: false,
        // tab: {},
      };
    },
    props: {
      id: { type: String, required: true },
      hcLinkLabel: { type: String, requried: true },
      hcSelected: Boolean,
      hcHeading: Object
    },
    mounted() {
      this.isActive = this.hcSelected;
    },
    components: {
      'hc-heading': hcHeading
    }
  };
</script>
