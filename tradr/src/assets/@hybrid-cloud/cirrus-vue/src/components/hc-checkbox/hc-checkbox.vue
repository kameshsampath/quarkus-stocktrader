<!--
  Cirrus style checkbox.
  Label: Transcluded

  Attributes:
    checked: true | false
    disabled: standard HTML checkbox property
    name: standard HTML checkbox property
    value: standard HTML checkbox property

  Events:
    click: $event
-->

<template>
  <div class="hc-checkbox checkbox" :class="{'is-disabled': disabled}">
    <input :id="hcId" class="checkbox__checkbox" type="checkbox" ref="input"
      :checked="checked" :disabled="disabled"
      :name="name" :value="value" @change="$emit('change', $event.target.checked)">
    <label :for="hcId" class="checkbox__label">
        <slot></slot>
    </label>
  </div>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-checkbox',
    mixins: [hcIds],
    props: {
      checked: { type: Boolean, required: false },
      disabled: { type: Boolean, required: false },
      name: { type: String, requried: false },
      value: { type: String, required: false },
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/checkbox/checkbox';
</style>
