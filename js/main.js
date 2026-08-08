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

// ===== Hero parallax =====
const heroImg = document.getElementById('heroImg');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
    }
    ticking = false;
  });
}, { passive: true });

// ===== Galerie: lightbox =====
const galleryTiles = Array.from(document.querySelectorAll('.gallery__tile'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = (index + galleryTiles.length) % galleryTiles.length;
  const src = galleryTiles[currentIndex].dataset.full;
  lightboxImg.src = src;
  lightboxImg.alt = galleryTiles[currentIndex].querySelector('img').alt;
  lightbox.classList.add('is-visible');
}
function closeLightbox() {
  lightbox.classList.remove('is-visible');
}

galleryTiles.forEach((tile, i) => {
  tile.addEventListener('click', () => openLightbox(i));
});
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
lightboxNext.addEventListener('click', () => openLightbox(currentIndex + 1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-visible')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
});

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
