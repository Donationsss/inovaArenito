// ===========================
// MENU MOBILE TOGGLE
// ===========================

class MobileMenu {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            this.toggle();
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && this.navMenu.classList.contains('active')) {
                this.close();
            }
        });
    }

    toggle() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    close() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }
}

// ===========================
// THEME TOGGLE
// ===========================

class ThemeToggle {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.themeIcon = this.toggleBtn.querySelector('.theme-toggle__icon');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);

        this.toggleBtn.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        });
    }

    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// ===========================
// AGENDA TABS
// ===========================

class AgendaTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.tab');
        this.schedules = document.querySelectorAll('.day-schedule');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab);
            });
        });
    }

    switchTab(selectedTab) {
        const day = selectedTab.getAttribute('data-day');

        // Remove active de todas as tabs
        this.tabs.forEach(tab => tab.classList.remove('active'));
        
        // Adiciona active na tab selecionada
        selectedTab.classList.add('active');

        // Remove active de todos os schedules
        this.schedules.forEach(schedule => schedule.classList.remove('active'));

        // Adiciona active no schedule correspondente
        const targetSchedule = document.querySelector(`[data-day-content="${day}"]`);
        if (targetSchedule) {
            targetSchedule.classList.add('active');

            // Reativa animações nos novos elementos visíveis
            const animatedElements = targetSchedule.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el, index) => {
                el.classList.remove('animated');
                setTimeout(() => {
                    el.classList.add('animated');
                }, index * 100);
            });
        }
    }
}

// ===========================
// FORMULÁRIO DE CONTATO
// ===========================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        
        // Simulação de envio
        this.showLoading();
        
        setTimeout(() => {
            this.showSuccess();
            this.form.reset();
        }, 1500);
    }

    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
    }

    showSuccess() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Mensagem Enviada! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Enviar Mensagem';
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }
}

// ===========================
// CARD DETAILS (REMOVIDO - Agora usa modal.js)
// ===========================

// A funcionalidade de card details agora é gerenciada pelo modal.js
// Remova ou comente a classe CardDetails antiga


// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
        });
    }

    updateActiveLink() {
        const scrollY = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===========================
// CONTADOR DE TEMPO ATÉ O EVENTO
// ===========================

class EventCountdown {
    constructor() {
        this.targetDate = new Date('2025-11-20T19:00:00').getTime();
        this.init();
    }

    init() {
        // Adiciona elemento do contador se desejar mostrar
        // Este é um exemplo simplificado
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Você pode usar esses valores para exibir um contador visual
        console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
}

// ===========================
// INICIALIZAÇÃO DE TODAS AS FUNCIONALIDADES
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new ThemeToggle();
    new AgendaTabs();
    new ContactForm();
    new CardDetails();
    new ActiveNavLink();
    new EventCountdown();
});

// ===========================
// PRELOADER (OPCIONAL)
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
