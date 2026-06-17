window.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('main-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Initialize ease-in animations
    initializeEaseInAnimations();
});

function initializeEaseInAnimations() {
    // Get all elements on the page (excluding header, nav, and script tags)
    const animatedElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, a, li, div, section, article, img, button, form, input, textarea'
    );

    // Intersection Observer to trigger animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ease-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Track elements in main content area for staggered animation on load
    let contentElementIndex = 0;
    animatedElements.forEach((el) => {
        // Skip header, footer, map, and gallery modal (including all children inside them)
        if (el.closest('header') || el.closest('.site-footer') || el.closest('#leaflet-js-map') || el.closest('.gallery-modal')) {
            return;
        }

        // Set initial state only for content elements
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        // Set animation delay for staggered effect (reduced delay)
        el.style.setProperty('--animation-delay', (contentElementIndex * 0.05) + 's');
        contentElementIndex++;

        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('ease-in');
        } else {
            observer.observe(el);
        }
    });
}