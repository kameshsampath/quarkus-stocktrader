<!--
  Cirrus style header.
  Content: Transcluded

  Attributes:
    hc-icon-href: 'href://.../icon.svg#icon', '#icon', 'hc(arrow-left)'
    hc-breadcrumb-text: text displayed
    hc-breadcrumb-link: url to previous breadcrumb location
    hc-title: title to be displayed for the header
    hc-applink: url to external application
    hc-with-tabs: true | false
-->

<template>
  <header :class="['hc-page-header detail-page-header', {
                   'detail-page-header--minimal' : !hcWithTabs,
                   'detail-page-header--expanded' : hcWithTabs,
          }]">
    <a class="detail-page-header__link" :href="hcBreadcrumbLink">
      <hc-icon :href="hcIconHref" class="icon--arrow-left"></hc-icon>
      <span v-if="!hcWithTabs" class="detail-page-header__link-text">Back</span>
      <span v-if="hcWithTabs" class="detail-page-header__breadcrumb">{{ hcBreadcrumbText }}</span>

    </a>
    <h2 class="h2 detail-page-header__heading"> {{ hcTitle }} </h2>
    <a v-if="hcWithTabs" class="detail-page-header__app-link" :href="'#' + hcApplink"> {{ hcApplink }}</a>
    <div  v-if="hcWithTabs" class="box box--full">
        <slot></slot>
    </div>
  </header>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';
  import hcIcon from '../hc-icon/hc-icon';
  import hcTabs from '../hc-tabs/hc-tabs';
  import hcTabsPanel from '../hc-tabs/hc-tabs-panel';

  export default {
    name: 'hc-page-header',

    components: {
      'hc-icon': hcIcon,
      'hc-tabs': hcTabs,
      'hc-tabs-panel': hcTabsPanel
    },

    mixins: [hcIds],

    props: {
      hcIconHref: { type: String, required: false, default: 'hc(arrow-left)' },
      hcBreadcrumbText: { type: String, required: false, default: 'Back' },
      hcBreadcrumbLink: { type: String, required: false, default: '' },
      hcTitle: { type: String, required: true, default: 'Application Title' },
      hcApplink: { type: String, required: false, default: 'homesteadapp.mybluemix.net' },
      hcWithTabs: { type: Boolean, required: false, default: false },
    },

  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/detail-page-header/detail-page-header';
</style>
