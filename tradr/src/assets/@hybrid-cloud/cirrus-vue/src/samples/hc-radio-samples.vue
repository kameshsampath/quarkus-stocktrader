<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Radio Buttons</h2>
      <div class="box box--2">
        <hc-radio v-model="r1" name="radiogroup">
          <slot>Radio</slot>
        </hc-radio>
      </div>
      <div class="box box--2">
        <hc-radio :checked="r2" v-model="r2" name="radiogroup">
          <slot>Radio</slot>
        </hc-radio>
      </div>
      <div class="box box--2">
        <hc-radio disabled v-model="r3" name="radiogroup">
          <slot>Radio</slot>
        </hc-radio>
      </div>
    </div>
  </div>
</template>

<script>
  import hcRadio from '../components/hc-radio/hc-radio';

  export default {
    name: 'hc-radio-samples',
    components: {
      'hc-radio': hcRadio,
    },
    data() {
      return {
        r1: false,
        r2: true,
        r3: false
      };
    },
  };
</script>
