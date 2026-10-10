const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Закрыть' : 'Меню';
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Меню';
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });
}

document.querySelectorAll('.journey').forEach(journey => {
  const stops = [...journey.querySelectorAll('.journey-stop')];
  const map = journey.querySelector('.journey-map');
  const sizeOpenNote = () => {
    map.style.minHeight = '';
    if (matchMedia('(max-width: 760px)').matches) return;
    const note = journey.querySelector('.stop-note:not([hidden])');
    if (note) map.style.minHeight = Math.max(270, Math.ceil(note.getBoundingClientRect().bottom - map.getBoundingClientRect().top + 24)) + 'px';
  };
  const closeNotes = () => {
    map.style.minHeight = '';
    stops.forEach(stop => {
    stop.querySelector('.stop-button').setAttribute('aria-expanded', 'false');
    stop.querySelector('.stop-note').hidden = true;
    });
  };
  closeNotes();
  journey.classList.add('is-interactive');
  stops.forEach(stop => {
    const button = stop.querySelector('.stop-button');
    const note = stop.querySelector('.stop-note');
    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      closeNotes();
      if (opening) {
        button.setAttribute('aria-expanded', 'true');
        note.hidden = false;
        sizeOpenNote();
      }
    });
    stop.querySelector('.note-close').addEventListener('click', () => {
      closeNotes();
      button.focus();
    });
  });
  journey.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const active = journey.querySelector('[aria-expanded="true"]');
      closeNotes();
      active?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!journey.contains(event.target)) closeNotes();
  });
  window.addEventListener('resize', sizeOpenNote);
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    journey.classList.add('awaiting-reveal');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        journey.classList.add('is-visible');
        observer.disconnect();
      }
    }, {threshold: .15});
    observer.observe(journey);
  } else {
    journey.classList.add('is-visible');
  }
});
