<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Pagination</h2>
      <hc-pagination>
        <hc-pagination-step href="#a" @step="step"></hc-pagination-step>
        <hc-pagination-step href="#b" @step="step"></hc-pagination-step>
        <hc-pagination-step href="#c" @step="step"></hc-pagination-step>
      </hc-pagination>
    </div>

    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Pagination with labels</h2>
      <hc-pagination>
        <hc-pagination-step href="#a" @step="step" :disabled="true" hc-label="Add items"></hc-pagination-step>
        <hc-pagination-step href="#b" @step="step" hc-label="Review" :hcCurrent="true"></hc-pagination-step>
        <hc-pagination-step :href="null" @step="step" hc-label="Submit"></hc-pagination-step>
      </hc-pagination>
    </div>
  </div>
</template>

<script>
  import hcPagination from '../components/hc-pagination/hc-pagination';
  import hcPaginationStep from '../components/hc-pagination/hc-pagination-step';

  export default {
    name: 'hc-pagination-samples',
    components: {
      'hc-pagination': hcPagination,
      'hc-pagination-step': hcPaginationStep,
    },
    methods: {
      step(newStep) {
        console.log(newStep.index);
      },
    },
  };
</script>
