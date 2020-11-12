<!--
  Cirrus style input text field.
  Label: Transcluded

  Attributes:
    disabled: standard HTML input property
    name: standard HTML input property
    value: standard HTML input property
    placeholder: standard HTML input property
    hc-status: error
    hc-message : messages associating with the error
    hc-icon-href : icon indicates an error in the field

  Events:
    input: $event
-->

<template>
  <fieldset class="form-item" :class="{ 'has-error': hcStatus == 'error' }">
    <label class="label" :for="hcId">{{ label }}</label>
    <input
      :id="hcId"
      class="input input--text input--primary"
      type="text"
      ref="input"
      :disabled="disabled"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)">
      <span v-show="hcStatus == 'error'" class="form-item__message">{{ hcMessage }}</span>
      <hc-icon v-show="hcStatus == 'error'" :href="hcIconHref" class="icon--warn"></hc-icon>
  </fieldset>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';
  import hcIcon from '../hc-icon/hc-icon';

  export default {
    name: 'hc-text',

    components: {
      'hc-icon': hcIcon,
    },

    mixins: [hcIds],

    props: {
      label: String,
      disabled: Boolean,
      name: String,
      value: String,
      placeholder: String,
      hcStatus: String,
      hcMessage: String,
      hcIconHref: { type: String, required: false, default: 'hc(warn)' }
    },

    model: {
      event: 'input'
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/form-fields/form-fields';
</style>
