/* ===========================
   script.js — Portfolio JS
=========================== */

// ---- CUSTOM CURSOR ----
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower && !('ontouchstart' in window)) {
  document.body.classList.add('custom-cursor-active');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .project-card, .stat-card, .cert-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursor.style.background = 'var(--accent-2)';
      follower.style.width = '50px';
      follower.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--accent)';
      follower.style.width = '28px';
      follower.style.height = '28px';
    });
  });
} else {
  if (cursor) cursor.style.display = 'none';
  if (follower) follower.style.display = 'none';
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.timeline-item, .skill-category, .project-card, .cert-card, .stat-card, .about-text, .contact-text, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

document.querySelectorAll('.skills-grid, .projects-grid, .certs-grid, .about-stats').forEach(grid => {
  const children = grid.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

// ---- TYPING EFFECT (Hero Subtitle) ----
// Wait for loader to finish before typing starts (2s loader + small buffer)
const typingEl = document.querySelector('.hero-subtitle');
const originalText = typingEl ? typingEl.textContent : '';

if (typingEl) {
  typingEl.textContent = '';
  setTimeout(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < originalText.length) {
        typingEl.textContent += originalText[i];
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 45);
  }, 2200); // starts after loader disappears
}

// ---- EMAILJS CONFIG ----
// IMPORTANT: Replace these with your real IDs from emailjs.com dashboard
// Service ID  → emailjs.com → Email Services → copy the ID
// Template ID → emailjs.com → Email Templates → copy the ID
const EMAILJS_SERVICE_ID  = 'tejavaththarunteja';   // ← REPLACE THIS
const EMAILJS_TEMPLATE_ID = 'template_tejavaththarun';  // ← REPLACE THIS

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in all fields.';
      formNote.style.color = '#f87171';
      return;
    }

    const btn = document.getElementById('sendBtn');
    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;
    formNote.textContent = '';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      message:    message,
    })
    .then(() => {
      formNote.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formNote.style.color = 'var(--accent)';
      form.reset();
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false;
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      formNote.textContent = '❌ Something went wrong. Please email me directly at tejavaththarunteja@gmail.com';
      formNote.style.color = '#f87171';
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false;
    });
  });
}

// ---- SMOOTH ANCHOR SCROLL WITH OFFSET ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- AUTO-UPDATE YEAR IN FOOTER ----
const footerYear = document.querySelector('.footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();