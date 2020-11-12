<!--
  Cirrus style radio button.
  Label: Transcluded

  Attributes:
    checked: true | false
    disabled: standard HTML radio property
    name: standard HTML radio property
    value: standard HTML radio property

  Events:
    click: $event
-->

<template>
  <div class="hc-radio radio" :class="{'is-disabled': disabled}">
    <input
      :id="hcId"
      class="radio__button"
      type="radio"
      ref="input"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="$emit('change', $event.target.checked)">
    <label :for="hcId" class="radio__label">
        <slot></slot>
    </label>
  </div>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-radio',
    mixins: [hcIds],
    props: {
      checked: Boolean,
      disabled: Boolean,
      name: String,
      value: String,
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/radio-button/radio-button';
</style>
