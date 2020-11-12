
// Data Tables
(() => {

  // Any element with a 'data-table-row' attribute set on it will respond to
  // clicks by toggling whether the class 'is-selected' is applied.

  const tbrow = '[data-table-row]',
        select = 'is-selected';

  const init = () => {
    Array.prototype.forEach.call(document.querySelectorAll(tbrow), row => {
      row.addEventListener('click', () =>
        row.classList.toggle(select)
      );
    });
  };

  util.initOnReady(init);

})();
