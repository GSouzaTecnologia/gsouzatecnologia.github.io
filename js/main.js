/**
 * main.js - Main JavaScript file for GSouza Tecnologia
 * Version: 1.0.0
 * Author: GSouza Tecnologia
 */

// Navigation Module - Handles all navigation functionality
const Navigation = (function () {
  // Initialize navigation functionality
  function init() {
    setupMobileMenu();
    setupScrollDetection();
    setupSmoothScrolling();
  }

  // Mobile menu functionality
  function setupMobileMenu() {
    // DOM elements
    const navigation = document.querySelector('.container-navigation');
    const navLinks = document.querySelector('.navigation-link-wrap');

    if (!navigation || !navLinks) return;

    // Create mobile menu button if it doesn't exist
    let mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    if (!mobileMenuButton) {
      mobileMenuButton = document.createElement('button');
      mobileMenuButton.className = 'mobile-menu-toggle';
      mobileMenuButton.setAttribute('aria-label', 'Menu');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';

      navigation.appendChild(mobileMenuButton);
    }

    // Force SVG icon to be visible for better compatibility
    const updateSVGStyle = () => {
      const svg = mobileMenuButton.querySelector('svg');
      if (svg) {
        svg.style.display = 'block';
        svg.style.width = '24px';
        svg.style.height = '24px';
      }
    };

    updateSVGStyle();

    // Toggle mobile menu with improved event handling
    mobileMenuButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Toggle the active class
      navLinks.classList.toggle('active');

      // Change icon when menu is open
      if (navLinks.classList.contains('active')) {
        mobileMenuButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        mobileMenuButton.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenuButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }

      // Update SVG styles again after changing the icon
      updateSVGStyle();
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.navigation-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        updateSVGStyle();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (
        !event.target.closest('.navigation-link-wrap') &&
        !event.target.closest('.mobile-menu-toggle') &&
        navLinks.classList.contains('active')
      ) {
        navLinks.classList.remove('active');
        mobileMenuButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        updateSVGStyle();
      }
    });
  }

  // Detect scroll position to change navbar style
  function setupScrollDetection() {
    window.addEventListener('scroll', function () {
      const nav = document.querySelector('.navigation');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    });
  }

  // Add smooth scrolling for anchor links
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight =
            document.querySelector('.navigation')?.offsetHeight || 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: targetPosition - navHeight - 20,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  return {
    init: init,
  };
})();

// Animation Module - Handles all animations and effects
const Animation = (function () {
  // Initialize animations
  function init() {
    setupTypewriter();
    setupLazyLoad();
    setupScrollAnimations();
  }

  // Typewriter effect
  function setupTypewriter() {
    if (typeof Typewriter !== 'undefined' && document.getElementById('type')) {
      new Typewriter('#type', {
        strings: ['cliente', 'parceiro', 'fornecedor', 'colaborador'],
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 50,
        pauseFor: 1500,
      });
    }
  }

  // Lazy loading images
  function setupLazyLoad() {
    const lazyImages = document.querySelectorAll('[data-src]');

    const lazyLoad = (target) => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            const srcset = img.getAttribute('data-srcset');

            if (src) img.src = src;
            if (srcset) img.srcset = srcset;

            img.classList.add('loaded');
            observer.disconnect();
          }
        });
      });

      io.observe(target);
    };

    lazyImages.forEach(lazyLoad);
  }

  // Animation on scroll
  function setupScrollAnimations() {
    const animateElements = document.querySelectorAll(
      '.service-card, .logo-wrap, .image-block'
    );

    const animateOnScroll = (target) => {
      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      io.observe(target);
    };

    animateElements.forEach(animateOnScroll);
  }

  return {
    init: init,
  };
})();

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  Navigation.init();
  Animation.init();
});
