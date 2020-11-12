<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Overflow samples</h2>
      <div class="box box--2">
      </div>
      <div class="box box--2">
        <hc-overflow class="overflow-sample"
          hc-placeholder="Select an option...">
          <hc-overflow-item>One</hc-overflow-item>
          <hc-overflow-item>Two</hc-overflow-item>
          <hc-overflow-item>Three</hc-overflow-item>
          <hc-overflow-item>Four</hc-overflow-item>
        </hc-overflow>
      </div>
    </div>
  </div>
</template>

<script>
  import hcOverflow from '../components/hc-overflow/hc-overflow';
  import hcOverflowItem from '../components/hc-overflow/hc-overflow-item';

  export default {
    name: 'hc-overflow-samples',
    components: {
      'hc-overflow': hcOverflow,
      'hc-overflow-item': hcOverflowItem
    },
  };
</script>

<style type="scss">
  .overflow-sample {
    /*height: 32px;
    width: 32px;*/
  }
</style>
