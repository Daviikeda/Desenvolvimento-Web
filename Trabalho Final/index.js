document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    const revealEls = document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => {
            if (!el.classList.contains('fade-up-delay-1') &&
                !el.classList.contains('fade-up-delay-2') &&
                !el.classList.contains('fade-up-delay-3')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(24px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });
    } else {
        revealEls.forEach(el => {
            el.style.opacity = '1';
        });
    }

    const cardEls = document.querySelectorAll(
        '.project-card, .exp-card, .skill-card, .value-item, .timeline-item'
    );

    if ('IntersectionObserver' in window && cardEls.length) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 80 * (Array.from(cardEls).indexOf(entry.target) % 4));
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cardEls.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(el);
        });
    }
});