(() => {
  const root = document.querySelector('[data-debug-playground]');
  if (!root) return;

  const output = root.querySelector('[data-terminal-output]');
  const form = root.querySelector('[data-terminal-form]');
  const input = root.querySelector('[data-terminal-input]');
  const quick = root.querySelectorAll('[data-command]');
  const body = root.querySelector('.debug-terminal-body');

  const lines = (items, cls = '') => {
    items.forEach((text) => {
      const p = document.createElement('div');
      p.className = `debug-terminal-line ${cls}`.trim();
      p.textContent = text;
      output.appendChild(p);
    });
    body.scrollTop = body.scrollHeight;
  };

  const htmlLine = (html, cls = '') => {
    const p = document.createElement('div');
    p.className = `debug-terminal-line ${cls}`.trim();
    p.innerHTML = html;
    output.appendChild(p);
    body.scrollTop = body.scrollHeight;
  };

  const commands = {
    help() {
      lines([
        'available commands:',
        '  about      → who I am',
        '  work       → selected engineering work',
        '  research   → research page',
        '  github     → ReliableCode Group',
        '  contact    → jump to contact',
        '  resume     → open résumé',
        '  verify     → run portfolio checks',
        '  whoami     → identity',
        '  clear      → clear terminal',
      ], 'muted');
    },
    about() {
      lines([
        'Sodiq Babatunde Ologun',
        'Software Engineer · Researcher',
        'Software verification · Programming languages · Code intelligence',
      ]);
    },
    whoami() {
      lines([
        'SODIQ BABATUNDE OLOGUN',
        'TUNDECODES',
        'ReliableCode Group',
      ], 'success');
    },
    verify() {
      lines([
        '[✓] build integrity',
        '[✓] software verification',
        '[✓] research reproducibility',
        '[✓] production mindset',
        '[✓] debugging instinct',
        '200 OK ✓',
      ], 'success');
    },
    work() { window.location.href = '/work'; },
    research() { window.location.href = '/research'; },
    github() { window.open('https://github.com/reliablecodes', '_blank', 'noopener,noreferrer'); },
    contact() { window.location.href = '/#contact'; },
    resume() { window.open('/resume.pdf', '_blank', 'noopener,noreferrer'); },
    clear() { output.innerHTML = ''; },
  };

  const run = (raw) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    lines([`$ ${command}`], 'command');
    if (commands[command]) {
      commands[command]();
    } else {
      lines([`command not found: ${command}`, 'type "help" to see available commands'], 'error');
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    run(value);
  });

  quick.forEach((button) => {
    button.addEventListener('click', () => {
      run(button.dataset.command || '');
      input.focus();
    });
  });

  root.addEventListener('click', (event) => {
    if (!event.target.closest('button,a')) input.focus();
  });

  lines([
    'ReliableCode Debug Playground v1.0',
    'type "help" or tap a command below.',
  ], 'muted');
})();
