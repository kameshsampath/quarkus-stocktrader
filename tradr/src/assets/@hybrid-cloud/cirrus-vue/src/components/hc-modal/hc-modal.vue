<!--
  Cirrus style modal dialog.
  Content: Transcluded

  Attributes:
    hc-name: the name is used as the identifier when launching from a button with prop hcTarget
    hc-title: the title for the modal dialog

-->
<template>
  <div class="modal" :data-modal="hcName" role="dialog" :aria-labelledby="`modal-title-${hcId}`" :aria-describedby="`modal-desc-${hcId}`">
      <div class="overlay js-close-modal"></div>
      <div class="modal-card">
        <hc-button hc-style="flat" class="modal-card__close js-close-modal">
          <hc-icon href="hc(close-modal)" class="icon--close-modal"></hc-icon>
        </hc-button>
        <h4 :id="`modal-title-${hcId}`" class="h2 modal-card__heading">{{ hcTitle }}</h4>
        <p :id="`modal-desc-${hcId}`" class="modal-card__content"><slot></slot></p>
          <hc-button hcStyle="primary" class="js-modal-focus js-close-modal">Ok</hc-button>
          <hc-button class="js-close-modal" hcStyle="flat">Cancel</hc-button>
      </div>
    </div>
</template>
<script>
  import hcIds from '../../mixins/hc-ids';
  import hcButton from '../hc-button/hc-button';

  export default {
    name: 'hc-modal',

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
        required: true,
      },
    },
  };
</script>
<style lang='scss'>
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/overlay/overlay';
  @import '~@hybrid-cloud/cirrus/src/scss/components/modal/modal';
</style>
