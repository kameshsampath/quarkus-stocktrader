<template>
  <hc-heading :hc-rank="hcRank" :hc-style-level="hcStyleLevel" class="card__heading"><slot></slot></hc-heading>
</template>
<script>
  import hcHeading from '../hc-heading/hc-heading';

  export default {
    name: 'hc-card-title',

    props: {
      hcRank: {
        type: String,
        default: '4'
      },
      hcStyleLevel: {
        type: String,
        default: '4'
      }
    },

    components: {
      'hc-heading': hcHeading
    }
  };
</script>
