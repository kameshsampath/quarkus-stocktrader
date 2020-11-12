<!--
  Cirrus style overflow.
  Content: Transcluded

  Attributes:
    hc-overflow-title: Message displayed of no option is selected

  Events:
    none
-->

<template>
  <div class="hc-overflow overflow"
    role="navigation"
    >
    <button class="overflow__button" :class="{ 'is-open': openOverflow }"
      type="button"
      role="menu"
      aria-haspopup="true"
      :aria-expanded="open"
      :id="hcId"
      @click="toggleOpen"
      title="hcOverflowTitle"
      >
      <hc-icon class="icon--overflow" href="hc(menu-overflow-vertical)"></hc-icon>
    </button>
    <transition name="overflow__list">
      <ul class="list list-overflow" ref="list" role="menubar" :aria-labelledby="hcId">
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';
  import hcFocusContained from '../../mixins/hc-focus-contained';
  import hcIcon from '../hc-icon/hc-icon';
  import hcoverflowItem from './hc-overflow-item';

  export default {
    name: 'hc-overflow',
    props: {
      id: String,
      hcOverflowTitle: String,
    },
    mixins: [hcIds, hcFocusContained],
    data() {
      return {
        open: Boolean,
      };
    },
    created() {
      this.open = false;
    },
    methods: {
      toggleOpen() {
        this.open = !this.open;
      },
      removeOpen() {
        this.open = false;
      },
    },
    computed: {
      openOverflow() {
        this.open = this.open && this.focusContained;
        return this.open;
      }
    },
    mounted() {
      this.$slots.default.forEach((el) => {
        if (undefined !== el.componentInstance &&
          el.componentInstance.$options.name === 'hc-overflow-item') {
          // listen to dropdown-item events
          el.componentInstance.$on('click', this.removeOpen);
        }
      });
    },
    components: {
      'hc-icon': hcIcon,
      'hc-overflow-item': hcoverflowItem,
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/overflow/overflow';

  .overflow__items-enter-active {
    // transition: all .3s ease;
  }

  .overflow__items-leave-active {
    // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .overflow__items-enter,
  .overflow__items-leave-to {
    // transform: translateY(-20px);
    // opacity: 0;
  }
</style>
