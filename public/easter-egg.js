(() => {
  const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let index = 0;
  let active = false;
  let toastTimer;

  const toast = document.createElement('div');
  toast.className = 'secret-debug-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  const showToast = (enabled) => {
    clearTimeout(toastTimer);
    toast.innerHTML = enabled
      ? '<strong>SECRET DEBUG MODE / ENABLED</strong>scanlines online · terminal palette locked · verification channel active<small>Repeat the sequence to exit.</small>'
      : '<strong>SECRET DEBUG MODE / DISABLED</strong>normal rendering restored<small>200 OK ✓</small>';
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  };

  const toggle = () => {
    active = !active;
    document.documentElement.classList.toggle('secret-debug-mode', active);
    showToast(active);
  };

  document.addEventListener('keydown', (event) => {
    const tag = event.target?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || event.target?.isContentEditable) return;

    const expected = sequence[index];
    const normalized = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const expectedNormalized = expected.length === 1 ? expected.toLowerCase() : expected;

    if (normalized === expectedNormalized) {
      index += 1;
      if (index === sequence.length) {
        index = 0;
        toggle();
      }
    } else {
      index = normalized === sequence[0] ? 1 : 0;
    }
  });

  let tapCount = 0;
  let tapTimer;
  document.addEventListener('click', (event) => {
    const mark = event.target.closest('.debug-status, .mobile-menu-status');
    if (!mark) return;
    tapCount += 1;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { tapCount = 0; }, 1200);
    if (tapCount >= 5) {
      tapCount = 0;
      toggle();
    }
  });
})();
