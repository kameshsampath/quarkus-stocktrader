<template>
  <div class="row u-push-top--large">
    <h2 class="h2 box box--full">Progress</h2>
    <div class="box box--1">
      <hc-progress></hc-progress>
    </div>
    <div class="box box--1">
      <hc-progress :hc-small="true"></hc-progress>
    </div>
    <div class="box box--1">
      <hc-progress :hc-flat="true"></hc-progress>
    </div>
    <div class="box box--1">
      <hc-progress hc-color-a="#ff0000"></hc-progress>
    </div>
    <div class="box box--1">
      <hc-progress hc-color-a="#ff0000" hc-color-b="#ffff00"></hc-progress>
    </div>
  </div>
</template>

<script>
  import hcIcon from '../components/hc-icon/hc-icon';

  export default {
    name: 'hc-progress-samples',
    components: {
      'hc-icon': hcIcon,
    },
  };
</script>
