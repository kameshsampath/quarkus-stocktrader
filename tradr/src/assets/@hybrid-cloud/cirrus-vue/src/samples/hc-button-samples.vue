<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Buttons</h2>
      <div class="box box--full">
        <h5 class="h5">Primary buttons</h5>
        <hc-button
          hc-style="primary">
            <slot>Button</slot>
        </hc-button>
        <hc-button
          hc-style="primary"
          :disabled="true">
            <slot>Button</slot>
        </hc-button>
        <hc-button
          hc-style="primary"
          hc-icon-href="hc(warn)">
            <slot>Button with icon</slot>
        </hc-button>
      </div>
    </div>
    <div class="row u-push-top--large">
      <div class="box box--full">
        <h5 class="h5">Secondary buttons</h5>
        <hc-button
          hc-style="secondary">
            <slot>Button</slot>
        </hc-button>
        <hc-button
          hc-style="secondary"
          :disabled="true">
            <slot>Button</slot>
        </hc-button>
        <hc-button
          hc-style="secondary"
          hc-icon-href="hc(warn)">
            <slot>Icon Button</slot>
        </hc-button>
      </div>
    </div>
    <div class="row u-push-top--large">
      <div class="box box--full">
        <h5 class="h5">Flat buttons</h5>
        <hc-button
          hc-style="flat">
            <slot>Button</slot>
        </hc-button>
        <hc-button
          hc-style="flat"
          :disabled="true">
            <slot>Button</slot>
        </hc-button>
        <hc-button
          hc-style="flat"
          hc-icon-href="hc(warn)">
            <slot>Flat button with icon</slot>
        </hc-button>
      </div>
    </div>
  </div>
</template>

<script>
  import hcButton from '../components/hc-button/hc-button';

  export default {
    name: 'hc-button-samples',
    components: {
      'hc-button': hcButton,
    },
  };
</script>
