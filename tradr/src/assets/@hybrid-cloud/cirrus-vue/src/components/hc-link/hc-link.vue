<!--
  Cirrus style link.
  Content: Transcluded

  Attributes:
    hc-style: 'link', 'primary', 'secondary', 'flat'

  Events:
    click: $event
-->

<template>
  <a :class="['hc-link', {
                          'text-link': hcStyle === 'link',
                          'button button--primary': hcStyle === 'primary',
                          'button button--secondary': hcStyle === 'secondary',
                          'button button--flat': hcStyle === 'flat',
                        }]"
          >
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'hc-link',
    props: {
      hcStyle: { type: String, required: false, default: 'link' },
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/buttons/buttons';
  @import '~@hybrid-cloud/cirrus/src/scss/core/typography/typography';
</style>
