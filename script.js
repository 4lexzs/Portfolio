// Warten bis DOM vollständig geladen ist und füge Debug-Hinweise hinzu
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM geladen - Initialisiere Portfolio...");
    
    // Verstecke alle Bilder mit alt="Edwin Alexander"
    const wrongImages = document.querySelectorAll('img[alt="Edwin Alexander"]');
    wrongImages.forEach(img => {
        img.style.display = 'none';
    });
    
    // Sofort mit der Initialisierung beginnen, nicht auf window.load warten
    // Loader ausblenden
    const loader = document.querySelector('.loader-container');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }
    
    // Sofort alle Funktionen initialisieren
    console.log("Initialisiere Funktionen...");
    try {
        initializeSmoothScroll();
        console.log("Smooth Scroll initialisiert");
    } catch (e) {
        console.error("Fehler bei Smooth Scroll:", e);
    }
    
    try {
        initializeContactForm();
        console.log("Kontaktformular initialisiert");
    } catch (e) {
        console.error("Fehler bei Kontaktformular:", e);
    }
    
    try {
        initializeCustomCursor();
        console.log("Custom Cursor initialisiert");
    } catch (e) {
        console.error("Fehler bei Custom Cursor:", e);
    }
    
    // Navigation sticky machen beim Scrollen
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Einfache Animation ohne GSAP
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active') && spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Schließen des Menüs beim Klicken auf einen Link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    console.log("Portfolio vollständig initialisiert");
});

// Custom Cursor Funktion
function initializeCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (!cursor) return;
    
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