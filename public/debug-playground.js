(() => {
  if (window.location.pathname !== '/') return;

  const mountAfter = document.querySelector('.terminal-video') || document.querySelector('.engineering-console');
  if (!mountAfter || document.querySelector('[data-debug-playground]')) return;

  const section = document.createElement('section');
  section.className = 'debug-playground section-shell reveal is-visible';
  section.setAttribute('data-debug-playground', '');
  section.innerHTML = `
    <div class="debug-playground-head">
      <div>
        <p class="section-number">PLAYGROUND / INTERACTIVE</p>
        <h2>Try the terminal.</h2>
      </div>
      <p>This one actually works. Explore the portfolio like a tiny developer console — type a command or tap one below.</p>
    </div>
    <div class="debug-terminal" role="region" aria-label="Interactive portfolio terminal">
      <div class="debug-terminal-bar">
        <div class="debug-terminal-dots" aria-hidden="true"><i></i><i></i><i></i></div>
        <span>reliablecode://debug-playground</span>
        <span>LIVE</span>
      </div>
      <div class="debug-terminal-body" aria-live="polite">
        <div class="debug-terminal-output" data-terminal-output></div>
        <form class="debug-terminal-prompt" data-terminal-form autocomplete="off">
          <label for="debug-command">$</label>
          <input id="debug-command" class="debug-terminal-input" data-terminal-input type="text" inputmode="text" autocapitalize="none" spellcheck="false" placeholder="type help" aria-label="Terminal command" />
        </form>
      </div>
      <div class="debug-terminal-actions" aria-label="Quick commands">
        <button type="button" data-command="help">help</button>
        <button type="button" data-command="whoami">whoami</button>
        <button type="button" data-command="verify">verify</button>
        <button type="button" data-command="work">work</button>
        <button type="button" data-command="research">research</button>
        <button type="button" data-command="github">github</button>
        <button type="button" data-command="contact">contact</button>
      </div>
    </div>
    <p class="debug-terminal-hint">TIP / try: help · about · whoami · verify · work · research · github · contact · resume · clear</p>`;

  mountAfter.insertAdjacentElement('afterend', section);

  const root = section;
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
      lines(['SODIQ BABATUNDE OLOGUN', 'TUNDECODES', 'ReliableCode Group'], 'success');
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
    if (commands[command]) commands[command]();
    else lines([`command not found: ${command}`, 'type "help" to see available commands'], 'error');
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

  lines(['ReliableCode Debug Playground v1.0', 'type "help" or tap a command below.'], 'muted');
})();
