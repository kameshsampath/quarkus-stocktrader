<!--
  Cirrus style input search field.

  Attributes:
    value: standard HTML input property
    placeholder: standard HTML input property
    hc-icon-href : icon indicates an error in the field
    hc-filter
      - label
      - items

  Events:
    input: $event
-->

<template>
  <fieldset class="form-item" :class="{ 'with-filter': hcFilter }">
    <hc-dropdown v-if="hcFilter" :hc-placeholder="hcFilter.label" @change="updateFilter">
      <hc-dropdown-item v-for="item in hcFilter.items" :key="item" :value="item">{{item}}</hc-dropdown-item>
    </hc-dropdown>

    <input
      :id="hcId"
      class="input input--search input--primary"
      type="search"
      ref="input"
      :value="result.value"
      :placeholder="placeholder"
      @input="updateInput">
      <hc-icon :href="hcIconHref" class="icon icon--search"></hc-icon>
  </fieldset>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';
  import hcIcon from '../hc-icon/hc-icon';
  import hcDropdown from '../hc-dropdown/hc-dropdown';
  import hcDropdownItem from '../hc-dropdown/hc-dropdown-item';

  export default {
    name: 'hc-search',

    components: {
      'hc-icon': hcIcon,
      'hc-dropdown': hcDropdown,
      'hc-dropdown-item': hcDropdownItem,
    },

    mixins: [hcIds],

    props: {
      value: String,
      placeholder: { type: String, default: 'Search' },
      hcIconHref: { type: String, required: false, default: 'hc(search)' },
      hcFilter: Object,
    },

    data() {
      return {
        filter: '',
        searchValue: '',
        result: {}
      };
    },

    methods: {
      updateInput(ev) {
        this.searchValue = ev.target.value;
        this.result = { filter: this.filter, value: this.searchValue };
        this.$emit('input', this.result);
      },

      updateFilter(update) {
        this.filter = update.value;
        this.result = { filter: this.filter, value: this.searchValue };
        this.$emit('filterChange', this.result);
      },
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/form-fields/form-fields';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/search/search';
</style>
