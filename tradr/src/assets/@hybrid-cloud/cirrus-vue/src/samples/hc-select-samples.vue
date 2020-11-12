<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Select Field</h2>
      <div class="box box--2">
        <hc-select v-model="selected1" label="Select Car">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </hc-select>
      </div>
      <div class="box box--2">
        <hc-select v-model="selected2" label="Select Car">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </hc-select>
      </div>
      <div class="box box--2">
        <hc-select v-model="selected3" label="Select Car" hc-status="error" hc-message="This is a required field">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </hc-select>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import hcSelect from '../components/hc-select/hc-select';

  export default {
    name: 'hc-select-samples',
    components: {
      'hc-select': hcSelect
    },
    data() {
      return {
        selected1: '',
        selected2: '',
        selected3: ''
      };
    },
  };
</script>
