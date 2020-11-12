
// Header Overflow Menu
(() => {

  const forEach = Array.prototype.forEach,
        oflist = '.js-overflow-menu-button + .header-list',
        open = 'is-open',
        ofopen = '.js-overflow-menu-button + .header-list.is-open';

  const init = () => {
    forEach.call(document.querySelectorAll(oflist), list => {
      let button = list.previousElementSibling;
      button.addEventListener('click', e => {
        list.classList.toggle(open);
        e.stopPropagation();
      });
    });

    document.body.addEventListener('click', e =>
      forEach.call(document.querySelectorAll(ofopen), list =>
        list.classList.remove(open)
      )
    );
  };

  util.initOnReady(init);

})();
