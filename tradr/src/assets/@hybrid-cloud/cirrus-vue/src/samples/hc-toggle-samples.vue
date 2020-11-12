<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Toggles</h2>
      <div class="box box--2">
        <hc-toggle v-model="t1"></hc-toggle>
      </div>
      <div class="box box--2">
        <hc-toggle :checked="t2" v-model="t2" hc-off-label="Inactive" hc-on-label="Active"></hc-toggle>
      </div>
      <div class="box box--2">
        <hc-toggle disabled v-model="t3"></hc-toggle>
      </div>
    </div>
  </div>
</template>

<script>
  import hcToggle from '../components/hc-toggle/hc-toggle';

  export default {
    name: 'hc-toggle-samples',
    components: {
      'hc-toggle': hcToggle,
    },
    data() {
      return {
        t1: false,
        t2: true,
        t3: false
      };
    },
  };
</script>
