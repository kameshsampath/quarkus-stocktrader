<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Links</h2>
      <div class="box box--full">
        <hc-link
          href="#"
          hc-style="link">
          <slot>Link</slot>
        </hc-link>
        <hc-link
          href="#"
          hc-style="primary">
            <slot>Primary Link</slot>
        </hc-link>

        <hc-link
          href="#"
          hc-style="secondary">
            <slot>Secondary Link</slot>
        </hc-link>

        <hc-link
          href="#"
          hc-style="flat">
            <slot>Flat Link</slot>
        </hc-link>
      </div>
    </div>
  </div>
</template>

<script>
  import hcLink from '../components/hc-link/hc-link';

  export default {
    name: 'hc-link-samples',
    components: {
      'hc-link': hcLink,
    },
  };
</script>
