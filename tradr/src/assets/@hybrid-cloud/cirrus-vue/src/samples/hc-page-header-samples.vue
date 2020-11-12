<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Page Header</h2>
      <div class="box box--full">
        <hc-page-header
            hc-title="Application Title">
        </hc-page-header>
      </div>
    </div>
    <div class="row u-push-top--large">
      <h3 class="box box--full h3">Page Header with Tabs</h3>
      <div class="box box--full">
        <hc-page-header
            hc-with-tabs
            hc-breadcrumb-text="Breadcrumb"
            hc-title="Application Title"
            hc-applink="homesteadapp.mybluemix.net">
            <hc-tabs>
              <hc-tabs-panel id="about-us" hc-link-label="About us" :hc-selected="true" :hc-heading="{ hcTitle: 'A title', hcRank: '4' }">
                <p>
                  Great
                </p>
              </hc-tabs-panel>
              <hc-tabs-panel id="about-you" hc-link-label="About You">
                <p>
                  Great too
                </p>
              </hc-tabs-panel>
              <hc-tabs-panel id="about-them" hc-link-label="About Them">
                <p>
                  Dodgy folk
                </p>
              </hc-tabs-panel>
            </hc-tabs>
        </hc-page-header>
      </div>
    </div>
  </div>
</template>

<script>

import hcPageHeader from '../components/hc-page-header/hc-page-header';
import hcTabsPanel from '../components/hc-tabs/hc-tabs-panel';

export default {
  name: 'hc-page-header-samples',

  components: {
    'hc-page-header': hcPageHeader,
    'hc-tabs-panel': hcTabsPanel,
  },

};
</script>
