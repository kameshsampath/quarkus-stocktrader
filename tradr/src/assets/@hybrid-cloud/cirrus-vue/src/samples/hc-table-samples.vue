<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Table</h2>
      <div class="box box--full">
        <hc-table :hcCaption="caption" :hcHeadings="headings" :hcData="data" v-on:sortColumn="sortColumn"></hc-table>
      </div>
    </div>
  </div>
</template>

<script>
  import hcTable from '../components/hc-table/hc-table';

  export default {
    name: 'hc-table-samples',
    components: {
      'hc-table': hcTable,
    },
    methods: {
      sortColumn(colIndex) {
        // NOTE: A sample sort, not a sensible one. Columns like status and date will likely need specific sorts

        let sortFn;

        if (this.headings[colIndex].sortedReverse) {
          this.headings[colIndex].sortedReverse = false;
          sortFn = (a, b) => a[colIndex].localeCompare(b[colIndex]);
        } else {
          // may not exist, use this.$set
          this.$set(this.headings[colIndex], 'sortedReverse', true);
          sortFn = (a, b) => b[colIndex].localeCompare(a[colIndex]);
        }

        this.data.sort(sortFn);
      },
    },
    data() {
      return {
        caption: `<span class="u-text--bold">Alerts</span> Dallas`,
        headings: [
          {
            label: 'Status',
            hideLabel: false,
            sortable: true,
          }, {
            label: 'Timestamp',
            sortable: true,
          }, {
            label: 'Description',
            sortable: true,
            sortedReverse: true,
          }, {
            label: 'Action',
            hideLabel: true,
            sortable: false,
          },
        ],
        data: [
          [
            '<span class="item-status item-status--critical">Critical<span>',
            '1/20/16 | 9:05 AM',
            'This is a long description that needs to be truncated',
            '<a href="">View Breakdown</a>',
          ], [
            '<span class="item-status item-status--escalated">Escalated</span>',
            '1/20/16 | 9:05 AM',
            'url_slow_response on66',
            '<a href="">View Breakdown</a>'
          ], [
            '<span class="item-status item-status--warning">Warning</span>',
            '2/20/16 | 9:05 AM',
            'url_slow_response on36',
            '<a href="">View Breakdown</a>'
          ], [
            '<span class="item-status item-status--normal">Normal</span>',
            '3/20/16 | 9:05 AM',
            'url_slow_response on63',
            '<a href="">View Breakdown</a>'
          ], [
            '<span class="item-status item-status--critical">Critical</span>',
            '4/20/16 | 9:05 AM',
            'url_slow_response on76',
            '<a href="">View Breakdown</a>'
          ], [
            '<span class="item-status item-status--escalated">Escalated</span>',
            '5/20/16 | 9:05 AM',
            'url_slow_response on52',
            '<a href="">View Breakdown</a>'
          ], [
            '<span class="item-status item-status--warning">Warning</span>',
            '6/20/16 | 9:05 AM',
            'url_slow_response on45',
            '<a href="">View Breakdown</a>'
          ], [
            '<span class="item-status item-status--normal">Normal</span>',
            '7/20/16 | 9:05 AM',
            'url_slow_response on78',
            '<a href="">View Breakdown</a>'
          ],
        ],
      };
    },
  };
</script>
