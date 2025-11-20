document.querySelectorAll('.btn, button').forEach(el => {
  const addPressed = (evt) => {
    // ignore non-primary buttons
    if (evt.pointerType === 'mouse' && evt.button !== 0) return;
    el.classList.add('pressed');

    // installed once per activation
    const clear = () => {
      el.classList.remove('pressed');
      document.removeEventListener('pointerup', clear);
      document.removeEventListener('pointercancel', clear);
      window.removeEventListener('blur', clear);
    };

    document.addEventListener('pointerup', clear);
    document.addEventListener('pointercancel', clear);
    window.addEventListener('blur', clear);
  };

  el.addEventListener('pointerdown', addPressed);

  // Fallback: some old browsers don't support pointer events
  el.addEventListener('mousedown', (e) => {
    if (!window.PointerEvent) addPressed(e);
  });

  el.addEventListener('touchstart', (e) => {
    if (!window.PointerEvent) addPressed(e);
  });
});
