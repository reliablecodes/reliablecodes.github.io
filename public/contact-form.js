(() => {
  const section = document.querySelector('.contact-section');
  if (!section || section.querySelector('.contact-form-shell')) return;
  section.id = 'contact';

  const SERVICE_ID = 'service_51p88jg';
  const TEMPLATE_ID = 'template_omc7vby';
  const PUBLIC_KEY = 'wN1hd_l-mJDCjfgHj';
  const grid = section.querySelector('.contact-grid');
  if (!grid) return;

  const shell = document.createElement('div');
  shell.className = 'contact-form-shell';
  shell.innerHTML = `
    <div class="contact-form-meta">
      <span class="contact-status-dot"></span>
      <span>DIRECT MESSAGE / EMAILJS</span>
      <span class="contact-route">ROUTE → GMAIL</span>
    </div>
    <form class="contact-form" novalidate>
      <div class="contact-field-row">
        <label class="contact-field"><span>NAME</span><input type="text" name="name" autocomplete="name" placeholder="Your name" required></label>
        <label class="contact-field"><span>EMAIL</span><input type="email" name="reply_to" autocomplete="email" placeholder="you@example.com" required></label>
      </div>
      <label class="contact-field"><span>SUBJECT</span><input type="text" name="subject" placeholder="What are we solving?"></label>
      <label class="contact-field"><span>MESSAGE</span><textarea name="message" rows="6" placeholder="Tell me about the problem, project, or research idea." required></textarea></label>
      <input type="hidden" name="time" value="">
      <div class="contact-form-footer">
        <p class="contact-form-state" aria-live="polite">Messages are delivered directly to my inbox.</p>
        <button type="submit" class="contact-submit">SEND MESSAGE ↗</button>
      </div>
    </form>`;

  grid.insertAdjacentElement('afterend', shell);
  const form = shell.querySelector('.contact-form');
  const button = shell.querySelector('.contact-submit');
  const state = shell.querySelector('.contact-form-state');
  const time = shell.querySelector('input[name="time"]');

  const setState = (kind, message) => {
    shell.dataset.state = kind;
    state.textContent = message;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    time.value = new Date().toLocaleString();
    button.disabled = true;
    button.textContent = 'SENDING…';
    setState('sending', 'Sending through the existing Gmail route…');

    try {
      const templateParams = Object.fromEntries(new FormData(form).entries());
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY, template_params: templateParams }),
      });
      if (!response.ok) throw new Error(`EmailJS ${response.status}`);

      form.reset();
      setState('success', '200 OK ✓ Message sent. I’ll get back to you shortly.');
      button.textContent = 'SENT ✓';
      setTimeout(() => {
        button.disabled = false;
        button.textContent = 'SEND MESSAGE ↗';
        setState('idle', 'Messages are delivered directly to my inbox.');
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setState('error', 'SEND FAILED / Please use the direct email link above.');
      button.disabled = false;
      button.textContent = 'TRY AGAIN ↗';
    }
  });
})();
