const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll animations with IntersectionObserver
const fadeElements = document.querySelectorAll('.fade-up');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Thank you! We wll contact you soon.';
    btn.style.background = '#2d5a4a';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        this.reset();
    }, 3000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0002})`;
    }
});

// Add typing effect to hero tagline (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when hero is visible
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(heroTagline, originalText, 60);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    heroObserver.observe(heroTagline);
}
// Enhanced form submission with loading state
document.getElementById('contactForm').addEventListener('submit', function(e) {
    const btn = this.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.8';
    
    // Let the form submit naturally to FormSubmit
    // The _next parameter handles redirect
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.opacity = '1';
    }, 2000);
});