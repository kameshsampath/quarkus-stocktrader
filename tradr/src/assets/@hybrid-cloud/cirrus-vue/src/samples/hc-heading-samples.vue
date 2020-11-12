<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full"><table>

      </table>headings</h2>
      <div class="box box--full">
        <hc-heading hc-rank="0" hc-style-level="">Rank 0 -- fails validator</hc-heading>
        <hc-heading hc-rank="1" hc-style-level="">Rank 1</hc-heading>
        <hc-heading hc-rank="2" hc-style-level="">Rank 2</hc-heading>
        <hc-heading hc-rank="6.1" hc-style-level="">Rank 6.1 -- fails validator</hc-heading>
        <hc-heading hc-rank="7" hc-style-level="">Rank 7 -- fails validator</hc-heading>
        <hc-heading hc-rank="3" hc-style-level="1">Rank 3 - level 1</hc-heading>
        <hc-heading hc-rank="3" hc-style-level="2">Rank 3 - level 2</hc-heading>
        <hc-heading hc-rank="3" hc-style-level="5">Rank 3 - level 5</hc-heading>
        <hc-heading hc-rank="4" hc-style-level="6">Rank 4 -level 6</hc-heading>
        <hc-heading hc-rank="3" hc-style-level="0">Rank 3 - level 0 -- fails validator</hc-heading>
        <hc-heading hc-rank="3" hc-style-level="1.8">Rank 3 - level 1.8 -- fails validator</hc-heading>
        <hc-heading hc-rank="4" hc-style-level="7">Rank 4 -level 7 -- fails validator</hc-heading>
        <hc-heading hc-rank="4" hc-style-level="5.0">Rank 4 -level 5.0 -- fails validator</hc-heading>
      </div>
    </div>
  </div>
</template>

<script>
  import hcHeadings from '../components/hc-heading/hc-heading';

  export default {
    name: 'hc-heading-samples',
    components: {
      'hc-heading': hcHeadings,
    },
  };
</script>

<style lang="scss">
  @import '../globals/scss/cirrus-globals';
</style>
