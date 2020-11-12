<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Checkboxes</h2>
      <div class="box box--2">
        <hc-checkbox v-model="c1">
          <slot>Checkbox</slot>
        </hc-checkbox>
      </div>
      <div class="box box--2">
        <hc-checkbox :checked="c2" v-model="c2">
          <slot>Checkbox</slot>
        </hc-checkbox>
      </div>
      <div class="box box--2">
        <hc-checkbox disabled v-model="c3">
          <slot>Checkbox</slot>
        </hc-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  import hcCheckbox from '../components/hc-checkbox/hc-checkbox';

  export default {
    name: 'hc-checkbox-samples',
    components: {
      'hc-checkbox': hcCheckbox,
    },
    data() {
      return {
        c1: false,
        c2: true,
        c3: false
      };
    },
  };
</script>
