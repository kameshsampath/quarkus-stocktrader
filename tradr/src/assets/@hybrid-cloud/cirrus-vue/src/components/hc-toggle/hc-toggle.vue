<!--
  Cirrus style toggle.
  Label: Transcluded

  Attributes:
    checked: true | false
    disabled: standard HTML toggle property
    name: standard HTML toggle property
    value: standard HTML toggle property
    hc-off-label: Off label string
    hc-on-label: On label string

  Events:
    click: $event
-->

<template>
  <div class="hc-toggle toggle" :class="{'is-disabled': disabled}">
    <input
      :id="hcId"
      class="toggle__checkbox"
      type="checkbox"
      ref="input"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="$emit('change', $event.target.checked)">
    <label :for="hcId" class="toggle__label">
      <span class="toggle__label--left">{{hcOffLabel}}</span>
      <span class="toggle__handle"></span>
      <span class="toggle__label--right">{{hcOnLabel}}</span>
    </label>
  </div>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-toggle',
    mixins: [hcIds],
    props: {
      checked: Boolean,
      disabled: Boolean,
      name: String,
      value: String,
      hcOffLabel: { type: String, default: 'Off' },
      hcOnLabel: { type: String, default: 'On' }
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/toggle/toggle';
</style>
