// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Loader ausblenden nach Seitenladung
    setTimeout(function() {
        const loader = document.querySelector('.loader-container');
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // GSAP Animationen initialisieren
    initializeGSAP();
    
    // Custom Cursor
    initializeCustomCursor();
    
    // Navigation sticky machen beim Scrollen
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        toggleMenuAnimation(this);
    });
    
    // Schließen des Menüs beim Klicken auf einen Link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            resetMenuAnimation(menuToggle);
        });
    });
    
    // Smooth Scroll für Navigation Links
    initializeSmoothScroll();
    
    // Skill Progress Bars Animation
    initializeSkillsAnimation();
    
    // Projektkategorien Filter
    initializeProjectFilter();
    
    // Kontaktformular Validierung und Submission
    initializeContactForm();
});

// GSAP Animationen
function initializeGSAP() {
    // Registriere ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Section Animation
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out'
    });
    
    // Scroll Indicator Animation
    gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2,
        ease: 'power3.out'
    });
    
    // About Section Animation
    gsap.from('.profile-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.bio', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Skills Section Animation
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Projects Section Animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Contact Section Animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out'
    });

    // Section Headers Animation
    gsap.from('.section-header', {
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            markers: false
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// Custom Cursor Funktion
function initializeCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Cursor anzeigen, wenn die Maus bewegt wird
    document.addEventListener('mousemove', function(e) {
        cursor.style.opacity = '1';
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    });
    
    // Cursor ausblenden, wenn die Maus das Fenster verlässt
    document.addEventListener('mouseout', function() {
        cursor.style.opacity = '0';
    });
    
    // Cursor-Effekt bei hover über Links, Buttons etc.
    const links = document.querySelectorAll('a, button, .btn, .project-card, .social-icon');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.classList.add('active');
        });
        link.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
        });
    });
}

// Mobile Menu Toggle Animation
function toggleMenuAnimation(element) {
    element.classList.toggle('active');
    const spans = element.querySelectorAll('span');
    
    if (element.classList.contains('active')) {
        // Hamburger zu X Animation
        gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, x: -10, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
    } else {
        // X zu Hamburger Animation
        resetMenuAnimation(element);
    }
}

// Mobile Menu Reset Animation
function resetMenuAnimation(element) {
    const spans = element.querySelectorAll('span');
    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, x: 0, duration: 0.3 });
    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
}

// Smooth Scroll für Navigation
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skills Cards Animation und Filter
function initializeSkillsAnimation() {
    // Animiere Skills beim Scrollen
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Skills Filter
    const filterBtns = document.querySelectorAll('.filter-skill-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktiven Button umschalten
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Skills filtern
            skillCards.forEach(card => {
                if (filter === 'all') {
                    gsap.to(card, { 
                        opacity: 1, 
                        scale: 1, 
                        duration: 0.5,
                        ease: 'power1.out',
                        clearProps: "all" 
                    });
                    card.style.display = 'flex';
                } else if (card.getAttribute('data-category') === filter) {
                    gsap.to(card, { 
                        opacity: 1, 
                        scale: 1, 
                        duration: 0.5,
                        ease: 'power1.out',
                        clearProps: "all"
                    });
                    card.style.display = 'flex';
                } else {
                    gsap.to(card, { 
                        opacity: 0, 
                        scale: 0.8, 
                        duration: 0.5,
                        ease: 'power1.out',
                        onComplete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Hover-Effekt für Skill-Karten
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.skill-icon'), {
                y: -20,
                opacity: 0.3,
                duration: 0.3
            });
            gsap.to(this.querySelector('h3'), {
                opacity: 0,
                duration: 0.3
            });
            gsap.to(this.querySelector('.skill-overlay'), {
                opacity: 1,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.skill-icon'), {
                y: 0,
                opacity: 1,
                duration: 0.3
            });
            gsap.to(this.querySelector('h3'), {
                opacity: 1,
                duration: 0.3
            });
            gsap.to(this.querySelector('.skill-overlay'), {
                opacity: 0,
                duration: 0.3
            });
        });
    });
}

// Projekt Filter Funktion
function initializeProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktiven Button umschalten
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Projekte filtern
            projectCards.forEach(card => {
                if (filter === 'all') {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.5 });
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.5 });
                    card.style.display = 'block';
                } else {
                    gsap.to(card, { 
                        opacity: 0, 
                        scale: 0.8, 
                        duration: 0.5,
                        onComplete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Kontaktformular Validierung
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form Felder
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Einfache Validierung
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Bitte fülle alle Felder aus.');
                return;
            }
            
            // Simuliere Formularversand
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            
            // Simuliere Verzögerung für Feedback
            setTimeout(function() {
                // Erfolgreiche Übermittlung simulieren
                alert('Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.');
                
                // Formular zurücksetzen
                contactForm.reset();
                
                // Button zurücksetzen
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    }
}

// Typ-Effekt für Hero Sektion
document.addEventListener('DOMContentLoaded', function() {
    const titles = ["Schüler", "Webentwickler", "Designer"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    
    function type() {
        if (count === titles.length) {
            count = 0;
        }
        currentText = titles[count];
        letter = currentText.slice(0, ++index);
        
        document.querySelector('.subtitle').textContent = letter;
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 150);
        }
    }
    
    // Typ-Effekt starten nach kurzer Verzögerung
    setTimeout(type, 2000);
});