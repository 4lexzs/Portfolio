// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM geladen - Initialisiere Portfolio...");
    
    // Entferne alle störenden Elemente
    const elementsToCheck = document.querySelectorAll('*');
    elementsToCheck.forEach(el => {
        // Bilder mit bestimmten Attributen entfernen
        if (el.tagName === 'IMG') {
            if (el.alt === 'Profilbild' || 
                el.alt === 'Edwin Alexander' || 
                (el.src && el.src.includes('placeholder') && !el.closest('.project-img'))) {
                el.style.display = 'none';
            }
        }
        
        // Blaue Punkte entfernen
        const computedStyle = window.getComputedStyle(el);
        if (
            computedStyle.backgroundColor === 'rgb(0, 102, 255)' || 
            computedStyle.backgroundColor === '#0066ff' ||
            computedStyle.backgroundColor === 'blue' ||
            el.classList.contains('blue-dot') ||
            (el.classList.contains('dot') && !el.closest('.loader'))
        ) {
            if (!el.classList.contains('btn') && 
                !el.classList.contains('social-icon') && 
                !el.closest('.loader')) {
                el.style.display = 'none';
            }
        }
    });
    
    // Initialisierung aller Funktionen
    initializeLoader();
    initializeNavigation();
    initializeMobileMenu();
    initializeCustomCursor();
    initializeSmoothScroll();
    initializeContactForm();
    
    console.log("Portfolio vollständig initialisiert");
});

// Loader ausblenden
function initializeLoader() {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }
}

// Navigation sticky machen beim Scrollen
function initializeNavigation() {
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
}

// Mobile Navigation Toggle
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Einfache Animation
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
}

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

// Kontaktformular mit Formspree Integration
function initializeContactForm() {
    console.log("Initialisiere Kontaktformular...");
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (!contactForm) {
        console.log("Kontaktformular nicht gefunden!");
        return;
    }
    
    console.log("Kontaktformular gefunden - füge Event Listener hinzu");
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log("Formular abgesendet!");
        
        // Form Felder
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        console.log("Formulardaten:", { name, email, subject, message });
        
        // Nachrichten verstecken
        hideMessages();
        
        // Client-seitige Validierung
        const validationError = validateForm(name, email, subject, message);
        if (validationError) {
            console.log("Validierungsfehler:", validationError);
            showErrorMessage(validationError);
            return;
        }
        
        // Button Status ändern
        const originalBtnText = submitBtn.innerHTML;
        setButtonLoading(submitBtn, true);
        
        try {
            console.log("Sende Daten an Formspree...");
            
            // FormData für Formspree erstellen
            const formData = new FormData(contactForm);
            
            // Fetch Request an Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log("Formspree Response:", response.status);
            
            if (response.ok) {
                console.log("Formular erfolgreich gesendet!");
                // Erfolgreich gesendet
                showSuccessMessage();
                contactForm.reset();
                
                // Smooth scroll zum Erfolg-Message
                if (successMessage) {
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
                
            } else {
                console.log("Fehler beim Senden");
                // Fehler beim Senden
                let errorMsg = 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es erneut.';
                
                try {
                    const data = await response.json();
                    if (data.errors && data.errors.length > 0) {
                        errorMsg = 'Fehler: ' + data.errors.map(error => error.message).join(', ');
                    }
                } catch (e) {
                    console.log("Konnte Fehler-JSON nicht parsen");
                }
                
                showErrorMessage(errorMsg);
            }
        } catch (error) {
            // Netzwerk- oder andere Fehler
            console.error('Formular-Fehler:', error);
            showErrorMessage('Netzwerkfehler. Bitte überprüfe deine Internetverbindung und versuche es erneut.');
        } finally {
            // Button zurücksetzen
            setButtonLoading(submitBtn, false, originalBtnText);
        }
    });
    
    // Auto-hide Nachrichten nach 5 Sekunden
    function autoHideMessage(element) {
        setTimeout(() => {
            if (element && element.style.display === 'block') {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.display = 'none';
                    element.style.opacity = '1';
                }, 500);
            }
        }, 5000);
    }
    
    // Observer für Auto-Hide
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.id === 'successMessage' && target.style.display === 'block') {
                        autoHideMessage(target);
                    }
                    if (target.id === 'errorMessage' && target.style.display === 'block') {
                        autoHideMessage(target);
                    }
                }
            });
        });
        
        if (successMessage) observer.observe(successMessage, { attributes: true });
        if (errorMessage) observer.observe(errorMessage, { attributes: true });
    }
    
    // Hilfsfunktionen
    function hideMessages() {
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
    }
    
    function showSuccessMessage() {
        if (successMessage) {
            successMessage.style.display = 'block';
        }
    }
    
    function showErrorMessage(message) {
        if (errorMessage && errorText) {
            errorText.textContent = message;
            errorMessage.style.display = 'block';
        }
    }
    
    function validateForm(name, email, subject, message) {
        if (!name || !email || !subject || !message) {
            return 'Bitte fülle alle Felder aus.';
        }
        
        // E-Mail Format validieren
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Bitte gib eine gültige E-Mail-Adresse ein.';
        }
        
        // Minimale Länge prüfen
        if (name.length < 2) {
            return 'Der Name muss mindestens 2 Zeichen lang sein.';
        }
        
        if (subject.length < 3) {
            return 'Der Betreff muss mindestens 3 Zeichen lang sein.';
        }
        
        if (message.length < 10) {
            return 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
        }
        
        return null; // Keine Validierungsfehler
    }
    
    function setButtonLoading(button, isLoading, originalText = '') {
        if (button) {
            if (isLoading) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
            } else {
                button.disabled = false;
                button.innerHTML = originalText || '<i class="fas fa-paper-plane"></i> Nachricht senden';
            }
        }
    }
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

// Performance Optimierung für Scroll Events
const debouncedScrollHandler = debounce(() => {
    // Hier können weitere scroll-basierte Animationen hinzugefügt werden
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);