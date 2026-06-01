/* ========== NAVBAR SCROLL ========== */
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ========== MOBILE NAV TOGGLE ========== */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ========== ACTIVE NAV LINK ON SCROLL ========== */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ========== BACK TO TOP BUTTON ========== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========== ANIMATED STAT COUNTERS ========== */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 60;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const updateCount = () => {
      const current = parseInt(counter.innerText);
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

animateCounters();

/* ========== SKILL BARS ANIMATION ========== */
function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');

  skillFills.forEach(fill => {
    const width = fill.getAttribute('data-width');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.width = width + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(fill);
  });
}

animateSkillBars();

/* ========== SCROLL REVEAL ANIMATIONS ========== */
function scrollReveal() {
  const elements = document.querySelectorAll(
    '.hero-content, .hero-visual, .about-grid, .timeline-item, ' +
    '.edu-card, .edu-row, .skill-item, .cert-card, ' +
    '.contact-grid, .contact-info, .contact-form-wrapper'
  );

  elements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    observer.observe(el);
  });
}

scrollReveal();

/* ========== TIMELINE ITEMS STAGGER ========== */
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${index * 0.15}s`);
  item.style.transitionDelay = `calc(0.15s * ${index})`;
});

/* ========== SMOOTH CARD TILT EFFECT ========== */
const tiltCards = document.querySelectorAll('.hero-card, .cert-card, .skill-item');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});

/* ========== CONTACT FORM HANDLING ========== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    const mailtoLink = `mailto:jannatulnaeema72@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = mailtoLink;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Ready!';
      btn.disabled = false;

      setTimeout(() => {
        btn.innerHTML = originalText;
        contactForm.reset();
        showFormMessage('Your message is ready to send! Your email client will open.', 'success');
      }, 2000);
    }, 800);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(text, type) {
  const existing = document.querySelector('.form-message');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className = `form-message ${type}`;
  msg.innerHTML = text;
  msg.style.cssText = `
    margin-top: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    background: ${type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(12, 192, 223, 0.1)'};
    color: ${type === 'error' ? '#ef4444' : '#0cc0df'};
    border: 1px solid ${type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(12, 192, 223, 0.2)'};
    text-align: center;
    animation: fadeInUp 0.3s ease;
  `;

  contactForm.appendChild(msg);

  setTimeout(() => msg.remove(), 5000);
}

/* ========== PARALLAX SHAPES ON MOUSE MOVE ========== */
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = 20 + (index * 10);
    const moveX = (x - 0.5) * speed;
    const moveY = (y - 0.5) * speed;
    shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

/* ========== PREVENT FORM RESUBMIT ON ENTER ========== */
if (contactForm) {
  contactForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      if (!e.shiftKey) e.preventDefault();
    }
  });
}

console.log('%c Jannatul Naeema — Nursing Portfolio ',
  'background:#0cc0df; color:#080c18; font-size:1.2rem; padding:8px 16px; ' +
  'border-radius:4px; font-weight:700; font-family:Inter, sans-serif;');
console.log('%c Dedicated Nurse | Critical Cardiac Care | Bangladesh ',
  'color:#94a3b8; font-size:0.85rem; padding:4px 16px;');
