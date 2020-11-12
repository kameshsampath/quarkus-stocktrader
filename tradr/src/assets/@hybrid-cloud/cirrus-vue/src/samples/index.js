import hcAlertSamples from './hc-alert-samples';
import hcButtonSamples from './hc-button-samples';
import hcCardSamples from './hc-card-samples';
import hcCheckboxSamples from './hc-checkbox-samples';
import hcContentSwitcherSamples from './hc-content-switcher-samples';
import hcRadioSamples from './hc-radio-samples';
import hcTextSamples from './hc-text-samples';
import hcModuleSamples from './hc-module-samples';
import hcPaginationSamples from './hc-pagination-samples';
import hcIconSamples from './hc-icon-samples';
import hcProgressSamples from './hc-progress-samples';
import hcLinkSamples from './hc-link-samples';
import hcToggleSamples from './hc-toggle-samples';
import hcTooltipSamples from './hc-tooltip-samples';
import hcModalSamples from './hc-modal-samples';
import hcSelectSamples from './hc-select-samples';
import hcTabsSamples from './hc-tabs-samples';
import hcPageHeaderSamples from './hc-page-header-samples';
import hcDropdownSamples from './hc-dropdown-samples';
import hcOverflowSamples from './hc-overflow-samples';
import hcTagSamples from './hc-tag-samples';
import hcSearchSamples from './hc-search-samples';
import hcTableSamples from './hc-table-samples';
import hcHeadingSamples from './hc-heading-samples';
import hcFileUploadSamples from './hc-file-upload-samples';
import hcGlobalHeaderSamples from './hc-global-header-samples';

require('../globals/scss/_cirrus-core.scss');

// import your component and add to this list
const components = [
  hcAlertSamples,
  hcButtonSamples,
  hcCardSamples,
  hcCheckboxSamples,
  hcContentSwitcherSamples,
  hcRadioSamples,
  hcTextSamples,
  hcIconSamples,
  hcPaginationSamples,
  hcProgressSamples,
  hcLinkSamples,
  hcModuleSamples,
  hcToggleSamples,
  hcTooltipSamples,
  hcTabsSamples,
  hcPageHeaderSamples,
  hcModalSamples,
  hcSelectSamples,
  hcDropdownSamples,
  hcOverflowSamples,
  hcTagSamples,
  hcSearchSamples,
  hcTableSamples,
  hcHeadingSamples,
  hcFileUploadSamples,
  hcGlobalHeaderSamples,
];

// vue plugin for cirrus components
export default {

  // options is an array of components to be registered
  // e.g. ['c-button', 'c-modal']
  install(Vue, options) {
    if (typeof options === 'undefined') {
      components.forEach(c => Vue.component(c.name, c));
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array');
      }
      components.forEach((c) => {
        // register only components specified in the options
        if (options.indexOf(c.name) !== -1) {
          Vue.component(c.name, c);
        }
      });
    }
  },
};

export {
  hcAlertSamples,
  hcButtonSamples,
  hcCardSamples,
  hcCheckboxSamples,
  hcContentSwitcherSamples,
  hcRadioSamples,
  hcTextSamples,
  hcIconSamples,
  hcPaginationSamples,
  hcProgressSamples,
  hcLinkSamples,
  hcModuleSamples,
  hcToggleSamples,
  hcTooltipSamples,
  hcPageHeaderSamples,
  hcModalSamples,
  hcSelectSamples,
  hcTabsSamples,
  hcDropdownSamples,
  hcOverflowSamples,
  hcTagSamples,
  hcSearchSamples,
  hcTableSamples,
  hcHeadingSamples,
  hcFileUploadSamples,
  hcGlobalHeaderSamples,
};
