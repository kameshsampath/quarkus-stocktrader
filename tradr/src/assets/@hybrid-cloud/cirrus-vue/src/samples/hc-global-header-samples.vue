<template>
  <hc-global-header hcTitleHref="..">
    <template slot="header-title">
      IBM Hybrid Cloud
    </template>
    <template slot="header-title-extra">
      Dashboard
    </template>
    <template slot="header-links">
      <hc-global-header-item hc-href="">
        <hc-icon href="hc(user)"></hc-icon> User Name
      </hc-global-header-item>
      <hc-global-header-item hc-href="">
        <hc-icon href="hc(manage)"></hc-icon> Settings
      </hc-global-header-item>
      <hc-global-header-item hc-href="">
        <hc-icon href="hc(help)"></hc-icon> Help
      </hc-global-header-item>
    </template>
    <template slot="header-nav-links">
      <hc-global-header-nav-item hc-href="">
        <hc-icon class="icon icon--caret" href="hc(caret)"></hc-icon>
        Health Dashboard
      </hc-global-header-nav-item>
      <hc-global-header-nav-item hc-href="">
        <hc-icon class="icon icon--caret" href="hc(caret)"></hc-icon>
        Applications
      </hc-global-header-nav-item>
      <hc-global-header-nav-item hc-href="">
        <hc-icon class="icon icon--caret" href="hc(caret)"></hc-icon>
        Virtual Machines
      </hc-global-header-nav-item>
      <hc-global-header-nav-item hc-href="">
        <hc-icon class="icon icon--caret" href="hc(caret)"></hc-icon>
        Logs
      </hc-global-header-nav-item>
    </template>
  </hc-global-header>
</template>

<script>
  import hcIcon from '../components/hc-icon/hc-icon';
  import hcGlobalHeader from '../components/hc-global-header/hc-global-header';
  import hcGlobalHeaderItem from '../components/hc-global-header/hc-global-header-item';
  import hcGlobalHeaderNavItem from '../components/hc-global-header/hc-global-header-nav-item';

  export default {
    name: 'hc-global-header-samples',
    components: {
      'hc-global-header': hcGlobalHeader,
      'hc-global-header-item': hcGlobalHeaderItem,
      'hc-global-header-nav-item': hcGlobalHeaderNavItem,
      'hc-icon': hcIcon,
    },
  };
</script>

<style type="scss">
</style>
