// This module wires together the hc-tabs-panel-set and hc-tabs-links components.
// It was created to allow hc-tabs-panel-set to appear in a location other than
// immediately following the hc-tabs-links element.

import Vue from 'vue';

export default {
  tabSets: [],
  getTabSet(tabSetId) {
    let tabSet = this.tabSets.find(item => item.id === tabSetId);

    if (!tabSet) {
      tabSet = {
        id: tabSetId,
        tabs: []
      };
      this.tabSets.push(tabSet);
    }
    return tabSet;
  },
  addTabSet(tabSetId, tabs) {
    const tabSet = this.getTabSet(tabSetId);

    if (tabSet) {
      Vue.set(tabSet, 'tabs', tabs);
    }
    return tabSet;
  },
  setActiveTab(tabSetId, tabId) {
    const tabSet = this.getTabSet(tabSetId);
    const fTabSet = (tab) => {
      tab.isActive = tab.id === tabId;
    };

    if (tabSet) {
      tabSet.tabs.forEach(fTabSet);
    }
  }
};
