//
// Cirrus global header-list-nav-item
// Content: Transcluded
//
// Attributes:
//   href: href for button
//
<template>
  <li class="hc-global-header-nav-item nav-list__item">
    <a class="nav-list__link" :href="hcHref">
      <slot></slot>
    </a>
  </li>
</template>

<script>
  export default {
    name: 'hc-global-header-nav-item',
    props: {
      hcHref: { type: String, default: '' },
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';

  .nav-list__link {
    display: block;
    padding: 0 30px;
    color: $blue-80;
    font: {
      size: 16px;
    }
    line-height: 50px;

    &:hover {
      background-color: $navy-gray-10;
      font-weight: 700;
      box-shadow: inset 4px 0 0 $purple-60;
    }

    .icon {
      @include size(10px);
      margin-right: 3px;
      fill: $blue-80;
    }

    .icon--caret {
      @include rotate(-90deg);
    }
  }
</style>
