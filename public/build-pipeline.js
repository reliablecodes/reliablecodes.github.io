(() => {
  if (window.location.pathname !== '/') return;
  if (document.querySelector('[data-build-pipeline]')) return;

  const mountAfter = document.querySelector('#bug-hunt') || document.querySelector('[data-bug-hunt]');
  if (!mountAfter) return;

  const section = document.createElement('section');
  section.id = 'build-pipeline';
  section.className = 'build-pipeline section-shell reveal is-visible';
  section.setAttribute('data-build-pipeline', '');
  section.innerHTML = `
    <div class="build-pipeline-head">
      <div>
        <p class="section-number">BUILD PIPELINE / SIMULATOR</p>
        <h2>Run the checks.</h2>
      </div>
      <p>Trigger a tiny deployment pipeline and watch each gate complete: lint, tests, verification, build, then deploy.</p>
    </div>
    <div class="pipeline-panel">
      <div class="pipeline-top">
        <span>reliablecode://ci/main</span>
        <button class="pipeline-run" type="button" data-pipeline-run>RUN CHECKS →</button>
      </div>
      <div class="pipeline-progress"><i data-pipeline-progress></i></div>
      <div class="pipeline-steps" data-pipeline-steps>
        <div class="pipeline-step" data-state="idle"><span>01 / LINT</span><strong>WAITING</strong></div>
        <div class="pipeline-step" data-state="idle"><span>02 / TESTS</span><strong>WAITING</strong></div>
        <div class="pipeline-step" data-state="idle"><span>03 / VERIFY</span><strong>WAITING</strong></div>
        <div class="pipeline-step" data-state="idle"><span>04 / BUILD</span><strong>WAITING</strong></div>
        <div class="pipeline-step" data-state="idle"><span>05 / DEPLOY</span><strong>WAITING</strong></div>
      </div>
      <div class="pipeline-log" data-pipeline-log aria-live="polite">
        <p class="muted">$ waiting for pipeline trigger...</p>
      </div>
      <div class="pipeline-summary">
        <span data-pipeline-status>STATUS / IDLE</span>
        <strong data-pipeline-result>READY</strong>
      </div>
    </div>`;

  mountAfter.insertAdjacentElement('afterend', section);

  const runButton = section.querySelector('[data-pipeline-run]');
  const steps = Array.from(section.querySelectorAll('.pipeline-step'));
  const log = section.querySelector('[data-pipeline-log]');
  const status = section.querySelector('[data-pipeline-status]');
  const result = section.querySelector('[data-pipeline-result]');
  const progress = section.querySelector('[data-pipeline-progress]');

  const jobs = [
    ['lint', 'eslint + formatting checks passed'],
    ['tests', 'unit + integration suite passed'],
    ['verify', 'reliability gates passed'],
    ['build', 'Astro static build completed'],
    ['deploy', 'release published successfully']
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const append = (text, cls = '') => {
    const p = document.createElement('p');
    p.textContent = text;
    if (cls) p.className = cls;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  };

  const reset = () => {
    steps.forEach((step) => {
      step.dataset.state = 'idle';
      step.querySelector('strong').textContent = 'WAITING';
    });
    log.innerHTML = '<p class="muted">$ pipeline initialized...</p>';
    progress.style.width = '0%';
    status.textContent = 'STATUS / RUNNING';
    result.textContent = 'CHECKING';
  };

  runButton.addEventListener('click', async () => {
    if (runButton.disabled) return;
    runButton.disabled = true;
    runButton.textContent = 'RUNNING…';
    reset();

    for (let i = 0; i < jobs.length; i += 1) {
      const [name, message] = jobs[i];
      const step = steps[i];
      step.dataset.state = 'running';
      step.querySelector('strong').textContent = 'RUNNING';
      append(`> ${name}: starting`, 'muted');
      await sleep(520 + i * 90);
      step.dataset.state = 'done';
      step.querySelector('strong').textContent = 'PASS ✓';
      append(`[✓] ${message}`, 'ok');
      progress.style.width = `${((i + 1) / jobs.length) * 100}%`;
      await sleep(180);
    }

    append('200 OK ✓ deployment pipeline complete', 'ok');
    status.textContent = 'STATUS / COMPLETE';
    result.textContent = '200 OK ✓';
    runButton.disabled = false;
    runButton.textContent = 'RUN AGAIN ↻';
  });
})();
