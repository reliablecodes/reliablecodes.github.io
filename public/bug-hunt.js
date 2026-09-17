(() => {
  if (window.location.pathname !== '/') return;
  if (document.querySelector('[data-bug-hunt]')) return;

  const mountAfter = document.querySelector('#debug-playground') || document.querySelector('.debug-playground');
  if (!mountAfter) return;

  const puzzles = [
    {
      level: '01 / EASY',
      title: 'Off-by-one boundary',
      prompt: 'Click the line that can read one element past the end of the array.',
      bugLine: 2,
      explanation: 'The loop should use i < items.length. With <=, the last iteration accesses items[items.length], which is out of bounds.',
      code: [
        'function sum(items) {',
        '  let total = 0;',
        '  for (let i = 0; i <= items.length; i++) {',
        '    total += items[i];',
        '  }',
        '  return total;',
        '}'
      ]
    },
    {
      level: '02 / MEDIUM',
      title: 'Mutable default state',
      prompt: 'Find the line that causes callers to share state across invocations.',
      bugLine: 0,
      explanation: 'Using a mutable object as a default parameter means the same object can be reused. Use None and create a new object inside the function.',
      code: [
        'def add_user(name, cache={}):',
        '    cache[name] = True',
        '    return cache',
        '',
        'first = add_user("Ada")',
        'second = add_user("Linus")'
      ]
    },
    {
      level: '03 / HARD',
      title: 'Async race condition',
      prompt: 'Which line creates the stale-read race?',
      bugLine: 1,
      explanation: 'The read and write are not atomic. Two concurrent calls can read the same balance before either writes back, causing a lost update.',
      code: [
        'async function deposit(account, amount) {',
        '  const balance = await account.getBalance();',
        '  await audit.log("deposit", amount);',
        '  await account.setBalance(balance + amount);',
        '  return account.getBalance();',
        '}'
      ]
    }
  ];

  const section = document.createElement('section');
  section.id = 'bug-hunt';
  section.className = 'bug-hunt section-shell reveal is-visible';
  section.setAttribute('data-bug-hunt', '');
  section.innerHTML = `
    <div class="bug-hunt-head">
      <div>
        <p class="section-number">BUG HUNT / MINI GAME</p>
        <h2>Find the bug.</h2>
      </div>
      <p>Three tiny debugging challenges. Click the suspicious line, get immediate feedback, and see if you can clear all levels without a wrong guess.</p>
    </div>
    <div class="bug-hunt-panel">
      <div class="bug-hunt-toolbar">
        <span>reliablecode://bug-hunt</span>
        <div class="bug-hunt-score">
          <span>SCORE <strong data-score>0</strong></span>
          <span>LEVEL <strong data-level-count>1/3</strong></span>
        </div>
      </div>
      <div class="bug-hunt-stage">
        <div class="bug-code" data-code></div>
        <aside class="bug-hunt-side">
          <span class="level" data-level></span>
          <h3 data-title></h3>
          <p data-prompt></p>
          <div class="bug-hunt-feedback" data-feedback>Choose the line that contains the bug.</div>
        </aside>
      </div>
      <div class="bug-hunt-controls">
        <small data-progress>0 solved · 0 wrong guesses</small>
        <button type="button" data-next disabled>NEXT CHALLENGE →</button>
      </div>
    </div>`;

  mountAfter.insertAdjacentElement('afterend', section);

  const codeEl = section.querySelector('[data-code]');
  const levelEl = section.querySelector('[data-level]');
  const titleEl = section.querySelector('[data-title]');
  const promptEl = section.querySelector('[data-prompt]');
  const feedbackEl = section.querySelector('[data-feedback]');
  const scoreEl = section.querySelector('[data-score]');
  const countEl = section.querySelector('[data-level-count]');
  const progressEl = section.querySelector('[data-progress]');
  const nextBtn = section.querySelector('[data-next]');

  let index = 0;
  let score = 0;
  let solved = 0;
  let wrong = 0;
  let locked = false;

  const render = () => {
    const puzzle = puzzles[index];
    locked = false;
    levelEl.textContent = puzzle.level;
    titleEl.textContent = puzzle.title;
    promptEl.textContent = puzzle.prompt;
    feedbackEl.className = 'bug-hunt-feedback';
    feedbackEl.textContent = 'Choose the line that contains the bug.';
    countEl.textContent = `${index + 1}/${puzzles.length}`;
    nextBtn.disabled = true;
    nextBtn.textContent = index === puzzles.length - 1 ? 'FINISH →' : 'NEXT CHALLENGE →';
    codeEl.innerHTML = '';

    puzzle.code.forEach((line, lineIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = `<span class="bug-line-no">${String(lineIndex + 1).padStart(2, '0')}</span><span class="bug-line-text"></span>`;
      button.querySelector('.bug-line-text').textContent = line || ' ';
      button.addEventListener('click', () => chooseLine(lineIndex, button));
      codeEl.appendChild(button);
    });
  };

  const updateProgress = () => {
    scoreEl.textContent = String(score);
    progressEl.textContent = `${solved} solved · ${wrong} wrong guess${wrong === 1 ? '' : 'es'}`;
  };

  const chooseLine = (lineIndex, button) => {
    if (locked) return;
    const puzzle = puzzles[index];
    if (lineIndex === puzzle.bugLine) {
      locked = true;
      solved += 1;
      score += 100;
      button.classList.add('is-correct');
      feedbackEl.className = 'bug-hunt-feedback success';
      feedbackEl.textContent = `BUG FOUND ✓ ${puzzle.explanation}`;
      nextBtn.disabled = false;
    } else {
      wrong += 1;
      score = Math.max(0, score - 15);
      button.classList.add('is-wrong');
      feedbackEl.className = 'bug-hunt-feedback error';
      feedbackEl.textContent = 'Not that line. Try again.';
      setTimeout(() => button.classList.remove('is-wrong'), 550);
    }
    updateProgress();
  };

  nextBtn.addEventListener('click', () => {
    if (!locked) return;
    if (index < puzzles.length - 1) {
      index += 1;
      render();
      return;
    }

    codeEl.innerHTML = '';
    levelEl.textContent = 'COMPLETE';
    titleEl.textContent = score >= 270 ? 'Debugger status: sharp.' : 'Debugger status: persistent.';
    promptEl.textContent = `Final score: ${score}. You cleared all ${puzzles.length} challenges.`;
    feedbackEl.className = 'bug-hunt-feedback success';
    feedbackEl.textContent = score >= 270 ? '300-class run ✓ Almost no wasted guesses.' : '200 OK ✓ All bugs found.';
    nextBtn.textContent = 'PLAY AGAIN ↻';
    nextBtn.disabled = false;
    nextBtn.onclick = () => {
      index = 0;
      score = 0;
      solved = 0;
      wrong = 0;
      updateProgress();
      render();
      nextBtn.onclick = null;
    };
  });

  updateProgress();
  render();
})();
