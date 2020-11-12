
// Tabs
(() => {

  // To act as tabs, each tab should be a link with class 'tabs__link' placed
  // within an element with class 'tabs__item'. The tabs should be grouped
  // within an element with class 'tabs', along with an element with class
  // 'tabs__dropdown' which will be used as a menu trigger when there is
  // insufficient screen space to permanently display the tab row by adding
  // or removing an 'is-open' class to the 'tabs' element as needed. Each link
  // should have an attribute 'data-tab' whose value is a unique name for the
  // tab. The corresponding content for each tab should be placed within an
  // element with class 'tab-panels__panel'. The panels should be grouped as
  // direct children of an element with class 'tab-panels'. Each panel should
  // have an attribute 'data-tab-panel' whose value is the unique name for the
  // tab which activates that panel. The tabs and the panels are each shown/hidden
  // by having an 'is-selected' class added/removed as needed. Each tab link
  // should raise a click event when that tab is to become the selected tab in
  // the group. Each group of tabs operates independently from other groups.

  const forEach = Array.prototype.forEach,
        tablink = '.tabs .tabs__item .tabs__link',
        tabilink = '.tabs__item .tabs__link',
        tabitem = '.tabs__item',
        tabtabs = '.tabs',
        tabdrop = '.tabs .tabs__dropdown',
        tabidrop = '.tabs__dropdown',
        tabpanel = '.tab-panels__panel',
        tabmatch = key => `.tab-panels > .tab-panels__panel[data-tab-panel="${key}"]`,
        tabpanels = '.tab-panels',
        select = 'is-selected',
        open = 'is-open';

  // Finds the nearest ancestor, starting with the element itself, that
  // matches the supplied selector. Returns undefined if no match found.
  const matches = document.documentElement.matches ||
                  document.documentElement.webkitMatchesSelector ||
                  document.documentElement.mozMatchesSelector ||
                  document.documentElement.oMatchesSelector ||
                  document.documentElement.msMatchesSelector;
  let ancestor = (element, selector) =>
    element &&
    (matches.call(element, selector) ?
      element : ancestor(element.parentElement, selector));

  let children = (element, selector) =>
    Array.prototype.filter.call(element.children, child => matches.call(child, selector));

  // Selects a tab and its corresponding panel
  let selectTab = (e, selectLink) => {
    if (e) { e.preventDefault(); }

    let name = selectLink.getAttribute('data-tab'),
      selectItem = ancestor(selectLink, tabitem),
      tabs = ancestor(selectItem, tabtabs),
      selectPanel = document.querySelector(tabmatch(name)),
      panels = ancestor(selectPanel, tabpanels);

    forEach.call(tabs.querySelectorAll(tabilink), link => {
      let item = ancestor(link, tabitem);
      link.setAttribute('aria-selected', item == selectItem);
      item.classList.toggle(select, item == selectItem);
    });

    forEach.call(tabs.querySelectorAll(tabidrop), dropdown => {
      dropdown.innerHTML = selectLink.innerHTML;
    });

    tabs.classList.remove(open);

    if (panels) {
      forEach.call(children(panels, tabpanel), panel => {
        panel.classList.toggle(select, panel == selectPanel);
        panel.setAttribute('aria-hidden', panel !== selectPanel);
      });
    }
  };

  const init = () => {
    // Click on a tab link selects the tab, escape cancels dropdown if active
    forEach.call(document.querySelectorAll(tablink), link => {
      link.addEventListener('click', e => selectTab(e, link));
      link.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          ancestor(link, tabtabs).classList.remove(open);
        }
      });
      if (ancestor(link, tabitem).classList.contains(select)) {
        selectTab(null, link);
      }
    });

    // Click on a dropdown element toggles open, escape cancels
    forEach.call(document.querySelectorAll(tabdrop), dropdown => {
      let panel = ancestor(dropdown, tabtabs);
      dropdown.addEventListener('click', e => {
        e.preventDefault();
        panel.classList.toggle(open);
      });
      dropdown.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          panel.classList.remove(open);
        }
      });
    });
  };

  util.initOnReady(init);

})();
