
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
/// 1. CUSTOM CURSOR
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 4 + 'px';
  cursor.style.top = e.clientY - 4 + 'px';
});

// 2. SCROLL REVEAL ANIMATIONS
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach((el) => observer.observe(el));
// 3. CERTIFICATIONS LIGHTBOX (CLICK TO VIEW FULL)
const lightbox = document.getElementById('certLightbox');
const lightboxImg = document.getElementById('certLightboxImg');
const lightboxClose = document.getElementById('certLightboxClose');
const certCards = document.querySelectorAll('.cert-img-card');
// Open Lightbox when any certificate is clicked
certCards.forEach((card) => {
  // Add the hover text if it doesn't exist
  if (!card.querySelector('.cert-hover')) {
    const hoverDiv = document.createElement('div');
    hoverDiv.className = 'cert-hover';
    hoverDiv.textContent = '⊕ View Full Image';
    card.appendChild(hoverDiv);
  }
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (img) {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // Stop background scroll
    }
  });
});
// Close Lightbox functions
const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = 'auto'; // Enable background scroll
};
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});
lightboxClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
// 4. SMOOTH SCROLLING FOR NAVIGATION
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});