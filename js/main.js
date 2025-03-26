// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        navbar.style.boxShadow = 'none';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.background = 'rgba(18, 18, 18, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Animate program cards on hover
const programCards = document.querySelectorAll('.program-card');

programCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.borderColor = 'var(--accent-color)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.borderColor = 'var(--border-color)';
    });
});

// Form submission handling with animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add success animation
        const button = contactForm.querySelector('button');
        button.innerHTML = '<i class="fas fa-check"></i> Sent!';
        button.style.backgroundColor = '#28a745';
        
        // Reset form and button after delay
        setTimeout(() => {
            contactForm.reset();
            button.innerHTML = 'Send Message';
            button.style.backgroundColor = '';
        }, 3000);
    });
}

// Parallax effect for about section image
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        
        if (window.innerWidth > 768) { // Only on desktop
            aboutImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Animate numbers in pricing section
const priceElements = document.querySelectorAll('.price');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    priceElements.forEach(element => {
        const targetPrice = parseInt(element.textContent.replace(/\D/g, ''));
        const span = element.querySelector('span');
        let currentPrice = 0;
        const duration = 2000; // 2 seconds
        const increment = targetPrice / (duration / 16); // 60fps
        
        const animation = setInterval(() => {
            currentPrice += increment;
            if (currentPrice >= targetPrice) {
                currentPrice = targetPrice;
                clearInterval(animation);
            }
            element.innerHTML = `$${Math.floor(currentPrice)}<span>/month</span>`;
        }, 16);
    });
    
    animated = true;
}

// Trigger number animation when pricing section is in view
const pricingSection = document.querySelector('.pricing');
if (pricingSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumbers();
        }
    }, {
        threshold: 0.2
    });
    
    observer.observe(pricingSection);
} 