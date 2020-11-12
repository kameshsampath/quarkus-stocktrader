<!--
  Cirrus style tooltip.
  Content: Transcluded

  Attributes:
    hc-position: top, right, bottom, left
    hc-tooltip: tip to display
-->

<template>
  <span :class="['hc-tooltip tooltip', 'tooltip--' + position]"
      :aria-label="hcTooltip">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'hc-tooltip',
    props: {
      hcPosition: { type: String, default: 'top' },
      hcTooltip: { type: String, required: true },
    },
    computed: {
      position() {
        let pos = this.hcPosition.toLowerCase();
        if (!['top', 'left', 'right', 'bottom'].includes(pos)) {
          pos = 'top';
        }
        return pos;
      }
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/tooltips/tooltips';
</style>
