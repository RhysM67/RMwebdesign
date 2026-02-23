// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Follower
    const cursorDot = document.getElementById('cursor-dot');
    const cursorTrail = document.getElementById('cursor-trail');

    // Check if device is likely a touch device to skip intensive dom updates
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Direct update for the dot for lowest latency
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

            // Trail has CSS transition on transform so setting it directly gives a smooth catch-up effect
            cursorTrail.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Add interactive hover effects
        const interactables = document.querySelectorAll('a, button, .glass-card, .timeline-step, .glass-nav');

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorTrail.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorTrail.classList.remove('hover');
            });
        });
    }

    // Parallax Scroll Effect for Background Layers
    const parallaxLayers = [
        { el: document.querySelector('.orb-1'), speed: 0.10 },
        { el: document.querySelector('.orb-2'), speed: 0.20 },
        { el: document.querySelector('.orb-3'), speed: 0.30 }
    ];

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Apply parallax offsets via marginTop to not clash with transform animations
        parallaxLayers.forEach(layer => {
            if (layer.el) {
                layer.el.style.marginTop = `${scrollY * layer.speed}px`;
            }
        });
    });

    // Intersection Observer for Scroll Reveals
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Contact Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.style.display = 'none';
                    document.getElementById('form-success').style.display = 'block';
                } else {
                    alert('There was a problem sending your message. Please try again.');
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
