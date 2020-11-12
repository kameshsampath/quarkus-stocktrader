<!--
  Cirrus style module.
  Content: Transcluded

  Attributes:

  Events:

-->
<template>
  <div class="hc-module module">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'hc-module'
  };
</script>
<style lang='scss'>
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/modules/modules';
</style>
