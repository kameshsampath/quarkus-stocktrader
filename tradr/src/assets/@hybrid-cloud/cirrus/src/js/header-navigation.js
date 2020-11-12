// Global Header Nav Button
(() => {

  const navbutton = '.js-nav-button',
        open = 'is-open';

  const init = () => {
    Array.prototype.forEach.call(document.querySelectorAll(navbutton), button => {
      button.addEventListener('click', () => {
        button.parentNode.classList.toggle(open);
      });
    });
  };

  util.initOnReady(init);

})();
