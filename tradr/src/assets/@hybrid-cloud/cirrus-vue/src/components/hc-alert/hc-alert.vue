<!--
  Cirrus style alert dialog.
  Content: Transcluded

  Attributes:
    hc-name: the name is used as the identifier when launching from a button with attribute data-modal-target
    hc-title: the title for the alert dialog
    hc-level: the severity level of the alert. It can be information|normal|warning|escalated|critical. Defaulted to information
    hc-toaster (Boolean, false): show the alert as toaster if the value is true
-->
<template>
  <div :class="alertClass" :data-modal="hcName" :hc-level="hcLevel" role="alertdialog" :aria-labelledby="`alert-title-${hcId}`" :aria-describedby="`alert-desc-${hcId}`">
      <div v-if="!hcToaster" class="overlay js-close-modal"></div>
      <div class="modal-card" :class="alertLevelClass">
        <button class="modal-card__close js-close-modal">
          <hc-icon href="hc(close-modal)" class="icon--close-modal"></hc-icon>
        </button>
        <h2 v-if="!hcToaster" :id="`alert-title-${hcId}`" class="h2 modal-card__heading">
          <hc-icon :href="`hc(${iconHref})`" class="modal-card__icon"></hc-icon>
          {{ hcTitle }}
        </h2>
        <h5 v-if="hcToaster" :id="`alert-title-${hcId}`" class="h5 modal-card__heading">
          <hc-icon :href="`hc(${iconHref})`" class="modal-card__icon"></hc-icon>
          {{ hcTitle }}
        </h5>
        <p :id="`alert-desc-${hcId}`" class="modal-card__content"><slot></slot></p>
        <hc-button v-if="!hcToaster" hcStyle="primary" class="js-modal-focus js-close-modal">Ok</hc-button>
      </div>
    </div>
</template>
<script>
  import hcIds from '../../mixins/hc-ids';
  import hcButton from '../hc-button/hc-button';

  const alertLevelIconMap = {
    information: 'get-information',
    normal: 'confirm',
    warning: 'warn',
    escalated: 'warn',
    critical: 'warn'
  };

  export default {
    name: 'hc-alert',

    mixins: [hcIds],

    components: {
      hcButton,
    },

    props: {
      hcName: {
        type: String,
        required: true,
      },
      hcTitle: {
        type: String,
        required: true
      },
      hcLevel: {
        type: String,
        default: 'information'
      },
      hcToaster: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    computed: {
      alertClass() {
        return {
          'toaster-modal': this.hcToaster,
          modal: !this.hcToaster
        };
      },
      hcLevelInLowerCase() {
        return this.hcLevel.toLowerCase();
      },
      alertLevelClass() {
        return `alert--${this.hcLevelInLowerCase}`;
      },
      iconHref() {
        return alertLevelIconMap[this.hcLevelInLowerCase];
      },
    }
  };
</script>
<style lang='scss'>
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/overlay/overlay';
  @import '~@hybrid-cloud/cirrus/src/scss/components/modal/toaster-modal';
  @import '~@hybrid-cloud/cirrus/src/scss/components/alert/alert';
  @import '~@hybrid-cloud/cirrus/src/scss/components/modal/modal';
</style>
