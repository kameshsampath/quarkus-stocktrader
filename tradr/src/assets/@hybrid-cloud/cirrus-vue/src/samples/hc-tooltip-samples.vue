<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Tooltips</h2>
      <div class="box box--full">
        <hc-tooltip hc-tooltip="I am a default tooltip message">Default Tooltip</hc-tooltip>,
        <hc-tooltip hc-position="top" hc-tooltip="I am a top tooltip message">Top Tooltip</hc-tooltip>,
        <hc-tooltip hc-position="right" hc-tooltip="I am a right tooltip message">Right Tooltip</hc-tooltip>,
        <hc-tooltip hc-position="bottom" hc-tooltip="I am a bottom tooltip message">Bottom Tooltip</hc-tooltip>,
        <hc-tooltip hc-position="left" hc-tooltip="I am a left tooltip message">Left Tooltip</hc-tooltip>.
      </div>
    </div>
  </div>
</template>

<script>
  import hcTooltip from '../components/hc-tooltip/hc-tooltip';

  export default {
    name: 'hc-tooltip-samples',
    components: {
      'hc-tooltip': hcTooltip,
    },
  };
</script>
