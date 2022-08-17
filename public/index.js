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
