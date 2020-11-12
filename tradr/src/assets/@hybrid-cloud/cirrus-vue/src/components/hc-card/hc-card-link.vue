<template>
  <a class="card__link" :href="hcHref"><slot></slot></a>
</template>
<script>
export default {
  name: 'hc-card-link',

  props: {
    hcHref: {
      type: {
        String,
        default: ''
      }
    }
  }
};
</script>
