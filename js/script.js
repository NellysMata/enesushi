document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle clases
            navLinks.classList.toggle('active');
            
            // Accesibilidad: Actualizar estado
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 50;
            
            if (scrolled) {
                navbar.style.background = 'rgba(5, 5, 5, 0.95)';
                navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                navbar.style.padding = '10px 0';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.7)';
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '20px 0';
            }
        });
    }

    // 3. Smooth Scroll (Navegación suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .section-header');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
});