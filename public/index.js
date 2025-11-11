const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.querySelector('.mobile-nav-toggle');
const navClose = document.querySelector('.nav-close');
const primaryNavigation = document.querySelector('.primary-navigation');
const navLinks = document.querySelectorAll('.primary-navigation a');

function openMenu() {
  navToggle.setAttribute('aria-expanded', 'true');
  primaryNavigation.setAttribute('data-visible', '');
  primaryHeader.setAttribute('data-overlay', '');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMenu() {
  navToggle.setAttribute('aria-expanded', 'false');
  primaryNavigation.removeAttribute('data-visible');
  primaryHeader.removeAttribute('data-overlay');
  document.body.style.overflow = ''; // Restore scrolling
}

// Open menu on hamburger click
navToggle.addEventListener('click', (evt) => {
  evt.stopPropagation();
  if (primaryNavigation.hasAttribute('data-visible')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu on close button click
navClose.addEventListener('click', () => {
  closeMenu();
});

// Close menu on overlay click
primaryHeader.addEventListener('click', (evt) => {
  if (evt.target === primaryHeader && primaryNavigation.hasAttribute('data-visible')) {
    closeMenu();
  }
});

// Close menu when clicking outside (on overlay)
document.addEventListener('click', (evt) => {
  if (primaryNavigation.hasAttribute('data-visible') &&
      !primaryNavigation.contains(evt.target) &&
      !navToggle.contains(evt.target)) {
    closeMenu();
  }
});

// Close menu when clicking on navigation links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Get theme from localStorage or system preference
function getPreferredTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme on page load
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Initialize theme
const currentTheme = getPreferredTheme();
setTheme(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-switch if user hasn't manually set a theme
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Scroll animations with Intersection Observer
// Only initialize if user doesn't prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Unobserve after animation to improve performance
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade');
    animatedElements.forEach(el => animateOnScroll.observe(el));
  });
}
