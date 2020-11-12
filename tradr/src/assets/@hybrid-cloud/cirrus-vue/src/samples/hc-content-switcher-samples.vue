<template>
<div>
  <div class="row u-push-top--large">
    <h2 class="box box--full h2">Content Switcher</h2>
    <div class="box box--full">
      <hc-content-switcher @change="notify" v-model="selectedItem" :items="items" hc-name="contentgroup">
      </hc-content-switcher>
      <p>
        Selected: {{ selectedItem.label }}
      </p>
    </div>
    <div class="box box--full row u-push-top--large">
      <hc-content-switcher :items="[{
        label: 'Option 3'
      }, {
        label: 'Option 4'
      }, {
        label: 'Option 5'
      }]">
    </hc-content-switcher>
    </div>
  </div>
</div>
</template>

<script>
import hcContentSwitcher from '../components/hc-content-switcher/hc-content-switcher';

export default {
  name: 'hc-content-switcher-samples',
  components: {
    'hc-content-switcher': hcContentSwitcher
  },
  methods: {
    notify() {
    }
  },
  data() {
    return {
      selectedItem: {},
      items: [{
        label: 'Option 1',
        value: 'opt1',
        selected: true,
        otherP: 'ddd'
      }, {
        label: 'Option 2',
        value: 'opt2'
      }, {
        label: 'Option 3',
        value: 'opt3'
      }]
    };
  },
};
</script>
