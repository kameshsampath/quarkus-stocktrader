<!--
  Cirrus style radio button.
  Label: Transcluded

  Attributes:
    hcName(optional): The name of this control
    items(Array): Each item contains attributes label(String), value(String) and selected(Boolean)

  Events:
    change: $event
-->

<template>
  <div class="button-group">
    <template v-for="(item, index) in items">
      <input
        :id="`bg-${hcId}-${index}`"
        class="button-group__radio"
        type="radio"
        :name="hcName?hcName:`bg-${hcId}`"
        @change="$emit('change', item)"
        :checked="item.selected"
        :value="item.value"><label
                            :for="`bg-${hcId}-${index}`"
                            class="button-group__label">
                              {{ item.label }}
                          </label>
    </template>
  </div>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-content-switcher',

    mixins: [hcIds],

    props: {
      hcName: {
        String
      },
      items: {
        type: Array
      }
    },

    model: {
      prop: 'checked',
      event: 'change'
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/button-group/button-group';
</style>
