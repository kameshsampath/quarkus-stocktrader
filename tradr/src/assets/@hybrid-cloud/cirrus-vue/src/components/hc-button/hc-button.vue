<!--
  Cirrus style button.
  Content: Transcluded

  Attributes:
    disabled: standard HTML property
    type: standard HTML property
    hc-icon-href: 'href://.../icon.svg#icon', '#icon', 'hc(calendar)'
    hc-style: 'primary', 'secondary', 'flat'

  Events:
    click: $event
-->

<template>
  <button :class="['hc-button button', {
                          'button--primary': hcStyle === 'primary',
                          'button--secondary': hcStyle === 'secondary',
                          'button--flat': hcStyle === 'flat',
                          'is-disabled': disabled,
                        }]"
          @click="$emit('click', $event)"
          role="button"
          >
    <slot /><!--
    --><hc-icon v-if="hcIconHref" :href="hcIconHref"></hc-icon>
  </button>
</template>

<script>
  import hcIcon from '../hc-icon/hc-icon';

  export default {
    name: 'hc-button',
    props: {
      hcIconHref: { type: String, required: false },
      hcStyle: { type: String, required: false, default: 'primary' },
      disabled: { type: Boolean, required: false },
    },
    components: {
      'hc-icon': hcIcon,
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/buttons/buttons';
</style>
