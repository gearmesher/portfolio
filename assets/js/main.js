/**
 * Gerald Galdo — Portfolio
 * Shared front-end behavior: navigation, scroll reveal, project filtering,
 * project modal, back-to-top, and the hero typing effect.
 */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header scroll state ---------- */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const targets = document.querySelectorAll('[data-reveal], [data-reveal-group]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 480);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Project filter ---------- */
  function initProjectFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        const filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          const cats = (card.getAttribute('data-category') || '').split(' ');
          const show = filter === 'all' || cats.indexOf(filter) !== -1;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---------- Project modal ---------- */
  function initProjectModal() {
    const cards = document.querySelectorAll('.project-card');
    const backdrop = document.querySelector('.modal-backdrop');
    if (!cards.length || !backdrop) return;

    const modalImg = backdrop.querySelector('.modal-body img');
    const modalTitle = backdrop.querySelector('.modal-head h3');
    const modalBuiltIn = backdrop.querySelector('.built-in');
    const modalLink = backdrop.querySelector('.modal-foot a');
    const closeBtn = backdrop.querySelector('.modal-close');

    function open(card) {
      const img = card.querySelector('img');
      modalImg.src = img.getAttribute('src');
      modalImg.alt = img.getAttribute('alt') || '';
      modalTitle.textContent = card.getAttribute('data-title') || '';
      modalBuiltIn.textContent = 'Built with: ' + (card.getAttribute('data-built') || '');
      const url = card.getAttribute('data-url');
      if (url) {
        modalLink.setAttribute('href', url);
        modalLink.style.display = 'inline-flex';
      } else {
        modalLink.style.display = 'none';
      }
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () { open(card); });
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(card);
        }
      });
    });

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- Hero typing effect ---------- */
  function initTypingEffect() {
    const el = document.querySelector('[data-typing]');
    if (!el) return;

    let roles;
    try {
      roles = JSON.parse(el.getAttribute('data-typing'));
    } catch (err) {
      return;
    }
    if (!roles || !roles.length) return;

    const textEl = document.createElement('span');
    const cursorEl = document.createElement('span');
    cursorEl.className = 'cursor';
    cursorEl.setAttribute('aria-hidden', 'true');
    el.textContent = '';
    el.appendChild(textEl);
    el.appendChild(cursorEl);

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        textEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, 1400);
        }
      } else {
        charIndex--;
        textEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(tick, deleting ? 40 : 65);
    }

    tick();
  }

  /* ---------- Current-year footer stamp ---------- */
  function initYear() {
    const el = document.querySelector('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initHeaderScroll();
    initReveal();
    initBackToTop();
    initProjectFilter();
    initProjectModal();
    initTypingEffect();
    initYear();
  });
})();
