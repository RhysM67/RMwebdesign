document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Background Change on Scroll ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Unobserve to animate only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animateElements.forEach(el => observer.observe(el));


    // --- Simple Calendar Logic for UI display ---
    const calendarGrid = document.getElementById('calendarGrid');

    if (calendarGrid) {
        // Generate pseudo-dates for the current month
        const daysInMonth = 31;
        const startDayOffset = 3; // Starts on a Wednesday for example

        let html = '';

        // Empty slots for offset
        for (let i = 0; i < startDayOffset; i++) {
            html += `<span></span>`;
        }

        // Actual days
        for (let i = 1; i <= daysInMonth; i++) {
            // Randomly disable some dates to show state
            let classes = 'cal-date';
            if (i < 10) classes += ' disabled';
            if (i === 15) classes += ' active';

            html += `<span class="${classes}">${i}</span>`;
        }

        calendarGrid.innerHTML = html;

        // Interaction
        const dates = calendarGrid.querySelectorAll('.cal-date:not(.disabled)');
        dates.forEach(date => {
            date.addEventListener('click', (e) => {
                // Remove active from all
                dates.forEach(d => d.classList.remove('active'));
                // Add active to clicked
                e.target.classList.add('active');
            });
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // Simplified toggle for demonstration
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';

                // Change link colors for mobile menu
                const links = navLinks.querySelectorAll('a');
                links.forEach(link => link.style.color = 'var(--color-dark-wood)');
            }
        });
    }
});
