// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Media Tab Functionality with Screenshot Navigation and Video-Grid Hiding
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const targetTab = button.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
            // Hide video-grid when screenshots is active
            const videoGrid = document.querySelector('#videos .video-grid');
            if (targetTab === 'screenshots' && videoGrid) {
                videoGrid.style.display = 'none';
            } else if (videoGrid) {
                videoGrid.style.display = 'block';
            }
            if (targetTab === 'screenshots') {
                initializeScreenshotNavigation();
            }
        }
    });
});

// Screenshot navigation
function initializeScreenshotNavigation() {
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    let currentIndex = 0;

    if (screenshotItems.length <= 1) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        return;
    }

    function updateDisplay() {
        screenshotItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) item.classList.add('active');
        });
        leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
        rightArrow.style.display = currentIndex < screenshotItems.length - 1 ? 'block' : 'none';
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateDisplay();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < screenshotItems.length - 1) {
            currentIndex++;
            updateDisplay();
        }
    });

    updateDisplay();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-item, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Function to update progress bar
    function updateProgressBar(amountRaised) {
        const goal = 100000; // $100,000 goal
        const progressFill = document.querySelector('.progress-fill');
        const raisedStat = document.querySelector('.funding-stats .stat-item:first-child .stat-number');
        const percentStat = document.querySelector('.funding-stats .stat-item:last-child .stat-number');

        if (progressFill && raisedStat && percentStat) {
            const percentage = (amountRaised / goal) * 100;
            const clampedPercentage = Math.min(Math.max(percentage, 0), 100); // Ensure 0% to 100%
            progressFill.style.width = `${clampedPercentage}%`;
            raisedStat.textContent = `$${amountRaised.toLocaleString()}`;
            percentStat.textContent = `${Math.round(clampedPercentage)}%`;
        }
    }

    // Example: Set initial amount (e.g., $0 raised)
    updateProgressBar(0); // Change this value to reflect actual funding

    // Initialize screenshot navigation if screenshots tab is active on load
    if (document.getElementById('screenshots').classList.contains('active')) {
        initializeScreenshotNavigation();
    }

    // Ensure video-grid is visible on initial load if videos tab is active
    const videoGrid = document.querySelector('#videos .video-grid');
    if (videoGrid && document.querySelector('.tab-btn.active').getAttribute('data-tab') === 'videos') {
        videoGrid.style.display = 'block';
    }
});

// Glitch effect for logo on hover
const mainLogo = document.querySelector('.main-logo');
if (mainLogo) {
    mainLogo.addEventListener('mouseenter', () => {
        mainLogo.style.animation = 'none';
        setTimeout(() => {
            mainLogo.style.animation = 'logoGlow 0.5s ease-in-out infinite alternate';
        }, 10);
    });
    
    mainLogo.addEventListener('mouseleave', () => {
        mainLogo.style.animation = 'logoGlow 3s ease-in-out infinite alternate';
    });
}

// Button click effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #ff0000, #00ffff);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', throttle(updateScrollProgress, 16));

// Throttle function
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


