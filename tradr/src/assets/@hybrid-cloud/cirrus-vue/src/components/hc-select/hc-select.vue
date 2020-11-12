<!--
  Cirrus style input select field.
  Label: Transcluded

  Attributes:
    disabled: standard HTML input property
    name: standard HTML input property
    hc-status: error
    hc-message : messages associating with the error
    hc-icon-href : icon indicates an error in the field

  Events:
    input: $event
-->

<template>
  <fieldset class="form-item">
    <label
      :id="`label-${hcId}`"
      :for="hcId"
      class="label">
        {{ label }}
    </label>
    <select
      :id="hcId"
      :aria-labelledby="`label-${hcId}`"
      class="input input--select input--primary"
      ref="select"
      :disabled="disabled"
      :name="name"
      @change="$emit('change', $event.target.value)">
      <option selected="selected" disabled="disabled">Please select...</option>
      <slot></slot>
    </select>
    <span v-show="hcStatus == 'error'" class="form-item__message">{{ hcMessage }}</span>
    <hc-icon class="icon--caret" href="hc(caret)"></hc-icon>
    <hc-icon v-show="hcStatus == 'error'" :href="hcIconHref" class="icon--warn error--select"></hc-icon>
  </fieldset>
</template>

<script>
  import hcIcon from '../hc-icon/hc-icon';
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-select',

    mixins: [hcIds],

    components: {
      'hc-icon': hcIcon,
    },

    props: {
      label: String,
      disabled: Boolean,
      name: String,
      value: String,
      hcStatus: String,
      hcMessage: String,
      hcIconHref: { type: String, required: false, default: 'hc(warn)' }
    },

    model: {
      event: 'change'
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/form-fields/form-fields';
</style>
