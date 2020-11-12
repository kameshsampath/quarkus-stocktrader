<!--
  Cirrus style overflow item.
  Content: Transcluded

  Attributes:
    hc-has-divider: true or false

  Events:
    @click="$emit('click', $event)"

-->

<template>
  <li class="list-overflow__item" :class="{ 'with-divider': hcHasDivider }"
    role="presentation">
    <button class="list-overflow__action"
      role="menuitem"
      @click="$emit('click', $event)"
      >
      <slot></slot>
    </button>
  </li>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-overflow-item',
    mixins: [hcIds],
    props: {
      hcHasDivider: { type: Boolean, required: false },
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/overflow/overflow';
</style>
