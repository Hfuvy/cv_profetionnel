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

if (menuBtn) {
    menuBtn.onclick = () => {
        navbar.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
}

if (closeBtn) {
    closeBtn.onclick = () => {
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
}

window.onscroll = () => {
    if (navbar) {
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        if (navbar) {
            navbar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
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

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (prevBtn) {
    prevBtn.onclick = prevSlide;
}

if (nextBtn) {
    nextBtn.onclick = nextSlide;
}

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
    const threshold = 100;
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - threshold &&
        rect.bottom >= threshold
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

// ========== SCROLL TO TOP ==========
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== BARRE DE PROGRESSION ==========
const progressBar = document.createElement('div');
progressBar.id = 'progressBar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ========== FILTRE DES CERTIFICATIONS ==========
const certSearch = document.getElementById('certSearch');
const filterBtns = document.querySelectorAll('.filter-btn');

if (certSearch) {
    certSearch.addEventListener('input', function(e) {
        const search = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.cert-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const platform = card.querySelector('.platform')?.textContent.toLowerCase() || '';
            card.style.display = (title.includes(search) || platform.includes(search)) ? 'flex' : 'none';
        });
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        document.querySelectorAll('.cert-card').forEach(card => {
            if (filter === 'all') {
                card.style.display = 'flex';
                return;
            }
            const platform = card.querySelector('.platform')?.textContent.toLowerCase() || '';
            card.style.display = platform.includes(filter) ? 'flex' : 'none';
        });

        if (certSearch) certSearch.value = '';
    });
});

// ========== THEME TOGGLE (DARK MODE) - RETIRÉ ==========
// Le bouton themeToggle est masqué en CSS, cette fonction est désactivée
// Le dark mode a été complètement retiré du CSS

// ========== KEYBOARD ACCESSIBILITY DROPDOWN ==========
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');
            const expanded = dropdown.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        }
    });
});

// ========== CONSOLE ==========
console.log(' Portfolio de Fokou Fosso Jordan chargé avec succès !');
console.log('Développeur Full-Stack & Spécialiste en Cybersécurité');