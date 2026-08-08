// ===== Nav: scrolled state + mobile menu =====
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

burger.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ===== Bubbles =====
const bubbleContainer = document.getElementById('bubbles');
const BUBBLE_COUNT = 22;
for (let i = 0; i < BUBBLE_COUNT; i++) {
  const b = document.createElement('span');
  const size = 3 + Math.random() * 10;
  b.style.setProperty('--s', `${size}px`);
  b.style.setProperty('--x', `${Math.random() * 100}%`);
  b.style.setProperty('--d', `${8 + Math.random() * 12}s`);
  b.style.setProperty('--delay', `${Math.random() * 12}s`);
  bubbleContainer.appendChild(b);
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Sondage d'arrivée =====
const pollOverlay = document.getElementById('pollOverlay');
const pollClose = document.getElementById('pollClose');
const pollActions = document.getElementById('pollActions');
const pollThanks = document.getElementById('pollThanks');
const POLL_KEY = 'uwh_poll_done';

const pollMessages = {
  oui: "Un(e) chasseur(se) averti(e) ! Vous retrouverez sûrement vos sensations dans ces vidéos et ces images.",
  non: "Bienvenue à bord ! Laissez-vous porter par l'apnée et l'océan — une nouvelle passion vous attend peut-être."
};

function hidePoll() {
  pollOverlay.classList.remove('is-visible');
}

if (!localStorage.getItem(POLL_KEY)) {
  setTimeout(() => pollOverlay.classList.add('is-visible'), 1200);
}

pollActions.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-answer]');
  if (!btn) return;
  const answer = btn.dataset.answer;
  localStorage.setItem(POLL_KEY, answer);
  pollActions.hidden = true;
  pollThanks.textContent = pollMessages[answer];
  pollThanks.hidden = false;
  setTimeout(hidePoll, 2600);
});

pollClose.addEventListener('click', hidePoll);
pollOverlay.addEventListener('click', (e) => {
  if (e.target === pollOverlay) hidePoll();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hidePoll();
});
