// Modal
(() => {

  // An element with class 'js-modal' and an attribute 'data-modal-target'
  // will display the corresponding modal panel (an element with an attribute
  // 'data-modal' whose value matches the modal-target value of the clicked
  // element) by adding an 'is-visible' class to the element. Focus will be
  // placed on an element within the panel that has a 'js-modal-focus' class.
  // When a modal is showing, a click on any element within that modal that
  // has the class 'js-close-modal' will cause the 'is-visible' class to be
  // removed, as will an unhandled 'escape' keypress within the modal panel.

  const forEach = Array.prototype.forEach,
        moshow = '.js-modal[data-modal-target]',
        momatch = key => `[data-modal="${key}"]`,
        mofocus = '.js-modal-focus',
        mopanel = '[data-modal]',
        mohide = '.js-close-modal',
        visible = 'is-visible';

  const init = () => {
    forEach.call(document.querySelectorAll(moshow), trigger => {
      let name = trigger.getAttribute('data-modal-target'),
          target = document.querySelector(momatch(name)),
          focus = target.querySelector(mofocus);
      trigger.addEventListener('click', e => {
        target.classList.add(visible);
        e.stopPropagation();
        trigger.blur();
        setTimeout(function() { (focus || target).focus(); }, 100);
      });
    });

    forEach.call(document.querySelectorAll(mopanel), panel => {
      panel.addEventListener('keydown', e =>
        ((e.keyCode == 27) && panel.classList.remove(visible)));

      forEach.call(panel.querySelectorAll(mohide), trigger =>
        trigger.addEventListener('click', e => {
          panel.classList.toggle(visible);
          e.stopPropagation();
        })
      );
    });
  };

  util.initOnReady(init);

})();
