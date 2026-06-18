window.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('main-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    initializeEaseInAnimations();
});

function initializeEaseInAnimations() {
    const animatedElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, a, li, div, section, article, img, button, form, input, textarea'
    );

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

    let contentElementIndex = 0;
    animatedElements.forEach((el) => {
        if (el.closest('header') || el.closest('.site-footer') || el.closest('#leaflet-js-map') || el.closest('.gallery-modal')) {
            return;
        }

        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        el.style.setProperty('--animation-delay', (contentElementIndex * 0.05) + 's');
        contentElementIndex++;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('ease-in');
        } else {
            observer.observe(el);
        }
    });
}

function onYouTubeIframeAPIReady() {
  new YT.Player('mezovid', {
    events: {
      onReady: function(event) {
        event.target.setVolume(35);
      }
    }
  });
}