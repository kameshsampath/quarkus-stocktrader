
(() => {

  // An attribute 'data-peripheral' is added to the body tag to indicate
  // whether the last focus event resulted from a keyboard, mouse, or touch
  // interaction. This can be used by controls that, for example, only wish
  // to display focus highlighting when the last focus transition was
  // keyboard-initiated (eg checkboxes, radio buttons, etc)

  const attr = 'data-peripheral',
        body = document.body;

  const init = () => {
    let lastInteraction = 'none',
      lastActive = document.activeElement,
      interact = (type) => (lastInteraction = type);

    document.body.setAttribute(attr, 'none');
    document.body.addEventListener('mousedown', () => interact('mouse'), true);
    document.body.addEventListener('pointerdown', () => interact('mouse'), true);
    document.body.addEventListener('touchstart', () => interact('touch'), true);
    document.body.addEventListener('keydown', () => interact('keyboard'), true);

    document.body.addEventListener('focus', () => {
      if (document.activeElement !== lastActive) {
        // only update attribute on actual focus changes
        body.setAttribute(attr, lastInteraction);
        lastActive = document.activeElement;
      }
    }, true);
  };

  util.initOnReady(init);

})();
