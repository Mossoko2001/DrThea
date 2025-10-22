// Variables globales
let navbar, hamburger, navMenu, scrollIndicator;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    initScrollAnimations();
    setupSmoothScrolling();
    highlightActiveNavLink();
});

// Initialiser les éléments du DOM
function initializeElements() {
    navbar = document.getElementById('navbar');
    hamburger = document.getElementById('hamburger');
    navMenu = document.getElementById('nav-menu');
    scrollIndicator = document.querySelector('.scroll-indicator');
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Navigation hamburger
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Scroll pour navbar et animations
    window.addEventListener('scroll', handleScroll);
    
    // Redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const sendMailtoBtn = document.getElementById('sendMailtoBtn');
    if (contactForm && sendMailtoBtn) {
        sendMailtoBtn.addEventListener('click', openMailto);
    }
    
    // Indicateur de scroll
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('parcours').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Toggle menu mobile
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prévenir le scroll du body quand le menu est ouvert
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Fermer le menu mobile
function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Gérer le scroll
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar background change
    if (navbar) {
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Hide/show scroll indicator
    if (scrollIndicator) {
        if (scrollTop > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
    
    // Animations au scroll
    animateOnScroll();
    
    // Highlight active nav link
    highlightActiveNavLink();
}

// Gérer le redimensionnement
function handleResize() {
    // Fermer le menu mobile si on passe en desktop
    if (window.innerWidth > 968) {
        closeMobileMenu();
    }
}

// Animations au scroll
function initScrollAnimations() {
    // Ajouter la classe scroll-animate aux éléments à animer
    const animatedElements = document.querySelectorAll(`
        .timeline-item,
        .expertise-card,
        .publication-card,
        .stat-card,
        .achievement-item
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
    });
}

function animateOnScroll() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const windowHeight = window.innerHeight;
    
    scrollElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

// Navigation smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight active navigation link
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Gérer le formulaire de contact
function handleContactForm(e) {
    if (e) e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    // Validation basique
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    if (!name || !email || !subject || !message) {
        formStatus.innerHTML = '<div class="alert alert-danger">Veuillez remplir tous les champs.</div>';
        return false;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.innerHTML = '<div class="alert alert-danger">Veuillez entrer une adresse email valide.</div>';
        return false;
    }
    
    return true;
}

// Fonction pour ouvrir le client mail avec mailto
function openMailto() {
    if (!handleContactForm()) return;
    
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    // Préparer le corps du message avec les informations du formulaire
    const body = `De: ${name} (${email})\n\n${message}`;
    
    // Encoder les paramètres pour l'URL
    const mailtoLink = `mailto:Juniorthea@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Ouvrir le client mail
    window.location.href = mailtoLink;
    
    // Afficher un message de confirmation
    const formStatus = document.getElementById('form-status');
    formStatus.innerHTML = '<div class="alert alert-success">Votre client mail a été ouvert avec votre message.</div>';
    
    // Réinitialiser le formulaire après un court délai
    setTimeout(() => {
        form.reset();
    }, 1000);
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles CSS pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        backgroundColor: type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        fontWeight: '500'
    });
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Effet de frappe pour le titre
function typeWriter(element, text, speed = 50) {
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

// Parallax effect pour le hero
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Animation de compteur pour les statistiques
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    });
}

// Intersection Observer pour les animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animer les compteurs quand la section stats est visible
                if (entry.target.classList.contains('stats-grid')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les éléments animés
    document.querySelectorAll('.scroll-animate, .stats-grid').forEach(el => {
        observer.observe(el);
    });
}

// Effet de hover pour les cartes
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.expertise-card, .publication-card, .achievement-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Lazy loading pour les images
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialisation avancée
document.addEventListener('DOMContentLoaded', function() {
    // Délai pour laisser le CSS se charger
    setTimeout(() => {
        setupIntersectionObserver();
        setupCardHoverEffects();
        setupLazyLoading();
        
        // Animation initiale du titre si souhaité
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && heroTitle.dataset.typewriter === 'true') {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 100);
        }
    }, 100);
});

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Optionnel: signaler l'erreur à un service de monitoring
});

// Performance monitoring
function measurePerformance() {
    window.addEventListener('load', () => {
        if (performance.getEntriesByType('navigation')[0]) {
            const loadTime = performance.getEntriesByType('navigation')[0].duration;
            console.log(`Temps de chargement: ${Math.round(loadTime)}ms`);
        }
    });
}

// Initialiser le monitoring de performance
measurePerformance();

// Fonctions utilitaires
const utils = {
    // Debounce function pour optimiser les événements de scroll/resize
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Détection du support des fonctionnalités
    supportsIntersectionObserver: function() {
        return 'IntersectionObserver' in window;
    }
};

// Utiliser le debounce pour optimiser le scroll
if (typeof handleScroll !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', utils.throttle(handleScroll, 16)); // 60fps
}

// Export pour utilisation modulaire si besoin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils, setupIntersectionObserver, animateCounters };
}

// Fonctionnement du carrousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    let currentIndex = 0;
    const slideWidth = 100; // En pourcentage
    
    // Fonction pour déplacer le carrousel
    function moveSlides() {
        container.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
    
    // Événements pour les boutons
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        moveSlides();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        moveSlides();
    });
    
    // Défilement automatique toutes les 5 secondes
    setInterval(function() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        moveSlides();
    }, 5000);
});

// Validation du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Validation côté client avant soumission
    contactForm.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('form-status');
        
        // Vérification des champs
        if (name === '' || email === '' || subject === '' || message === '') {
            if (formStatus) {
                formStatus.innerHTML = '<div class="alert alert-danger">Veuillez remplir tous les champs du formulaire.</div>';
            }
            event.preventDefault();
            return false;
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (formStatus) {
                formStatus.innerHTML = '<div class="alert alert-danger">Veuillez entrer une adresse email valide.</div>';
            }
            event.preventDefault();
            return false;
        }
        
        // Si tout est valide, le formulaire sera soumis normalement
        return true;
    });
});