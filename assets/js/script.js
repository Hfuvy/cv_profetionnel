// ========== MENU MOBILE ==========
let menuBtn = document.querySelector('#menu-btn');
let closeBtn = document.querySelector('#close-btn');
let navbar = document.querySelector('.header .flex .navbar');

// Ouvrir le menu
menuBtn.onclick = () => {
    navbar.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Fermer le menu
closeBtn.onclick = () => {
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Fermer le menu en scrollant
window.onscroll = () => {
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
});

// ========== CARROUSEL DES AVIS ==========
let slides = document.querySelectorAll('.reviews .box-container .box');
let currentIndex = 0;
let autoSlideInterval;

// Fonction pour afficher un slide
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

// Aller au slide précédent
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    resetAutoSlide();
}

// Aller au slide suivant
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    resetAutoSlide();
}

// Réinitialiser l'auto-défilement
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 6000);
}

// Démarrer l'auto-défilement
function startAutoSlide() {
    if (slides.length > 0) {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }
}

// Arrêter l'auto-défilement
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Événements des boutons
document.getElementById('prev-btn').onclick = prevSlide;
document.getElementById('next-btn').onclick = nextSlide;

// Pause sur hover
const reviewsContainer = document.querySelector('.reviews');
reviewsContainer.addEventListener('mouseenter', stopAutoSlide);
reviewsContainer.addEventListener('mouseleave', startAutoSlide);

// Démarrage
if (slides.length > 0) {
    // S'assurer que le premier slide est actif
    slides.forEach((slide, index) => {
        if (index === 0) slide.classList.add('active');
        else slide.classList.remove('active');
    });
    startAutoSlide();
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========== ACTIVE LINK NAVIGATION ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
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

// ========== FORMATAGE DES LIENS TÉLÉPHONE ==========
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const number = this.getAttribute('href').replace('tel:', '');
        if (window.innerWidth < 768) {
            // Sur mobile, laisser le comportement par défaut
            return true;
        } else {
            e.preventDefault();
            alert(`Appeler le ${number} ? (fonctionne sur mobile)`);
        }
    });
});

// ========== GESTION DU FORMULAIRE ==========
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
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

        // Simulation d'envoi
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

// ========== SCROLL REVEAL ANIMATION ==========
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
    const elements = document.querySelectorAll('.box, .cert-card, .project-card, .exp-card, .edu-card');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Appliquer les styles initiaux pour les animations
document.querySelectorAll('.box, .cert-card, .project-card, .exp-card, .edu-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(3rem)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', () => {
    setTimeout(handleScrollReveal, 300);
});

// ========== EFFET PARALLAX LÉGER ==========
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.home');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
    }
});

// ========== ANNÉE DYNAMIQUE DANS LE FOOTER ==========
const credit = document.querySelector('.footer .credit');
if (credit) {
    const year = new Date().getFullYear();
    credit.innerHTML = credit.innerHTML.replace('2025', year);
}

console.log(' Portfolio de Fokou Fosso Jordan chargé avec succès !');
console.log(' Développeur Full-Stack & Spécialiste en Cybersécurité');