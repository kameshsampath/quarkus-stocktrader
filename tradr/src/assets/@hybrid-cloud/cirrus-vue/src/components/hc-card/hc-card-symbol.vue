<template>
  <div class="card__symbol">
    <hc-icon :href="hcIconHref" :class="hcIconClass"></hc-icon>
  </div>
</template>
<script>
  import hcIcon from '../hc-icon/hc-icon';

  export default {
    name: 'hc-card-symbol',

    props: {
      hcIconHref: { type: String, required: true },
      hcIconClass: { String, default: 'icon--card-symbol' }
    },

    components: {
      'hc-icon': hcIcon
    }
  };
</script>
