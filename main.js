/* ══════════════════════════════════════════════════════
   VEXTRA — main.js
   ══════════════════════════════════════════════════════ */

'use strict';

// ─── NAVBAR: sticky + hamburger ──────────────────────
(function() {
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Sticky scroll
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger.addEventListener('click', function() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function(e) {
    if (!header.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ─── SMOOTH SCROLL with nav offset ───────────────────
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h') || '72'
      );
      const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
})();

// ─── REVEAL ON SCROLL ────────────────────────────────
(function() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function(el) { observer.observe(el); });
})();

// ─── FORM VALIDATION ─────────────────────────────────
(function() {
  var form = document.getElementById('contacto-form');
  if (!form) return;

  function setError(inputId, errorId, msg) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (!input || !error) return;
    if (msg) {
      input.classList.add('error');
      error.textContent = msg;
    } else {
      input.classList.remove('error');
      error.textContent = '';
    }
  }

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var valid = true;

    var nombre  = document.getElementById('nombre');
    var email   = document.getElementById('email');
    var mensaje = document.getElementById('mensaje');

    // Nombre
    if (!nombre || nombre.value.trim().length < 2) {
      setError('nombre', 'error-nombre', 'Por favor ingresá tu nombre.');
      valid = false;
    } else {
      setError('nombre', 'error-nombre', '');
    }

    // Email
    if (!email || !validateEmail(email.value.trim())) {
      setError('email', 'error-email', 'Ingresá un correo electrónico válido.');
      valid = false;
    } else {
      setError('email', 'error-email', '');
    }

    // Mensaje
    if (!mensaje || mensaje.value.trim().length < 10) {
      setError('mensaje', 'error-mensaje', 'Contanos un poco sobre tu negocio.');
      valid = false;
    } else {
      setError('mensaje', 'error-mensaje', '');
    }

    if (valid) {
      // Simular envío exitoso
      var submitBtn = form.querySelector('button[type="submit"]');
      var successEl = document.getElementById('form-success');

      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      setTimeout(function() {
        form.reset();
        submitBtn.textContent = 'Agendar diagnóstico gratuito';
        submitBtn.disabled = false;
        if (successEl) {
          successEl.hidden = false;
          setTimeout(function() { successEl.hidden = true; }, 6000);
        }
      }, 1200);
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(function(field) {
    field.addEventListener('input', function() {
      this.classList.remove('error');
    });
  });
})();

// ─── ANIMATED CHART BARS on scroll ───────────────────
(function() {
  var chartArea = document.querySelector('.chart-bars');
  if (!chartArea) return;

  var animated = false;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !animated) {
        animated = true;
        var bars = entry.target.querySelectorAll('.bar');
        bars.forEach(function(bar, i) {
          var finalH = bar.style.getPropertyValue('--h');
          bar.style.setProperty('--h', '0%');
          setTimeout(function() {
            bar.style.setProperty('--h', finalH);
            bar.style.transition = 'height 0.6s cubic-bezier(0.4,0,0.2,1)';
          }, i * 80 + 200);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(chartArea);
})();

// ─── ACTIVE NAV LINK on scroll ───────────────────────
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var navH = 90;

  function updateActive() {
    var scrollY = window.scrollY + navH + 40;
    var current = '';

    sections.forEach(function(section) {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
