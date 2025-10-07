// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initStatisticsCounter();
    initTestimonialsSlider();
    initProjectFiltering();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
    initHeaderScrollEffect();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link');
    const heroActions = document.querySelectorAll('.hero__actions a');
    const allSmoothLinks = [...navLinks, ...heroActions];

    allSmoothLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Statistics Counter Animation
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);

    const statisticsSection = document.querySelector('.statistics');
    if (statisticsSection) {
        observer.observe(statisticsSection);
    }

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// Testimonials Slider - Fixed version
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    let autoPlayInterval;

    if (testimonialCards.length === 0) return;

    function showTestimonial(index) {
        // Ensure index is within bounds
        if (index >= testimonialCards.length) {
            currentTestimonial = 0;
        } else if (index < 0) {
            currentTestimonial = testimonialCards.length - 1;
        } else {
            currentTestimonial = index;
        }

        // Remove active class from all testimonials
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === currentTestimonial) {
                // Add active class with a small delay for animation
                setTimeout(() => {
                    card.classList.add('active');
                }, 50);
            }
        });
    }

    function nextTestimonial() {
        const nextIndex = currentTestimonial + 1;
        showTestimonial(nextIndex >= testimonialCards.length ? 0 : nextIndex);
    }

    function prevTestimonial() {
        const prevIndex = currentTestimonial - 1;
        showTestimonial(prevIndex < 0 ? testimonialCards.length - 1 : prevIndex);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearInterval(autoPlayInterval);
            nextTestimonial();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearInterval(autoPlayInterval);
            prevTestimonial();
            startAutoPlay();
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    // Pause auto-play on hover
    const testimonialSlider = document.querySelector('.testimonials__slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    // Initialize first testimonial and start auto-play
    showTestimonial(0);
    startAutoPlay();
}

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            try {
                await simulateFormSubmission();
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Form validation
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error styling
    input.classList.remove('error');
    
    // Basic validation
    if (input.hasAttribute('required') && !value) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (input.type === 'tel' && value) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showInputError(input, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    // Create or update error message
    let errorMsg = input.parentNode.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = 'color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;';
        input.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearValidationError(e) {
    const input = e.target;
    input.classList.remove('error');
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulation error'));
            }
        }, 2000);
    });
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#dc2626'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initialize hidden state
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .service-detail-card, .project-card, .value-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Initialize header transition
    header.style.transition = 'all 0.3s ease';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS for error state
const style = document.createElement('style');
style.textContent = `
    .form-control.error {
        border-color: #dc2626 !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
    
    .error-message {
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    @media (max-width: 768px) {
        .notification {
            left: 20px !important;
            right: 20px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Use passive event listeners where appropriate
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects are handled in other functions
}, 16), { passive: true });

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical image URLs here if needed
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize resource preloading
preloadResources();