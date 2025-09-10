// Auto-injected agent type (safe global)
const agentType = "website";
// Global fallback for any window references
window.__CS_AGENT_TYPE = "website";


(function() {
  'use strict';

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile menu functionality
  function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() {
        document.body.classList.toggle('nav-open');
      });
      
      // Close mobile menu when clicking a link
      if (mobileLinks) {
        mobileLinks.forEach(link => {
          link.addEventListener('click', function() {
            document.body.classList.remove('nav-open');
          });
        });
      }
    }
  }

  // Sticky header
  function setupStickyHeader() {
    const header = document.querySelector('.site-header');
    
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.style.padding = '10px 0';
          header.style.background = 'rgba(6, 10, 18, 0.95)';
        } else {
          header.style.padding = '16px 0';
          header.style.background = 'rgba(10, 14, 23, 0.8)';
        }
      });
    }
  }

  // Smooth scrolling for anchor links
  function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    if (links) {
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          
          if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
              const headerHeight = document.querySelector('.site-header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }
  }

  // Testimonial slider
  function setupTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (track && prevBtn && nextBtn && dots.length > 0) {
      let currentSlide = 0;
      const slideCount = track.children.length;
      
      function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
      }
      
      // Event listeners
      prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
      nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
      
      // Dot navigation
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
      });
      
      // Auto-advance slides
      let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
      
      // Pause on hover
      track.addEventListener('mouseenter', () => clearInterval(slideInterval));
      track.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
      });
      
      // Initialize
      goToSlide(0);
    }
  }

  // Counter animation
  function setupCounters() {
    const counters = document.querySelectorAll('.counter-value');
    
    if (counters.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 2000; // ms
            const step = target / duration * 10;
            let current = 0;
            
            const updateCounter = () => {
              current += step;
              if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            
            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
      
      counters.forEach(counter => observer.observe(counter));
    }
  }

  // Animate elements on scroll
  function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
      // First add the pre-animation class to all elements
      requestAnimationFrame(() => {
        document.querySelectorAll('[data-animate]').forEach(el => {
          el.classList.add('pre-animation');
        });
        
        // Then set up the observer to trigger animations
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('pre-animation');
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
        
        document.querySelectorAll('[data-animate]').forEach(el => {
          observer.observe(el);
        });
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.remove('pre-animation');
        el.classList.add('animate-in');
      });
    }
  }

  // Initialize all functionality
  function init() {
    setupMobileMenu();
    setupStickyHeader();
    setupSmoothScrolling();
    setupTestimonialSlider();
    setupCounters();
    setupScrollAnimations();
  }

  // Run initialization
  if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();