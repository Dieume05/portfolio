// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Prevent double-tap zoom on buttons
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target) &&
        navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
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
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section > .container > *').forEach(el => {
    observer.observe(el);
});

// Animation for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// Animated Counter for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Initialize EmailJS (will be initialized after page loads)
let emailjsInitialized = false;

// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = contactForm.querySelector('.submit-btn');

// Initialize EmailJS when page loads
window.addEventListener('load', () => {
    // EmailJS configuration: set these values with your EmailJS keys.
    // NOTE: Do NOT commit secret keys to a public repo. Put keys locally or use environment secrets.
    // See EMAILJS_QUICK_SETUP.md for step-by-step instructions.
    const EMAILJS_PUBLIC_KEY = '';
    const EMAILJS_SERVICE_ID = '';
    const EMAILJS_TEMPLATE_ID = '';

    if (typeof emailjs !== 'undefined') {
        if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            emailjsInitialized = true;
            console.log('EmailJS initialized with provided keys');
        } else {
            console.log('EmailJS not configured. See EMAILJS_QUICK_SETUP.md and add EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID in script.js');
        }
    }
});

// Initialize floating labels
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    // Check if input has value on load
    if (input.value) {
        input.classList.add('has-value');
    }
    
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formMessage.classList.remove('show', 'success', 'error');
    
    // Send email - try multiple methods
    try {
        // Method 1: Try EmailJS if configured (works with local files)
        if (emailjsInitialized && typeof emailjs !== 'undefined') {
            const result = await emailjs.send(
                // Uses values from the top-level constants in the load handler
                // Make sure you filled `EMAILJS_SERVICE_ID` and `EMAILJS_TEMPLATE_ID` in this file
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    reply_to: email
                }
            );
            
            showFormMessage(`Thanks ${name}! Your message has been sent. I'll reply to ${email} soon.`, 'success');
            
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('has-value');
            });
            
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
            return;
        }
        
        // Method 2: Try FormSubmit (requires web server)
        const formAction = contactForm.getAttribute('action');
        if (formAction && formAction.includes('formsubmit.co') && !formAction.includes('YOUR_EMAIL')) {
            // Check if running on file:// protocol
            if (window.location.protocol === 'file:') {
                showFormMessage('Please run this site through a web server. See instructions in SERVER_SETUP.md', 'error');
                // Fallback to mailto
                const subject = encodeURIComponent(`Contact from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                window.location.href = `mailto:dieumdieum31@gmail.com?subject=${subject}&body=${body}`;
            } else {
                // Running on server - submit normally
                contactForm.submit();
                return;
            }
        }
        
        // Method 3: Fallback to mailto (always works)
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:dieumdieum31@gmail.com?subject=${subject}&body=${body}`;
        
        showFormMessage(`Thanks ${name}! Opening your email client. If it doesn't open, contact me at dieumdieum31@gmail.com`, 'success');
        
        contactForm.reset();
        formInputs.forEach(input => {
            input.classList.remove('has-value');
        });
        
    } catch (error) {
        console.error('Form submission error:', error);
        // Ultimate fallback - open email client
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:dieumdieum31@gmail.com?subject=${subject}&body=${body}`;
        showFormMessage('Opening email client. If it doesn\'t work, email me at dieumdieum31@gmail.com', 'success');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type} show`;
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Project Links Handler
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // If link is placeholder, show message and prevent navigation
        if (href === '#' || href === '' || href.includes('your-')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Optionally show a message or do nothing
                console.log('Project link needs to be configured. Update the href in index.html');
            });
            
            // Add visual indicator that link needs configuration
            link.style.opacity = '0.7';
            link.style.cursor = 'not-allowed';
            link.setAttribute('title', 'Update this link with your project URL');
        } else {
            // Valid link - ensure it opens in new tab
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Add click tracking (optional - for analytics)
            link.addEventListener('click', function() {
                const projectType = this.getAttribute('data-project');
                const projectName = this.closest('.project-card').querySelector('h3').textContent;
                console.log(`Opening ${projectType} for: ${projectName}`);
                // You can add analytics tracking here if needed
            });
        }
    });
    
    // Highlight current section on load
    highlightNavigation();
    
    // Prevent iOS double-tap zoom on buttons
    const buttons = document.querySelectorAll('button, .btn, a.btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function(e) {
            // Allow single tap
        }, { passive: true });
    });
    
    // Improve form input experience on mobile
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Prevent zoom on focus for iOS (font-size: 16px already set in CSS)
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                // Scroll input into view with offset
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
});



