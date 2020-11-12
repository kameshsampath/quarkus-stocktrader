//
// Cirrus global header
// Content: Transcluded
//
// Attributes:
//  hcTitle
//  hcTitleHref
<template>
  <header class="hc-global-header global-header" :class="{'is-open': openNavMenu }" role="banner">
    <button class="global-header__nav-button" @click="toggleOpenNav" role="button">
      <span class="nav-button__icon icon--top"></span>
      <span class="nav-button__icon icon--bottom"></span>
    </button>

    <div class="global-header__title">
      <a class="global-header__title-main" :href="hcTitleHref">
        <slot name="header-title"></slot>
      </a>
      <span class="global-header__title-extra">
        <slot name="header-title-extra"></slot>
      </span>
    </div>

    <button class="global-header__overflow-button" role="button" @click="toggleOpenOverflow">
      <hc-icon :href="`hc(menu-overflow)`" class="icon icon--overflow"></hc-icon>
    </button>

    <ul class="header-list" :class="{'is-open': openOverflowMenu }">
      <slot name="header-links"></slot>
    </ul>

    <nav class="global-header__nav" role="navigation">
      <ul class="nav-list">
        <slot name="header-nav-links"></slot>
      </ul>
    </nav>
  </header>
</template>

<script>
  import hcIcon from '../hc-icon/hc-icon';
  import hcGlobalHeaderItem from './hc-global-header-item';
  import hcGlobalHeaderNavItem from './hc-global-header-nav-item';
  import hcFocusContained from '../../mixins/hc-focus-contained';

  export default {
    name: 'hc-global-header',
    mixins: [hcFocusContained],
    components: {
      'hc-icon': hcIcon,
      'hc-global-header-item': hcGlobalHeaderItem,
      'hc-global-header-nav-item': hcGlobalHeaderNavItem,
    },
    data() {
      return {
        openNav: Boolean,
        openOverflow: Boolean,
      };
    },
    created() {
      this.openNav = false;
      this.openOverflow = false;
    },
    props: {
      hcTitleHref: {type: String, default: ''},
    },
    computed: {
      openNavMenu() {
        this.openNav = this.openNav && this.focusContained;
        return this.openNav;
      },
      openOverflowMenu() {
        this.openOverflow = this.openOverflow && this.focusContained;
        return this.openOverflow;
      },
    },
    methods: {
      toggleOpenNav() {
        this.openNav = !this.openNav;
        if (this.openNav) {
          this.openOverflow = false;
        }
      },
      toggleOpenOverflow() {
        this.openOverflow = !this.openOverflow;
        if (this.openOverflow) {
          this.openNav = false;
        }
      },
    }
  };
</script>

<style lang="scss">
@import '../../globals/scss/cirrus-globals';
@import '~@hybrid-cloud/cirrus/src/scss/components/global-header/global-header';

$global-header-nav-width: 330px;
$global-header-nav-transition-speed: .3s;

.global-header {
  // keep on top of other windows
  position: relative;
  z-index: 999;

  .global-header__title-main {
    color: color('white');
  }

  .global-header__title-extra {
    margin-left: 10px;
  }
}

.global-header__nav {
  @include size(100%, calc(100% - #{$global-header-height}));
  @include translate(-100%);

  position: fixed;
  top: $global-header-height-mobile;
  left: 0;
  padding: 20px 0;
  transition: all $global-header-nav-transition-speed ease-in-out;
  background-color: $navy-gray-20;

  @include media(small-tablet) {
    top: $global-header-height;
    width: $global-header-nav-width;
    @include translate(-$global-header-nav-width);
  }

  .is-open & {
    @include translate(0);
  }
}
</style>
