const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNavigation = document.querySelector('.primary-navigation');

navToggle.addEventListener('click', (evt) => {
  evt.stopPropagation();
  primaryNavigation.hasAttribute('data-visible')
    ? navToggle.setAttribute('aria-expanded', 'false')
    : navToggle.setAttribute('aria-expanded', 'true');
  primaryNavigation.toggleAttribute('data-visible');
  primaryHeader.toggleAttribute('data-overlay');
});

document.addEventListener('click', () => {
  if (primaryNavigation.hasAttribute('data-visible')) {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNavigation.removeAttribute('data-visible');
    primaryHeader.removeAttribute('data-overlay');
  }
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
