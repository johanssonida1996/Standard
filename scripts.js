// Sticky header - ändrar färg vid scroll
window.addEventListener('scroll', function () {
   const header = document.querySelector('.header');
   if (window.scrollY > 50) {
       header.classList.add('sticky');
   } else {
       header.classList.remove('sticky');
   }
});

document.querySelectorAll('.nav-links a, .skip-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Förhindra standard beteendet

        const targetId = this.getAttribute('data-target'); // Få id för målsektionen
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight; // Få headerns höjd
            const targetPosition = targetElement.offsetTop - headerHeight; // Justera för headerns höjd

            // Scrolla smidigt till rätt position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Ta bort 'active'-klassen från alla länkar
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });

            // Lägg till 'active'-klassen på den klickade länken om den inte är skip-länken
            if (this.classList.contains('nav-links')) {
                this.classList.add('active');
            }
        }
    });
});
 
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
let firstFocusableElement, lastFocusableElement;

function isMobileView() {
    return window.innerWidth <= 768;
}

// Hämta fokuserbara element och sätt fokus
function setFocusableElements() {
    const focusableContent = navLinks.querySelectorAll(focusableElements);
    firstFocusableElement = focusableContent[0];
    lastFocusableElement = focusableContent[focusableContent.length - 1];
}

// Tabbning inuti menyn
function trapFocus(e) {
    if (e.key === 'Tab') {
        if (e.shiftKey) { // Skift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // Endast Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
}

// Stäng menyn med ESC-tangenten
function handleEscapeKey(e) {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        toggleMenu();
    }
}

// Stäng menyn när man klickar utanför
function handleClickOutside(e) {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        toggleMenu();
    }
}

// Toggle-menyn
function toggleMenu() {
    if (isMobileView()) {
        navbar.classList.toggle('active');
        if (navbar.classList.contains('active')) {
            navLinks.style.visibility = 'visible';
            menuIcon.setAttribute('aria-label', 'Stäng menyn');
            menuIcon.setAttribute('aria-expanded', 'true');
            setFocusableElements(); // Hämta alla fokuserbara element i menyn
            firstFocusableElement.focus(); // Flytta fokus till första elementet i menyn
            document.addEventListener('keydown', trapFocus); // Aktivera focus trap
        } else {
            navLinks.style.visibility = 'hidden';
            menuIcon.setAttribute('aria-label', 'Öppna menyn');
            menuIcon.setAttribute('aria-expanded', 'false');
            document.removeEventListener('keydown', trapFocus);
            menuIcon.focus(); // Ge fokus tillbaka till menykonen när menyn stängs
        }
    }
}

// Lägg till click-event för menyikonen
menuIcon.addEventListener('click', toggleMenu);

// Hantera tangentbordets "Enter" och "Space"
menuIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
    }
});

// Hantera skärmförändringar
window.addEventListener('resize', () => {
    if (!isMobileView()) {
        navLinks.style.visibility = 'visible';
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    } else if (!navbar.classList.contains('active')) {
        navLinks.style.visibility = 'hidden';
    }
});

// Stäng menyn om användaren klickar utanför
document.addEventListener('click', handleClickOutside);

// Stäng menyn med ESC-tangenten
document.addEventListener('keydown', handleEscapeKey);


