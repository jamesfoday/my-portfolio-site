
// Delayed logo and nav animation (after preloader)
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector('.logo').classList.add('show');
        document.querySelector('.desktop-nav').classList.add('show');
    }, 1300); // Use your preferred delay
});

// Preloader fade out
window.addEventListener('load', function () {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
        }, 800);
    }, 1200); // Give time for animation to finish before fading out
});

// --- SCROLL EFFECTS AND MENU HIGHLIGHTING --- //
// Only declare once!
const allNavLinks = document.querySelectorAll('.desktop-nav a');
const scrollSections = [...document.querySelectorAll('section[id]')];
const header = document.querySelector('.site-header');

// Handle both header style and menu highlighting on scroll
window.addEventListener('scroll', () => {
    // Header bg (e.g. white on scroll)
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // ScrollSpy: menu highlighting
    let scrollY = window.pageYOffset;
    scrollSections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120; // Adjust for fixed header
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => {
                link.classList.remove('active');
                // Accepts both "#about" and "about"
                if (link.getAttribute('href').replace('#', '') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});
