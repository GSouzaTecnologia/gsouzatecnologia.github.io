/**
 * main.js - Main JavaScript file for GSouza Tecnologia
 * Liquid Glass Design System - Minimal Implementation
 */

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Navigation scroll effect - Liquid Glass transformation
  const nav = document.querySelector('.nav');
  let scrollThreshold = 100;

  const updateNavigation = () => {
    const currentScroll = window.pageYOffset;

    // Add or remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateNavigation);
  });

  // Initial check
  updateNavigation();

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }

  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement && typeof Typewriter !== 'undefined') {
    const typewriter = new Typewriter(typewriterElement, {
      loop: true,
      delay: 75,
      deleteSpeed: 50,
      cursor: '|',
      cursorClassName: 'typewriter-cursor',
    });

    typewriter
      .typeString('negócio')
      .pauseFor(2000)
      .deleteAll()
      .typeString('startup')
      .pauseFor(2000)
      .deleteAll()
      .typeString('empresa')
      .pauseFor(2000)
      .deleteAll()
      .typeString('projeto')
      .pauseFor(2000)
      .start();
  }

  // Button hover effect with mouse tracking
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      button.style.setProperty('--x', `${x}%`);
      button.style.setProperty('--y', `${y}%`);
    });

    button.addEventListener('mouseleave', () => {
      button.style.setProperty('--x', '50%');
      button.style.setProperty('--y', '50%');
    });
  });

  // Animated counter
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
        // Add + or % suffix if needed
        if (element.parentElement.textContent.includes('%')) {
          element.textContent = target + '%';
        } else if (target === 50) {
          element.textContent = target + '+';
        }
      }
    };

    updateCounter();
  };

  // AOS-like animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class
        entry.target.classList.add('aos-animate');

        // If it's a counter, animate it
        if (
          entry.target.classList.contains('stat-number') &&
          entry.target.hasAttribute('data-count')
        ) {
          animateCounter(entry.target);
        }

        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach((el) => {
    observer.observe(el);
  });

  // Also observe stat numbers
  document.querySelectorAll('.stat-number[data-count]').forEach((el) => {
    observer.observe(el);
  });

  // Observe other elements for fade-in
  const elementsToObserve = document.querySelectorAll(
    '.service-card, .client-logo',
  );
  elementsToObserve.forEach((el) => {
    if (!el.hasAttribute('data-aos')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease-out';

      const simpleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            simpleObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      simpleObserver.observe(el);
    }
  });

  // Parallax effect for orbs
  const orbs = document.querySelectorAll('.orb, .gradient-orb');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    orbs.forEach((orb, index) => {
      const speed = 0.5 + index * 0.2;
      const yPos = -(scrolled * speed);
      orb.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img.lazyload');
    images.forEach((img) => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'js/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // Service cards hover effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(-4px) scale(1)';
    });
  });

  // Add subtle animation to tech badges
  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach((badge, index) => {
    badge.style.transition = 'all 0.3s ease';
    badge.style.transitionDelay = `${index * 50}ms`;
  });

  // Smooth reveal for hero content
  const heroElements = document.querySelectorAll('.hero > .container > *');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    setTimeout(
      () => {
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      },
      100 * (index + 1),
    );
  });

  // Add glass effect intensity on scroll
  const glassElements = document.querySelectorAll(
    '.service-card, .visual-card',
  );

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    glassElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(windowHeight / 2 - elementCenter);
      const maxDistance = windowHeight / 2;
      const intensity = 1 - distanceFromCenter / maxDistance;

      if (intensity > 0) {
        element.style.backdropFilter = `blur(${20 + intensity * 10}px)`;
        element.style.webkitBackdropFilter = `blur(${20 + intensity * 10}px)`;
      }
    });
  });

  // Add magnetic effect to CTA button
  const ctaButton = document.querySelector('.cta .btn');
  if (ctaButton) {
    const magneticStrength = 0.3;

    ctaButton.addEventListener('mousemove', (e) => {
      const rect = ctaButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      ctaButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    ctaButton.addEventListener('mouseleave', () => {
      ctaButton.style.transform = 'translate(0, 0)';
    });
  }
});
