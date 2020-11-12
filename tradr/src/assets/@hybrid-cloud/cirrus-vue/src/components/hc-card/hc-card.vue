<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'hc-card'
  };
</script>
<style lang='scss'>
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/cards/cards';
</style>
