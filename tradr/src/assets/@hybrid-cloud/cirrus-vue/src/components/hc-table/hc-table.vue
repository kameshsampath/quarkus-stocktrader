<!--

Cirrus style input select field.
Label: Transcluded

Attributes:
  hc-caption: string or html
  hc-headings: array of
    - heading
      - label - string - used in cells
      - hideLabel - true or false
      - sortable - true or false
  hc-data: array of rows, containing array of cell data which contain strings or html
    - row
      - cell: string or html
    - row
      - cell
    - row
      .
      .
      .

Events:
  sortColumn: columnIndex
-->
<template>
  <table class="table">
    <caption v-if="hcCaption" class="table-header" v-html="hcCaption">
    </caption>
    <thead v-if="hcHeadings" class="table__head">
      <tr class="table__row">
        <th v-for="heading, columnIndex in hcHeadings" class="table__cell" scope="col" :key="heading" v-on:click="sortColumn(columnIndex)">
          <span v-if="heading.label && !heading.hideLabel" v-text="heading.label"></span>
          <hc-icon v-if="heading.sortable" class="icon"
            :class="{ 'icon--down': !heading.sortedReverse, 'icon--up': heading.sortedReverse }"
            :href="heading.sortedReverse ? 'hc(arrow-up)' : 'hc(arrow-down)'"></hc-icon>
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="row, rowIndex in hcData" :row-index="rowIndex" class="table__row" data-table-row="" :ey="row" v-on:click="toggleSelected">
        <td v-for="cell, colIndex in row" class="table__cell">
          <span class="table__cell-label" :column-index="colIndex" v-text="`${hcHeadings[colIndex].label}:`"></span>
          <span v-html="cell"></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import hcIcon from '../hc-icon/hc-icon';

  export default {
    name: 'hc-table',

    components: {
      'hc-icon': hcIcon,
    },

    methods: {
      toggleSelected(ev) {
        let el = ev.target;
        while (el && !el.classList.contains('table__row')) {
          el = el.parentNode;
        }
        if (el) {
          el.classList.toggle('is-selected');
        }
      },
      sortColumn(columnIndex) {
        this.$emit('sortColumn', columnIndex);
      },
    },

    props: {
      hcCaption: String,
      hcHeadings: Array,
      hcData: Array,
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/tables/tables';
</style>
