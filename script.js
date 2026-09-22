/* =========================================================
   Apurva Vyas — DevOps & Cloud Engineer Portfolio
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const toTopBtn = document.getElementById('toTop');

  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    navbar.classList.toggle('scrolled', scrolled);
    toTopBtn.classList.toggle('visible', window.scrollY > 500);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll-spy active nav link ---------- */
  const sections = document.querySelectorAll('main section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => spyObserver.observe(sec));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Hero typing effect ---------- */
  const roles = [
    'DevOps Engineer',
    'Cloud Engineer (AWS)',
    'Platform Engineer',
    'Infrastructure Automation Specialist'
  ];
  const typedEl = document.getElementById('typedRole');

  if (typedEl) {
    let roleIdx = 0, charIdx = 0, deleting = false;

    const tick = () => {
      const current = roles[roleIdx];

      if (!deleting) {
        charIdx++;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIdx--;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    };
    tick();
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Masked email reveal (anti-scrape obfuscation) ---------- */
  // Email is never stored as plain readable text in the DOM/source.
  // It is reconstructed at runtime from character codes on user action.
  const emailCodes = [97,112,117,114,118,97,118,121,97,115,57,54,64,103,109,97,105,108,46,99,111,109];
  const revealBtn = document.getElementById('revealEmailBtn');
  const emailValueEl = document.getElementById('emailValue');
  let revealed = false;

  if (revealBtn && emailValueEl) {
    revealBtn.addEventListener('click', () => {
      if (!revealed) {
        const realEmail = emailCodes.map(c => String.fromCharCode(c)).join('');
        emailValueEl.textContent = realEmail;
        emailValueEl.dataset.email = realEmail;
        revealed = true;
        revealBtn.setAttribute('aria-label', 'Copy email');
      } else {
        const realEmail = emailValueEl.dataset.email;
        navigator.clipboard?.writeText(realEmail).then(() => {
          const original = emailValueEl.textContent;
          emailValueEl.textContent = 'Copied to clipboard!';
          setTimeout(() => { emailValueEl.textContent = original; }, 1400);
        }).catch(() => {});
      }
    });
  }

  /* ---------- Contact form → mailto (static site, no backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const fromEmail = contactForm.femail.value.trim();
      const message = contactForm.message.value.trim();

      const realEmail = emailCodes.map(c => String.fromCharCode(c)).join('');
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${fromEmail})`);

      window.location.href = `mailto:${realEmail}?subject=${subject}&body=${body}`;

      if (formNote) {
        formNote.textContent = 'Your email client should now be open with the message ready to send.';
      }
    });
  }

});
