<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full"><table>

      </table>Tags</h2>
      <div class="box box--full">
        <hc-tag hc-color="hc(ibm)">IBM</hc-tag>
        <hc-tag hc-color="hc(beta)">Beta</hc-tag>
        <hc-tag hc-color="hc(third-party)">Third party</hc-tag>
        <hc-tag hc-color="hc(local)">Local</hc-tag>
        <hc-tag hc-color="hc(dedicated)">Decicated</hc-tag>
        <hc-tag hc-color="hc(custom)">Custom</hc-tag>
        <hc-tag hc-color="hc(experimental)">Experimental</hc-tag>
        <hc-tag hc-color="hc(community)">Community</hc-tag>
        <hc-tag hc-color="hc(private)">Private</hc-tag>
        <hc-tag hc-color="#ff0000">#ff0000</hc-tag>
        <hc-tag hc-color="rgb(0,255,0)">rgb(0,255,0)</hc-tag>
        <hc-tag class="other-color">Set by CSS</hc-tag>
      </div>
    </div>
  </div>
</template>

<script>
  import hctags from '../components/hc-tag/hc-tag';

  export default {
    name: 'hc-tag-samples',
    components: {
      'hc-tag': hctags,
    },
  };
</script>

<style lang="scss">
  .hc-tag.other-color {
    $blue: #00f;
    color: $blue;
  }
</style>
