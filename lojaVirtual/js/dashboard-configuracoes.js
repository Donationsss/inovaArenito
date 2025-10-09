AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

const tabs = document.querySelectorAll('.settings-tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const id = tab.getAttribute('data-tab');
        document.getElementById(id).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Persistir preferências simples
document.querySelectorAll('#geral .switch').forEach(sw => {
    sw.addEventListener('change', () => {
        localStorage.setItem('cfg_' + (sw.nextElementSibling?.textContent || Math.random()), sw.checked ? '1' : '0');
    });
});

// Mock salvar formulários
document.querySelectorAll('.settings-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        toast('Configurações salvas!');
    });
});

function toast(msg) {
    const el = document.createElement('div');
    el.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    Object.assign(el.style, {
        position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
        background: '#2563eb', color: '#fff', padding: '12px 16px',
        borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,.3)'
    });
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; }, 2500);
    setTimeout(() => el.remove(), 3000);
}
