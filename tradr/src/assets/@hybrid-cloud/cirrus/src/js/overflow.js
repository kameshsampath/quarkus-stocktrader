
// Overflow Menu
(() => {

  // To be supported for overflow display, a button element with class
  // 'js-overflow-button' should be immediately followed (next element
  // sibling) by a list with class 'list-overflow' which will be
  // shown/hidden by having an 'is-open' class added/removed as needed.

  const forEach = Array.prototype.forEach,
        oflist = '.js-overflow-button + .list-overflow',
        open = 'is-open',
        ofopen = '.js-overflow-button.is-open',
        listitem = '.list-overflow__item',
        matches = document.documentElement.matches ||
                  document.documentElement.msMatchesSelector;

  const init = () => {
    let children = (element, selector) =>
      Array.prototype.filter.call(element.children, child => matches.call(child, selector));

    forEach.call(document.querySelectorAll(oflist), list => {
      let button = list.previousElementSibling;
      button.addEventListener('click', e => {
        button.classList.toggle(open);
        e.stopPropagation();

        // hide all other opened lists if there is any
        forEach.call(document.querySelectorAll(ofopen), obutton => {
          if (!obutton.isSameNode(button)) {
            obutton.classList.remove(open);
          }
        });
      });

      // hide when user tabs away from the current menu
      // this event supports >= FF 52
      button.addEventListener('focusout', e => {
        let nextFocus = e.relatedTarget;
        //focus outside of the current list
        if (!list.contains(nextFocus)) {
          button.classList.remove(open);
        }
      });

      // when user tabs into one of the list item,
      // tabbing away from the list will close the current list
      forEach.call(children(list, listitem), item => {
        item.addEventListener('focusout', e => {
          let nextFocus = e.relatedTarget;
          if (!list.contains(nextFocus)) {
            button.classList.remove(open);
          }
        });
      });
    });

    document.body.addEventListener('click', e =>
      forEach.call(document.querySelectorAll(ofopen), button =>
        button.classList.remove(open)
      )
    );

    document.body.addEventListener('keydown', e =>
      forEach.call(document.querySelectorAll(ofopen), button => {
          switch (e.keyCode) {
            case 27:  // escape
              button.classList.remove(open);
          }
        }
      )
    );
  };

  util.initOnReady(init);

})();
