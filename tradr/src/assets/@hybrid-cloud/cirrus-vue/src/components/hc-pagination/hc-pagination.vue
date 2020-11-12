<!--
  Cirrus style pagination.
  Content: Transcluded

  Attributes:

  Events:
-->

<template>
  <div class="hc-pagination pagination" :class="{
      'with-labels': stepHasLabel
    }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'hc-pagination',
    data() {
      return {
        steps: [],
        stepIndex: 0,
        stepHasLabel: false,
      };
    },
    methods: {
      updateCurrentStep(stepIndex) {
        this.stepIndex = stepIndex;

        for (let i = 0; i < this.steps.length; i++) {
          this.steps[i].isCurrent = (this.steps[i].index === this.stepIndex);
        }
      },
      onStep(step) {
        this.updateCurrentStep(step.index);
      },
    },
    mounted() {
      let stepIndex = 1; // default to 1 - first step
      let step;
      let stepCount = 0;

      for (let i = 0; i < this.$slots.default.length; i++) {
        let el = this.$slots.default[i];

        if (undefined !== el.componentInstance && el.componentInstance.$options.name === 'hc-pagination-step') {
          stepCount++;
          step = el.componentInstance;
          step.index = stepCount;
          this.steps.push(step);

          this.stepHasLabel = this.stepHasLabel && step.hcLabel;

          // listen to pagination-step events
          step.$on('step', this.onStep);

          // set current
          if (step.isCurrent) {
            stepIndex = stepCount;
          }
        } else {
          if (el.componentInstance) {
            console.log(`Unexpected element of type '${el.componentInstance.$options.name}' found as child of hc-pagination. Only hc-pagination-step are permitted`);
          } else {
            // probably VNode.elm.nodeType = 3; e.g. text spacing between nodes
            if (!(el.elm && el.elm.nodeType === 3 && el.elm.nodeValue.trim().length === 0)) {
              console.log('Unexpected element found as child of hc-pagination. Only hc-pagination-step. are permitted');
            }
          }
        }
      }

      this.updateCurrentStep(stepIndex);
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/pagination/pagination';
</style>
