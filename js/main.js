/**
 * main.js - Main JavaScript file for GSouza Tecnologia
 * Version: 1.0.0
 * Author: GSouza Tecnologia
 */

// Main JavaScript for GSouza Tecnologia Website
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Initialize mobile menu
  initMobileMenu();

  // Initialize typewriter effect
  initTypewriter();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize scroll behavior
  initSmoothScroll();

  // Initialize navigation scroll effect
  initNavigationScrollEffect();
});

// Mobile menu functionality
function initMobileMenu() {
  const menuButton = document.createElement('button');
  menuButton.className = 'mobile-menu-toggle';
  menuButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  menuButton.setAttribute('aria-label', 'Abrir menu');

  const navigation = document.querySelector('.container-navigation');
  if (navigation) {
    navigation.appendChild(menuButton);
  }

  const navMenu = document.getElementById('nav-menu');

  menuButton.addEventListener('click', function () {
    if (navMenu) {
      navMenu.classList.toggle('active');
      if (navMenu.classList.contains('active')) {
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'Fechar menu');
      } else {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu');
      }
    }
  });

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll('.navigation-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 991 && navMenu) {
        navMenu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu');
      }
    });
  });
}

// Typewriter effect
function initTypewriter() {
  const typewriterElement = document.getElementById('type');
  if (typewriterElement) {
    new Typewriter(typewriterElement, {
      strings: ['cliente', 'negócio', 'projeto', 'fornecedor'],
      autoStart: true,
      loop: true,
      delay: 75,
      deleteSpeed: 50,
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.service-card, .logo-wrap, .image-block'
  );

  if (animatedElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth',
        });
      }
    });
  });
}

// Navigation scroll effect
function initNavigationScrollEffect() {
  const navigation = document.querySelector('.navigation');

  if (navigation) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navigation.classList.add('scrolled');
      } else {
        navigation.classList.remove('scrolled');
      }
    });
  }
}
