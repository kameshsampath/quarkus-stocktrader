<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Modal Dialog</h2>
      <div class="box box--2">
        <hc-button
          hc-style="primary" class="js-modal" data-modal-target="Service Creation">
          Open Modal
        </hc-button>
        <hc-modal hcName="Service Creation"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import hcButton from '../components/hc-button/hc-button';
  import hcModal from '../components/hc-modal/hc-modal';

  export default {
    name: 'hc-modal-samples',
    components: {
      'hc-button': hcButton,
      'hc-modal': hcModal
    },
    data() {
      return {
      };
    },
  };
</script>
