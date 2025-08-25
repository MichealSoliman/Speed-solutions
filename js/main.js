// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'fas fa-bars';
    } else {
        icon.className = 'fas fa-times';
    }
});

// Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('bg-white/98');
        navbar.classList.remove('bg-white/95');
    } else {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/98');
    }
    
    // Hide/Show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card-hover, .animate-fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
});

document.querySelectorAll('.text-3xl.font-black').forEach(counter => {
    counterObserver.observe(counter);
});

// Floating Animation for Hero Elements
function createFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-overlay');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    createFloatingAnimation();
});

// Contact Form Handling (if form exists)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `مرحباً، اسمي ${name}%0Aرقم الهاتف: ${phone}%0Aالرسالة: ${message}`;
        const whatsappURL = `https://wa.me/966500000000?text=${whatsappMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('تم إرسال رسالتك بنجاح! سيتم التواصل معك قريباً.', 'success');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Emergency Call Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track emergency calls (you can integrate with analytics here)
        console.log('Emergency call initiated');
        showNotification('جاري الاتصال... سيتم الرد عليك فوراً', 'info');
    });
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track WhatsApp clicks (you can integrate with analytics here)
        console.log('WhatsApp contact initiated');
        showNotification('جاري فتح واتساب...', 'info');
    });
});

// Scroll to Top Functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Add scroll to top button if it doesn't exist
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('scroll-to-top')) {
        const scrollButton = document.createElement('button');
        scrollButton.id = 'scroll-to-top';
        scrollButton.className = 'fixed bottom-24 left-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 z-40';
        scrollButton.style.display = 'none';
        scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollButton.onclick = scrollToTop;
        document.body.appendChild(scrollButton);
    }
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical resources
    const criticalImages = [
        'assets/images/hero-bg.jpg',
        'assets/images/technician.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .loaded .animate-fade-in {
        animation: fadeIn 0.8s ease-in-out forwards;
    }
    
    .loaded .animate-slide-up {
        animation: slideUp 0.8s ease-out forwards;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

