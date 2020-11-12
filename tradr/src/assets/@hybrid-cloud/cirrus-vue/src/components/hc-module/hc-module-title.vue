<template>
  <hc-heading :hc-rank="hcRank" :hc-style-level="hcStyleLevel" class="hc-module__header module__header"><slot></slot></hc-heading>
</template>
<script>
  import hcHeading from '../hc-heading/hc-heading';

  export default {
    name: 'hc-module-title',

    props: {
      hcRank: {
        type: String,
        default: '6'
      },
      hcStyleLevel: {
        type: String,
        default: '5'
      }
    },

    components: {
      'hc-heading': hcHeading
    }
  };
</script>
