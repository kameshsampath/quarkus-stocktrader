/*
       Copyright 2018 IBM Corp All Rights Reserved

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
'use strict';
export default function () {
  // Module to be shared by all components
  var util = function () {

    var util = {

      // call function f for initializing a component
      // init right away if the document is loaded
      // or wait till DOMContentLoaded event is fired
      initOnReady: function initOnReady(f) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function () {
            f();
          });
        } else {
          f();
        }
      }
    };

    return util;
  }();

  // autocomplete

  (function () {
    // To be supported for autocomplete, a text input element with class
    // 'js-autocomplete' should be immediately followed (next element sibling)
    // by a list with class 'list-autocomplete' which will be shown/hidden by
    // having an 'is-visible' class added/removed as needed. Items in the list
    // are descendants of the list with class 'list-autocomplete__item' and
    // should raise click events when their text content is to become the new
    // text input value.

    var acitem = '.list-autocomplete__item',
      aclist = '.js-autocomplete + .list-autocomplete',
      acselected = '.list-autocomplete__item.is-visible.is-selected',
      acvisible = '.list-autocomplete__item.is-visible',
      forEach = Array.prototype.forEach,
      show = 'is-visible',
      select = 'is-selected';

    var init = function init() {
      var selectItem = function selectItem(list, newitem) {
        if (newitem === -1 || newitem === +1) {
          var items = list.querySelectorAll(acvisible),
            selected = list.querySelector(acselected),
            ix = Array.prototype.indexOf.call(items, selected) + newitem;

          // if there wasn't a selected item, select the first item
          // if 'ix' goes out of range, 'items[ix]' will be undefined (falsy)
          newitem = items[selected ? ix : 0];
        }
        if (newitem && !newitem.classList.contains(select)) {
          forEach.call(list.querySelectorAll(acitem), function (item) {
            return item.classList.toggle(select, item == newitem);
          });
          var scrolly = newitem.getBoundingClientRect().top - list.getBoundingClientRect().top;
          if (scrolly < 0) {
            cassie.scroll(list, list.scrollTop + scrolly);
          } else if (scrolly + newitem.offsetHeight > list.offsetHeight) {
            cassie.scroll(list, list.scrollTop + scrolly + newitem.offsetHeight - list.offsetHeight);
          }
        }
      };

      var applyItem = function applyItem(item, input) {
        var value = item && (item.textContent || item.innerText /* IE */);
        if (value) {
          input.value = value;
          input.blur();
        }
      };

      var filterList = function filterList(list, input) {
        var matcher = new RegExp(input.value, 'i');
        forEach.call(list.querySelectorAll(acitem), function (item) {
          console.log("Hello there!!!");
          var value = item.textContent || item.target.innerText /*IE*/ || '';
          if (value.search(matcher) >= 0) {
            item.classList.add(show);
          } else {
            item.classList.remove(show, select);
          }
        });
      };

      forEach.call(document.querySelectorAll(aclist), function (list) {
        console.log("Hello there!!!");
        var input = list.previousElementSibling;
        input.addEventListener('focus', function (e) {
          return list.classList.add(show);
        });
        input.addEventListener('blur', function (e) {
          return list.classList.remove(show);
        });
        input.addEventListener('keydown', function (e) {
          return e.keyCode == 38 && selectItem(list, -1) || e.keyCode == 40 && selectItem(list, +1) || e.keyCode == 13 && applyItem(list.querySelector(acselected), input);
        });
        input.addEventListener('input', function (e) {
          return filterList(list, input);
        });
        filterList(list, input);

        forEach.call(list.querySelectorAll(acitem), function (item) {
          item.addEventListener('mousemove', function (e) {
            return selectItem(list, item);
          });
          item.addEventListener('click', function (e) {
            return applyItem(item, input);
          });
        });
      });
    };

    util.initOnReady(init);
  })();

  // dropdowns
  (function () {

    // To act as a drop-down, an element with class 'dropdown' should contain as
    // an immediate child a text element with class 'js-dropdown' immediately
    // followed (next element sibling) by a list with class 'dropdown__list'.
    // The list will be shown/hidden by adding/removing an 'is-visible' class on
    // the dropdown parent. Items in the list should have class 'dropdown__item'
    // and should raise click events when their content is to become the new
    // selected value.

    var dditem = '.dropdown__item',
      ddlist = '.dropdown > .js-dropdown + .dropdown__list',
      ddselected = '.dropdown__item.is-selected',
      forEach = Array.prototype.forEach,
      open = 'is-open',
      select = 'is-selected';

    var init = function init() {
      var selectItem = function selectItem(list, newitem) {
        if (newitem === -1 || newitem === +1) {
          var items = list.querySelectorAll(dditem),
            selected = list.querySelector(ddselected),
            ix = Array.prototype.indexOf.call(items, selected) + newitem;

          // if there wasn't a selected item, select the first item
          // if 'ix' goes out of range, 'items[ix]' will be undefined (falsy)
          newitem = items[selected ? ix : 0];
        }
        if (newitem && !newitem.classList.contains(select)) {
          forEach.call(list.querySelectorAll(dditem), function (item) {
            return item.classList.toggle(select, item == newitem);
          });
          var scrolly = newitem.getBoundingClientRect().top - list.getBoundingClientRect().top;
          if (scrolly < 0) {
            cassie.scroll(list, list.scrollTop + scrolly);
          } else if (scrolly + newitem.offsetHeight > list.offsetHeight) {
            cassie.scroll(list, list.scrollTop + scrolly + newitem.offsetHeight - list.offsetHeight);
          }
        }
      };

      var applyItem = function applyItem(item, label, dropdown) {
        label.innerHTML = item.innerHTML;
      };

      forEach.call(document.querySelectorAll(ddlist), function (list) {
        var dropdown = list.parentElement,
          label = list.previousElementSibling;
        dropdown.addEventListener('click', function (e) {
          return dropdown.classList.toggle(open);
        });
        dropdown.addEventListener('blur', function (e) {
          return dropdown.classList.remove(open);
        });
        dropdown.addEventListener('keydown', function (e) {
          if (dropdown.classList.contains(open)) {
            switch (e.keyCode) {
              case 38:
                // up arrow
                selectItem(list, -1);
                e.preventDefault();
                break;
              case 40:
                // down arrow
                selectItem(list, +1);
                e.preventDefault();
                break;
              case 13: // enter
              case 32:
                // space
                applyItem(list.querySelector(ddselected), label, dropdown);
                dropdown.classList.remove(open);
                e.preventDefault();
                break;
              case 27:
                // escape
                dropdown.classList.remove(open);
                e.preventDefault();
                break;
            }
          } else {
            switch (e.keyCode) {
              case 13: // enter
              case 32:
                // space
                dropdown.classList.add(open);
                e.preventDefault();
                break;
            }
          }
        });

        forEach.call(list.querySelectorAll(dditem), function (item) {
          item.addEventListener('mousemove', function (e) {
            return selectItem(list, item);
          });
          item.addEventListener('click', function (e) {
            return applyItem(item, label, dropdown);
          });
        });
      });
    };

    util.initOnReady(init);
  })();

  // File Upload
  (function () {

    // To act as a file-upload summary field, a label element with class
    // 'file-upload__field' should have its 'for' attribute point to the input
    // element with a type of 'file'.

    var fufield = '.file-upload__field';

    var init = function init() {
      Array.prototype.forEach.call(document.querySelectorAll(fufield), function (field) {
        if (field.control) {
          field.control.addEventListener('change', function (e) {
            if (field.control.files && field.control.files.length > 1) {
              field.innerHTML = field.control.files.length + ' files selected';
            } else {
              field.innerHTML = field.control.value && field.control.value.split('\\').pop();
            }
          });
        }
      });
    };

    util.initOnReady(init);
  })();

  // Global Header Nav Button
  (function () {

    var navbutton = '.js-nav-button',
      open = 'is-open';

    var init = function init() {
      Array.prototype.forEach.call(document.querySelectorAll(navbutton), function (button) {
        button.addEventListener('click', function () {
          button.parentNode.classList.toggle(open);
        });
      });
    };

    util.initOnReady(init);
  })();

  // Header Overflow Menu
  (function () {

    var forEach = Array.prototype.forEach,
      oflist = '.js-overflow-menu-button + .header-list',
      open = 'is-open',
      ofopen = '.js-overflow-menu-button + .header-list.is-open';

    var init = function init() {
      forEach.call(document.querySelectorAll(oflist), function (list) {
        var button = list.previousElementSibling;
        button.addEventListener('click', function (e) {
          list.classList.toggle(open);
          e.stopPropagation();
        });
      });

      document.body.addEventListener('click', function (e) {
        return forEach.call(document.querySelectorAll(ofopen), function (list) {
          return list.classList.remove(open);
        });
      });
    };

    util.initOnReady(init);
  })();

  (function () {

    // An attribute 'data-peripheral' is added to the body tag to indicate
    // whether the last focus event resulted from a keyboard, mouse, or touch
    // interaction. This can be used by controls that, for example, only wish
    // to display focus highlighting when the last focus transition was
    // keyboard-initiated (eg checkboxes, radio buttons, etc)

    var attr = 'data-peripheral',
      body = document.body;

    var init = function init() {
      var lastInteraction = 'none',
        lastActive = document.activeElement,
        interact = function interact(type) {
          return lastInteraction = type;
        };

      document.body.setAttribute(attr, 'none');
      document.body.addEventListener('mousedown', function () {
        return interact('mouse');
      }, true);
      document.body.addEventListener('pointerdown', function () {
        return interact('mouse');
      }, true);
      document.body.addEventListener('touchstart', function () {
        return interact('touch');
      }, true);
      document.body.addEventListener('keydown', function () {
        return interact('keyboard');
      }, true);

      document.body.addEventListener('focus', function () {
        if (document.activeElement !== lastActive) {
          // only update attribute on actual focus changes
          body.setAttribute(attr, lastInteraction);
          lastActive = document.activeElement;
        }
      }, true);
    };

    util.initOnReady(init);
  })();

  // Modal
  (function () {

    // An element with class 'js-modal' and an attribute 'data-modal-target'
    // will display the corresponding modal panel (an element with an attribute
    // 'data-modal' whose value matches the modal-target value of the clicked
    // element) by adding an 'is-visible' class to the element. Focus will be
    // placed on an element within the panel that has a 'js-modal-focus' class.
    // When a modal is showing, a click on any element within that modal that
    // has the class 'js-close-modal' will cause the 'is-visible' class to be
    // removed, as will an unhandled 'escape' keypress within the modal panel.

    var forEach = Array.prototype.forEach,
      moshow = '.js-modal[data-modal-target]',
      momatch = function momatch(key) {
        return '[data-modal="' + key + '"]';
      },
      mofocus = '.js-modal-focus',
      mopanel = '[data-modal]',
      mohide = '.js-close-modal',
      visible = 'is-visible';

    var init = function init() {
      forEach.call(document.querySelectorAll(moshow), function (trigger) {
        var name = trigger.getAttribute('data-modal-target'),
          target = document.querySelector(momatch(name)),
          focus = target.querySelector(mofocus);
        trigger.addEventListener('click', function (e) {
          target.classList.add(visible);
          e.stopPropagation();
          trigger.blur();
          setTimeout(function () {
            (focus || target).focus();
          }, 100);
        });
      });

      forEach.call(document.querySelectorAll(mopanel), function (panel) {
        panel.addEventListener('keydown', function (e) {
          return e.keyCode == 27 && panel.classList.remove(visible);
        });

        forEach.call(panel.querySelectorAll(mohide), function (trigger) {
          return trigger.addEventListener('click', function (e) {
            panel.classList.toggle(visible);
            e.stopPropagation();
          });
        });
      });
    };

    util.initOnReady(init);
  })();

  // Overflow Menu
  (function () {

    // To be supported for overflow display, a button element with class
    // 'js-overflow-button' should be immediately followed (next element
    // sibling) by a list with class 'list-overflow' which will be
    // shown/hidden by having an 'is-open' class added/removed as needed.

    var forEach = Array.prototype.forEach,
      oflist = '.js-overflow-button + .list-overflow',
      open = 'is-open',
      ofopen = '.js-overflow-button.is-open',
      listitem = '.list-overflow__item',
      matches = document.documentElement.matches || document.documentElement.msMatchesSelector;

    var init = function init() {
      var children = function children(element, selector) {
        return Array.prototype.filter.call(element.children, function (child) {
          return matches.call(child, selector);
        });
      };

      forEach.call(document.querySelectorAll(oflist), function (list) {
        var button = list.previousElementSibling;
        button.addEventListener('click', function (e) {
          button.classList.toggle(open);
          e.stopPropagation();

          // hide all other opened lists if there is any
          forEach.call(document.querySelectorAll(ofopen), function (obutton) {
            if (!obutton.isSameNode(button)) {
              obutton.classList.remove(open);
            }
          });
        });

        // hide when user tabs away from the current menu
        // this event supports >= FF 52
        button.addEventListener('focusout', function (e) {
          var nextFocus = e.relatedTarget;
          //focus outside of the current list
          if (!list.contains(nextFocus)) {
            button.classList.remove(open);
          }
        });

        // when user tabs into one of the list item,
        // tabbing away from the list will close the current list
        forEach.call(children(list, listitem), function (item) {
          item.addEventListener('focusout', function (e) {
            var nextFocus = e.relatedTarget;
            if (!list.contains(nextFocus)) {
              button.classList.remove(open);
            }
          });
        });
      });

      document.body.addEventListener('click', function (e) {
        return forEach.call(document.querySelectorAll(ofopen), function (button) {
          return button.classList.remove(open);
        });
      });

      document.body.addEventListener('keydown', function (e) {
        return forEach.call(document.querySelectorAll(ofopen), function (button) {
          switch (e.keyCode) {
            case 27:
              // escape
              button.classList.remove(open);
          }
        });
      });
    };

    util.initOnReady(init);
  })();

  // Scroll functions
  (function () {

    window.cassie = window.cassie || {};

    var scroller = false;

    // A global function to scroll an element to a new position, which is
    // applied as the element's scrollTop so it can be a body scroll or an
    // internal element scroll depending on the element supplied. An
    // adaptive timing function based on viewport size is used. The scroll
    // start can optionally be supplied, otherwise the current scroll is
    // used as the start.

    window.cassie.scroll = function (element, top, from) {
      var t0 = Date.now(),
        isbody = element === document.body,
        starttop = from === undefined ? element.scrollTop || (isbody ? document.documentElement.scrollTop : 0) : from,
        ambit = isbody ? window.innerHeight : element.clientHeight,
        endtop = Math.min(Math.max(0, top), element.scrollHeight - ambit),


        // maxspeed determines how fast the scroll will go (px/ms), and which way
        maxspeed = window.innerHeight / 40 * Math.sign(endtop - starttop),


        // acceltime is the duration in ms of the ease in/out
        acceltime = 1000,
        distance = endtop - starttop,
        cruisingdistance = distance - maxspeed * acceltime,
        duration = Math.sign(cruisingdistance) === Math.sign(maxspeed) ?
          // if we'll reach maxspeed, two acceltimes plus linear travel between
          2 * acceltime + cruisingdistance / maxspeed :
          // otherwise we skip from quadratic accel to decel seamlessly
          2 * Math.sqrt(distance * acceltime / maxspeed),
        track = function track(dt) {
          return dt < acceltime ?
            // up to acceltime we accelerate quadratically
            maxspeed * dt * dt / (2 * acceltime) :
            // after acceltime we scroll linearly at maxspeed
            maxspeed * acceltime / 2 + maxspeed * (dt - acceltime);
        },
        scrollto = function scrollto(newtop) {
          element.scrollTop = newtop;
          if (isbody) {
            document.documentElement.scrollTop = newtop; // for FF
          }
        },
        animate = function animate() {
          var dt = Date.now() - t0;
          if (dt >= duration) {
            scrollto(endtop);
            clearInterval(scroller);
            scroller = false;
          } else {
            var newtop = dt < duration / 2 ? starttop + track(dt) : endtop - track(duration - dt);
            scrollto(newtop);
            if (!scroller) {
              scroller = setInterval(animate, 10);
            }
          }
        };

      if (scroller) {
        clearInterval(scroller);
        scroller = false;
      }

      animate();
    };

    // An internal link (of the form href="#xxx") with class 'js-scroll-to' will
    // trigger a smooth scroll to bring the target to the top of the viewport
    // (or as near as possible) when the link is triggered.

    var scelement = '.js-scroll-to';

    var pending = false,
      runpending = function runpending() {
        if (pending) {
          pending.apply();
          pending = false;
        }
      };

    var init = function init() {
      Array.prototype.forEach.call(document.querySelectorAll(scelement), function (element) {
        return element.addEventListener('click', function (e) {
          var fragment = element.getAttribute('href').match(/\#.*/);
          if (fragment) {
            var destination = document.querySelector(fragment[0]);
            if (destination) {
              // the link click will probably trigger a scroll which will interfere
              // with our smooth-scroll animation, so we store the animation as a
              // pending task and trigger it when the link scroll comes in or after
              // a short time (just in case).
              pending = cassie.scroll.bind(window, document.body, window.scrollY + destination.getBoundingClientRect().top, document.body.scrollTop || document.documentElement.scrollTop);
              setTimeout(runpending, 20);
            }
          }
        });
      });
    };

    window.onscroll = runpending;

    util.initOnReady(init);
  })();

  // Data Tables
  (function () {

    // Any element with a 'data-table-row' attribute set on it will respond to
    // clicks by toggling whether the class 'is-selected' is applied.

    var tbrow = '[data-table-row]',
      select = 'is-selected';

    var init = function init() {
      Array.prototype.forEach.call(document.querySelectorAll(tbrow), function (row) {
        row.addEventListener('click', function () {
          return row.classList.toggle(select);
        });
      });
    };

    util.initOnReady(init);
  })();

  // Tabs
  (function () {

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

    var forEach = Array.prototype.forEach,
      tablink = '.tabs .tabs__item .tabs__link',
      tabilink = '.tabs__item .tabs__link',
      tabitem = '.tabs__item',
      tabtabs = '.tabs',
      tabdrop = '.tabs .tabs__dropdown',
      tabidrop = '.tabs__dropdown',
      tabpanel = '.tab-panels__panel',
      tabmatch = function tabmatch(key) {
        return '.tab-panels > .tab-panels__panel[data-tab-panel="' + key + '"]';
      },
      tabpanels = '.tab-panels',
      select = 'is-selected',
      open = 'is-open';

    // Finds the nearest ancestor, starting with the element itself, that
    // matches the supplied selector. Returns undefined if no match found.
    var matches = document.documentElement.matches || document.documentElement.webkitMatchesSelector || document.documentElement.mozMatchesSelector || document.documentElement.oMatchesSelector || document.documentElement.msMatchesSelector;
    var ancestor = function ancestor(element, selector) {
      return element && (matches.call(element, selector) ? element : ancestor(element.parentElement, selector));
    };

    var children = function children(element, selector) {
      return Array.prototype.filter.call(element.children, function (child) {
        return matches.call(child, selector);
      });
    };

    // Selects a tab and its corresponding panel
    var selectTab = function selectTab(e, selectLink) {
      if (e) {
        e.preventDefault();
      }

      var name = selectLink.getAttribute('data-tab'),
        selectItem = ancestor(selectLink, tabitem),
        tabs = ancestor(selectItem, tabtabs),
        selectPanel = document.querySelector(tabmatch(name)),
        panels = ancestor(selectPanel, tabpanels);

      forEach.call(tabs.querySelectorAll(tabilink), function (link) {
        var item = ancestor(link, tabitem);
        link.setAttribute('aria-selected', item == selectItem);
        item.classList.toggle(select, item == selectItem);
      });

      forEach.call(tabs.querySelectorAll(tabidrop), function (dropdown) {
        dropdown.innerHTML = selectLink.innerHTML;
      });

      tabs.classList.remove(open);

      if (panels) {
        forEach.call(children(panels, tabpanel), function (panel) {
          panel.classList.toggle(select, panel == selectPanel);
          panel.setAttribute('aria-hidden', panel !== selectPanel);
        });
      }
    };

    var init = function init() {
      // Click on a tab link selects the tab, escape cancels dropdown if active
      forEach.call(document.querySelectorAll(tablink), function (link) {
        link.addEventListener('click', function (e) {
          return selectTab(e, link);
        });
        link.addEventListener('keydown', function (e) {
          if (e.keyCode === 27) {
            ancestor(link, tabtabs).classList.remove(open);
          }
        });
        if (ancestor(link, tabitem).classList.contains(select)) {
          selectTab(null, link);
        }
      });

      // Click on a dropdown element toggles open, escape cancels
      forEach.call(document.querySelectorAll(tabdrop), function (dropdown) {
        var panel = ancestor(dropdown, tabtabs);
        dropdown.addEventListener('click', function (e) {
          e.preventDefault();
          panel.classList.toggle(open);
        });
        dropdown.addEventListener('keydown', function (e) {
          if (e.keyCode === 27) {
            panel.classList.remove(open);
          }
        });
      });
    };

    util.initOnReady(init);
  })();
}
//# sourceMappingURL=../maps/cirrus.es5.js.map
