// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Character Counter for Textarea =====
const mensaje = document.getElementById('mensaje');
const charCount = document.getElementById('charCount');

if (mensaje && charCount) {
    mensaje.addEventListener('input', () => {
        const count = mensaje.value.length;
        charCount.textContent = count;
        
        if (count > 500) {
            mensaje.value = mensaje.value.substring(0, 500);
            charCount.textContent = 500;
        }
        
        if (count >= 450) {
            charCount.style.color = '#DC2626';
        } else {
            charCount.style.color = '#6B7280';
        }
    });
}

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.nombre || !data.email || !data.tipo || !data.mensaje) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
        charCount.textContent = '0';
    });
}

// ===== Smooth Scroll for All Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('.servicio-card, .equipo-card, .info-card');

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

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ===== Stats Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            
            // Check if it's a number or contains special characters
            if (finalValue.includes('/') || finalValue.includes('+')) {
                // Handle special cases like "24/7" or "85+"
                target.style.opacity = '1';
            } else {
                // Animate numeric values
                const numericValue = parseInt(finalValue);
                if (!isNaN(numericValue)) {
                    animateCounter(target, numericValue);
                }
            }
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Message =====
console.log('%c🔥 Compañía de Bomberos 1 de Teno', 'font-size: 24px; font-weight: bold; color: #DC2626;');
console.log('%cSiempre Listos, Siempre Valientes', 'font-size: 14px; color: #1E3A5F;');
console.log('%cProtegiendo nuestra comunidad desde 1940', 'font-size: 12px; color: #6B7280;');
