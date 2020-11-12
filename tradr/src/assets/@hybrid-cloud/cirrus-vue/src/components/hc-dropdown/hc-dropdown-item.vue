<!--
  Cirrus style button.
  Content: Transcluded

  Attributes:
    hc-selected: item is current selection
    value: value associated with the dropdown item
  Events:
    item-click: $event, vueObject
    item-mouse-over: $event, vueObject
-->

<template>
  <li class="dropdown__item" role="option"
    @click.capture="$emit('item-click', hcId)"
    @mouseover.capture="$emit('item-mouse-over', hcId)"
    :class="{ 'is-selected': isActive }">
    <slot></slot>
  </li>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-dropdown-item',
    mixins: [hcIds],
    props: {
      value: { type: String, requried: true },
      hcSelected: { type: Boolean, default: false },
    },
    data() {
      return {
        content: Object,
        isActive: false,
      };
    },
    mounted() {
      this.content = this.$slots.default;
      this.isActive = this.hcSelected;
    },
  };
</script>
