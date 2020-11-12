<!--
  Cirrus style pagination-step.
  Content: Transclude

  Attributes:
    href - optional - null equates to disabled
    disabled - optional - prevents use of the step
    hc-current - optional is the current step
    hc-label - optional

  Events:
    click: $event
-->

<template>
  <div class="hc-pagination__step pagination__step" :class="{ 'is-current': isCurrent }">
    <a class="step__number" :href="targetHref" @click="onclick">{{index}}</a>
    <span v-if="hcLabel" class="step__label">{{hcLabel}}</span>
  </div>
</template>

<script>
  export default {
    name: 'hc-pagination-step',
    props: {
      disabled: { type: Boolean, requried: false },
      href: { type: String, required: false },
      hcLabel: { type: String, required: false },
      hcCurrent: { type: Boolean, requried: false },
    },
    data() {
      return {
        index: -1,
        isCurrent: false,
      };
    },
    computed: {
      targetHref() {
        if (this.disabled || !this.href || this.isCurrent) {
          // not clickable
          return null;
        } else {
          return this.href;
        }
      }
    },
    methods: {
      onclick(ev) {
        this.$emit('step', this);
      }
    },
    mounted() {
      this.isCurrent = this.hcCurrent;
    },
  };
</script>
<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/pagination/pagination';
</style>
