// ===========================
// ANIMAÇÕES DE SCROLL
// ===========================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, this.options);

            this.elements.forEach(element => {
                this.observer.observe(element);
            });
        } else {
            // Fallback para navegadores antigos
            this.elements.forEach(element => {
                element.classList.add('animated');
            });
        }
    }
}

// ===========================
// PARALLAX SUAVE
// ===========================

class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero__background');
        this.scrollY = 0;
        this.init();
    }

    init() {
        if (!this.hero) return;

        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            requestAnimationFrame(() => this.update());
        });
    }

    update() {
        const offset = this.scrollY * 0.5;
        this.hero.style.transform = `translateY(${offset}px)`;
    }
}

// ===========================
// SMOOTH SCROLL
// ===========================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Fecha menu mobile se estiver aberto
                    const navMenu = document.getElementById('navMenu');
                    const navToggle = document.getElementById('navToggle');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            });
        });
    }
}

// ===========================
// HEADER SCROLL EFFECT (ATUALIZADO)
// ===========================

class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        });
    }
}

// ===========================
// INICIALIZAÇÃO
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new ParallaxEffect();
    new SmoothScroll();
    new HeaderScroll();
});

