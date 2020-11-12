import hcAlert from './hc-alert/hc-alert';
import hcButton from './hc-button/hc-button';
import hcCards from './hc-card/index';
import hcCheckbox from './hc-checkbox/hc-checkbox';
import hcContentSwitcher from './hc-content-switcher/hc-content-switcher';
import hcIcon from './hc-icon/hc-icon';
import hcDropdown from './hc-dropdown/hc-dropdown';
import hcDropdownItem from './hc-dropdown/hc-dropdown-item';
import hcLink from './hc-link/hc-link';
import hcModal from './hc-modal/hc-modal';
import hcPagination from './hc-pagination/hc-pagination';
import hcPaginationStep from './hc-pagination/hc-pagination-step';
import hcProgress from './hc-progress/hc-progress';
import hcRadio from './hc-radio/hc-radio';
import hcSelect from './hc-select/hc-select';
import hcTabs from './hc-tabs/hc-tabs';
import hcTabsLinks from './hc-tabs/hc-tabs-links';
import hcTabsPanelSet from './hc-tabs/hc-tabs-panel-set';
import hcTabsPanel from './hc-tabs/hc-tabs-panel';
import hcText from './hc-text/hc-text';
import hcTextArea from './hc-textarea/hc-textarea';
import hcToggle from './hc-toggle/hc-toggle';
import hcTooltip from './hc-tooltip/hc-tooltip';
import hcPageHeader from './hc-page-header/hc-page-header';
import hcOverflow from './hc-overflow/hc-overflow';
import hcOverflowItem from './hc-overflow/hc-overflow-item';
import hcTag from './hc-tag/hc-tag';
import hcFileUpload from './hc-file-upload/hc-file-upload';
import hcModules from './hc-module/index';
import hcSearch from './hc-search/hc-search';
import hcTable from './hc-table/hc-table';
import hcGlobalHeader from './hc-global-header/hc-global-header';
import hcGlobalHeaderItem from './hc-global-header/hc-global-header-item';
import hcGlobalHeaderNavItem from './hc-global-header/hc-global-header-nav-item';

require('../globals/scss/_cirrus-core.scss');

// import your component and add to this list
const components = [
  hcAlert,
  hcButton,
  hcCards.hcCard,
  hcCards.hcCardTitle,
  hcCards.hcCardText,
  hcCards.hcCardLink,
  hcCards.hcCardSymbol,
  hcCards.hcCardFooter,
  hcCards.hcCardBody,
  hcCheckbox,
  hcContentSwitcher,
  hcDropdown,
  hcDropdownItem,
  hcIcon,
  hcLink,
  hcModal,
  hcModules.hcModule,
  hcModules.hcModuleTitle,
  hcModules.hcModuleFooter,
  hcModules.hcModuleBody,
  hcPagination,
  hcPaginationStep,
  hcProgress,
  hcRadio,
  hcSelect,
  hcTabs,
  hcTabsLinks,
  hcTabsPanel,
  hcTabsPanelSet,
  hcText,
  hcTextArea,
  hcToggle,
  hcTooltip,
  hcPageHeader,
  hcOverflow,
  hcOverflowItem,
  hcTag,
  hcSearch,
  hcTable,
  hcFileUpload,
  hcGlobalHeader,
  hcGlobalHeaderItem,
  hcGlobalHeaderNavItem,
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
  hcAlert,
  hcButton,
  hcCards,
  hcCheckbox,
  hcContentSwitcher,
  hcDropdown,
  hcDropdownItem,
  hcIcon,
  hcLink,
  hcModal,
  hcModules,
  hcPagination,
  hcPaginationStep,
  hcProgress,
  hcRadio,
  hcSelect,
  hcTabs,
  hcTabsLinks,
  hcTabsPanel,
  hcTabsPanelSet,
  hcText,
  hcTextArea,
  hcToggle,
  hcTooltip,
  hcPageHeader,
  hcOverflow,
  hcOverflowItem,
  hcTag,
  hcSearch,
  hcTable,
  hcFileUpload,
  hcGlobalHeader,
  hcGlobalHeaderItem,
  hcGlobalHeaderNavItem,
};
