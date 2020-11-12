<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Alerts</h2>
      <div class="box box--full">
        <hc-button hc-style="primary" class="js-modal" data-modal-target="Information">Information</hc-button>
        <hc-button hc-style="primary" class="js-modal" data-modal-target="Normal">Normal</hc-button>
        <hc-button hc-style="primary" class="js-modal" data-modal-target="Warning">Warning</hc-button>
        <hc-button hc-style="primary" class="js-modal" data-modal-target="Escalated">Escalated</hc-button>
        <hc-button hc-style="primary" class="js-modal" data-modal-target="Critical">Critical</hc-button>
        <hc-button hc-style="primary" class="js-modal" data-modal-target="Toaster">Toaster Alert</hc-button>
        <hc-alert
          hc-name="Information"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-alert>
        <hc-alert
          hc-name="Normal"
          hc-level="Normal"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-alert>
        <hc-alert
          hc-name="Warning"
          hc-level="warning"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-alert>
        <hc-alert
          hc-name="Escalated"
          hc-level="Escalated"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-alert>
        <hc-alert
          hc-name="Critical"
          hc-level="critical"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-alert>
        <hc-alert
          hc-name="Toaster"
          :hc-toaster="true"
          hc-level="critical"
          hc-title="Create a Service">
            You have exceeded your organization's services limit. Please upgrade services before continuing.
        </hc-alert>
      </div>
    </div>
  </div>
</template>

<script>
  import hcButton from '../components/hc-button/hc-button';
  import hcAlert from '../components/hc-alert/hc-alert';

  export default {
    name: 'hc-alert-samples',
    components: {
      'hc-button': hcButton,
      'hc-alert': hcAlert
    },
    data() {
      return {
      };
    },
  };
</script>
