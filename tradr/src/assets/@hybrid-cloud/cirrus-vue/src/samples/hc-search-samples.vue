<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Input Text Field</h2>
      <form class="box box--4">
        <hc-search @input="handleSearch(1, $event)"></hc-search>
      </form>
    </div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Input Textarea</h2>
      <form class="box box--4">
        <hc-search placeholder="Find danger" hc-icon-ref="hc(warn)" @input="handleSearch(2, $event)"></hc-search>
      </form>
    </div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Input Text Field</h2>
      <form class="box box--4">
        <hc-search @input="handleSearch(3, $event)" @filterChange="filterChange(3, $event)" :hc-filter="{ label: 'Category', items: [
        'Category 1', 'Category 2', 'Category 3'
        ]}"></hc-search>
      </form>
    </div>
  </div>
</template>

<script>
  import hcSearch from '../components/hc-search/hc-search';

  export default {
    name: 'hc-search-samples',
    components: {
      'hc-search': hcSearch,
    },
    data() {
      return {
        searchValues: [],
      };
    },
    methods: {
      handleSearch(searchId, val) {
        this.searchValues[searchId] = val;
      },
      filterChange(searchId, val) {
        this.searchValues[searchId] = val;
      }
    },
  };
</script>
