

// dropdowns
(() => {

  // To act as a drop-down, an element with class 'dropdown' should contain as
  // an immediate child a text element with class 'js-dropdown' immediately
  // followed (next element sibling) by a list with class 'dropdown__list'.
  // The list will be shown/hidden by adding/removing an 'is-visible' class on
  // the dropdown parent. Items in the list should have class 'dropdown__item'
  // and should raise click events when their content is to become the new
  // selected value.

  const dditem = '.dropdown__item',
        ddlist = '.dropdown > .js-dropdown + .dropdown__list',
        ddselected = '.dropdown__item.is-selected',
        forEach = Array.prototype.forEach,
        open = 'is-open',
        select = 'is-selected';

  const init = () => {
    let selectItem = (list, newitem) => {
      if ((newitem === -1) || (newitem === +1)) {
        let items = list.querySelectorAll(dditem),
          selected = list.querySelector(ddselected),
          ix = Array.prototype.indexOf.call(items, selected) + newitem;

        // if there wasn't a selected item, select the first item
        // if 'ix' goes out of range, 'items[ix]' will be undefined (falsy)
        newitem = items[selected ? ix : 0];
      }
      if (newitem && !newitem.classList.contains(select)) {
        forEach.call(list.querySelectorAll(dditem),
                        item => item.classList.toggle(select, item == newitem));
        let scrolly = newitem.getBoundingClientRect().top - list.getBoundingClientRect().top;
        if (scrolly < 0) {
          cassie.scroll(list, list.scrollTop + scrolly);
        } else if (scrolly + newitem.offsetHeight > list.offsetHeight) {
          cassie.scroll(list, list.scrollTop + scrolly + newitem.offsetHeight - list.offsetHeight);
        }
      }
    };

    let applyItem = (item, label, dropdown) => {
      label.innerHTML = item.innerHTML;
    };

    forEach.call(document.querySelectorAll(ddlist), list => {
      let dropdown = list.parentElement,
        label = list.previousElementSibling;
      dropdown.addEventListener('click', e => dropdown.classList.toggle(open));
      dropdown.addEventListener('blur', e => dropdown.classList.remove(open));
      dropdown.addEventListener('keydown', e => {
        if (dropdown.classList.contains(open)) {
          switch (e.keyCode) {
            case 38:  // up arrow
              selectItem(list, -1);
              e.preventDefault();
              break;
            case 40:  // down arrow
              selectItem(list, +1);
              e.preventDefault();
              break;
            case 13:  // enter
            case 32:  // space
              applyItem(list.querySelector(ddselected), label, dropdown);
              dropdown.classList.remove(open);
              e.preventDefault();
              break;
            case 27:  // escape
              dropdown.classList.remove(open);
              e.preventDefault();
              break;
          }
        } else {
          switch (e.keyCode) {
            case 13:  // enter
            case 32:  // space
              dropdown.classList.add(open);
              e.preventDefault();
              break;
          }
        }
      });

      forEach.call(list.querySelectorAll(dditem), item => {
        item.addEventListener('mousemove', e => selectItem(list, item));
        item.addEventListener('click', e => applyItem(item, label, dropdown));
      });
    });
  };

  util.initOnReady(init);

})();
