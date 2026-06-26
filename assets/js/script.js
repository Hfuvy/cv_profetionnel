// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== MENU MOBILE ==========
let menuBtn = document.querySelector('#menu-btn');
let closeBtn = document.querySelector('#close-btn');
let navbar = document.querySelector('.header .flex .navbar');

menuBtn.onclick = () => {
    navbar.classList.add('active');
    document.body.style.overflow = 'hidden';
};

closeBtn.onclick = () => {
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto';
};

window.onscroll = () => {
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto';
};

document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
});

// ========== DROPDOWN MOBILE ==========
document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// ========== ACTIVE LINK ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== CARROUSEL DES AVIS ==========
let slides = document.querySelectorAll('.reviews .box-container .box');
let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    resetAutoSlide();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 6000);
}

function startAutoSlide() {
    if (slides.length > 0) {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.getElementById('prev-btn').onclick = prevSlide;
document.getElementById('next-btn').onclick = nextSlide;

const reviewsContainer = document.querySelector('.reviews');
if (reviewsContainer) {
    reviewsContainer.addEventListener('mouseenter', stopAutoSlide);
    reviewsContainer.addEventListener('mouseleave', startAutoSlide);
}

if (slides.length > 0) {
    slides.forEach((slide, index) => {
        if (index === 0) slide.classList.add('active');
        else slide.classList.remove('active');
    });
    startAutoSlide();
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== COMPTEURS ==========
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ========== SCROLL REVEAL ==========
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollReveal() {
    const elements = document.querySelectorAll('.box, .cert-card, .project-card, .exp-card, .edu-card, .stat-box, .timeline-item, .partner');
    elements.forEach((el, index) => {
        if (isElementInViewport(el)) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

document.querySelectorAll('.box, .cert-card, .project-card, .exp-card, .edu-card, .stat-box, .timeline-item, .partner').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(3rem)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', () => {
    setTimeout(handleScrollReveal, 300);
    setTimeout(animateCounters, 500);
});

// ========== FORMULAIRE ==========
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }

        const btn = this.querySelector('.btn');
        const originalText = btn.value;
        btn.value = 'Envoi en cours...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Merci ${name} ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.`);
            this.reset();
            btn.value = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// ========== FAQ ACCORDÉON ==========
document.querySelectorAll('.faq-list details').forEach(detail => {
    detail.addEventListener('click', function() {
        const isOpen = this.open;
        document.querySelectorAll('.faq-list details').forEach(d => d.open = false);
        this.open = !isOpen;
    });
});

// ========== ANNÉE DYNAMIQUE ==========
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

console.log('🚀 Portfolio de Fokou Fosso Jordan chargé avec succès !');
console.log('💻 Développeur Full-Stack & Spécialiste en Cybersécurité');