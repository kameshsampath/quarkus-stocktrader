<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Dropdown samples</h2>
      <div class="box box--2">
        <hc-dropdown
          hc-placeholder="Select an option...">
          <hc-dropdown-item value="one"><div>
            <span>One</span><hc-icon class="small-icon" href="hc(warn)"></hc-icon>
          </div></hc-dropdown-item>
          <hc-dropdown-item value="two">Two</hc-dropdown-item>
          <hc-dropdown-item value="three">Three</hc-dropdown-item>
          <hc-dropdown-item value="four">Four</hc-dropdown-item>
          <hc-dropdown-item value="five">Five</hc-dropdown-item>
          <hc-dropdown-item value="six">Six</hc-dropdown-item>
          <hc-dropdown-item value="seven">Seven</hc-dropdown-item>
          <hc-dropdown-item value="eight">Eight</hc-dropdown-item>
          <hc-dropdown-item value="nine" :hc-selected="true">Nine</hc-dropdown-item>
          <hc-dropdown-item value="ten">Ten</hc-dropdown-item>
          <hc-dropdown-item value="eleven">Eleven</hc-dropdown-item>
        </hc-dropdown>
      </div>
      <div class="box box--2">
      </div>
      <div class="box box--2">
        <hc-dropdown
          hc-placeholder="Select an option..."
          hc-status="error" hc-message="This field contains illegal character">
          <hc-dropdown-item value="one"><div>
            <span>One</span><hc-icon class="small-icon" href="hc(warn)"></hc-icon>
          </div></hc-dropdown-item>
          <hc-dropdown-item value="two">Two</hc-dropdown-item>
          <hc-dropdown-item value="three">Three</hc-dropdown-item>
          <hc-dropdown-item value="four">Four</hc-dropdown-item>
          <hc-dropdown-item value="five">Five</hc-dropdown-item>
          <hc-dropdown-item value="six">Six</hc-dropdown-item>
          <hc-dropdown-item value="seven">Seven</hc-dropdown-item>
          <hc-dropdown-item value="eight">Eight</hc-dropdown-item>
          <hc-dropdown-item value="nine">Nine</hc-dropdown-item>
          <hc-dropdown-item value="ten">Ten</hc-dropdown-item>
          <hc-dropdown-item value="eleven">Eleven</hc-dropdown-item>
        </hc-dropdown>
      </div>

      <div class="box box--2">
      </div>
      <div class="box box--2">
        <hc-dropdown hc-placeholder="Pick one...">
          <hc-dropdown-item v-for="dd in secondDD" :key="dd" value="dd.value" v-text="dd.label" :hc-selected="dd.selected">

          </hc-dropdown-item>
        </hc-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import hcIcon from '../components/hc-icon/hc-icon';
  import hcDropdown from '../components/hc-dropdown/hc-dropdown';
  import hcDropdownItem from '../components/hc-dropdown/hc-dropdown-item';

  export default {
    name: 'hc-dropdown-samples',
    components: {
      'hc-dropdown': hcDropdown,
      'hc-dropdown-item': hcDropdownItem,
      'hc-icon': hcIcon,
    },
    data() {
      return {
        secondDD: [{
          value: 'one',
          label: '-one-'
        }, {
          value: 'two',
          label: '-two-'
        }, {
          value: 'three',
          label: '-three-'
        }, {
          value: 'four',
          label: '-four-'
        }, {
          value: 'five',
          label: '-five-',
          selected: true
        }, {
          value: 'six',
          label: '-six-'
        }, {
          value: 'seven',
          label: '-seven-'
        }, {
          value: 'eight',
          label: '-eight-'
        }, {
          value: 'nine',
          label: '-nine-'
        }, {
          value: 'ten',
          label: '-ten-'
        }, {
          value: 'eleven',
          label: '-eleven-'
        }]
      };
    }
  };
</script>

<style type="scss">
  .small-icon {
    width: 14px;
    height: 14px;
    margin-left: 20px;
  }
</style>
