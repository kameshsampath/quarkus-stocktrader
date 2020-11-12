//
// Cirrus global header-list-item
// Content: Transcluded
//
// Attributes:
//   hcHref: hcHref for button
//

<template>
  <li class="hc-global-header-item header-list__item">
    <a class="header-list__link" :href="hcHref">
      <slot></slot>
    </a>
  </li>
</template>

<script>
  export default {
    name: 'hc-global-header-item',
    props: {
      hcHref: { type: String, default: '' },
    },
  };
</script>
