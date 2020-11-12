<!--
  Cirrus style button.
  Content: Transcluded

  Attributes:
    hc-small - scaled to .6 of the standard size
    hc-flat - single color only
    hc-color-a - start color default #478de4
    hc-color-b - second color in linear gradient defaults to #9855d4
-->

<template>
  <svg class="progress-spinner" xmlns="http://www.w3.org/2000/svg" version="1.1"
    :class="{
      'progress-spinner--small': hcSmall
      }">
    <defs>
      <linearGradient :id="hcId">
        <stop :stop-color="hcColorStart" offset="0%"></stop>
        <stop :stop-color="hcColorEnd" offset="100%"></stop>
      </linearGradient>
    </defs>
    <circle class="progress-spinner__circle" cx="40" cy="40" r="30"
      :stroke="`url(#${this.hcId})`">
    </circle>
  </svg>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-progress',
    mixins: [hcIds],
    props: {
      hcSmall: { type: Boolean, required: false },
      hcFlat: { type: Boolean, required: false },
      hcColorA: { type: String, required: false },
      hcColorB: { type: String, required: false }
    },
    computed: {
      hcColorStart() {
        let color = '#478de4';
        if (this.hcColorA) {
          color = this.hcColorA;
        }
        return color;
      },
      hcColorEnd() {
        let color = '#9855d4';

        if (!this.hcFlat) {
          if (this.hcColorB) {
            color = this.hcColorB;
          }
        } else {
          color = this.hcColorStart;
        }
        return color;
      },
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/progress/progress-spinner';
</style>
