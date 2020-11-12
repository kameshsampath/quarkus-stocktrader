<!--
  Cirrus style tag.
  Content: Transcluded

  Attributes:
    hc-color:
      hc(ibm|beta|third-party|local|dedicated|custom|experimental|community|private)
      or a CSS color
-->

<template>
  <span class="hc-tag tag" :class="hcTagColor" :style="hcTagStyle">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'hc-tag',
    props: {
      hcColor: { type: String },
    },
    computed: {
      hcTagColor() {
        if (this.hcColor && this.hcColor.toLowerCase().startsWith('hc(')) {
          return `tag--${this.hcColor.substring(3, this.hcColor.length - 1)}`;
        }
        return '';
      },
      hcTagStyle() {
        if (this.hcColor && !this.hcColor.toLowerCase().startsWith('hc(')) {
          return `color: ${this.hcColor}`;
        }
        return '';
      }
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/tags/tags';
</style>
