// Module to be shared by all components
const util = (() => {

  const util = {

    // call function f for initializing a component
    // init right away if the document is loaded
    // or wait till DOMContentLoaded event is fired
    initOnReady: function(f) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          f();
        });
      } else {
        f();
      }
    }
  };

  return util;

})();
