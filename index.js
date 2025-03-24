// DOM Elements
const themeSwitch = document.getElementById('themeSwitch');
const root = document.documentElement;
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  themeSwitch.checked = theme === 'dark';
}

// Toggle theme
function toggleTheme() {
  const isDark = themeSwitch.checked;
  const newTheme = isDark ? 'dark' : 'light';

  root.classList.remove('light', 'dark');
  root.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
}

// Observe and animate sections
function initSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    section.style.opacity = '0';
    observer.observe(section);
  });
}

// Update active nav link on scroll
function updateActiveNavLink() {
  const scrollPosition = window.scrollY;

  navbar.classList.toggle('scrolled', scrollPosition > 50);

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    }
  });
}

// Typing animation for name
function initTypingAnimation() {
  const nameElement = document.querySelector('.my-name');
  if (!nameElement) return;

  const fullName = nameElement.textContent;
  nameElement.textContent = '';

  const typeWriter = (text, i = 0) => {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      setTimeout(() => typeWriter(text, i + 1), 100);
    }
  };

  setTimeout(() => {
    typeWriter(fullName);
  }, 500);
}

// Filter project cards
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const badge = card.querySelector('.project-badge').textContent.toLowerCase();
        card.style.display = filter === 'all' || badge === filter.toLowerCase() ? 'block' : 'none';
      });
    });
  });
}

// Event Listeners
window.addEventListener('load', () => {
  initTheme();
  initSections();
  initTypingAnimation();
  initProjectFilter();
  updateActiveNavLink();
});

window.addEventListener('scroll', updateActiveNavLink);
themeSwitch.addEventListener('change', toggleTheme);