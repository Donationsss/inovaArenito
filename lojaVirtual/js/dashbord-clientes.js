AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));

function openModal(id){ document.getElementById(id).classList.add('active'); }
function closeModal(id){ document.getElementById(id).classList.remove('active'); }
window.closeModal = closeModal;

const btnNovoCliente = document.getElementById('btnNovoCliente');
const modalNovoCliente = document.getElementById('modalNovoCliente');
if (btnNovoCliente) btnNovoCliente.addEventListener('click', () => openModal('modalNovoCliente'));
if (modalNovoCliente) modalNovoCliente.querySelector('.modal-close').addEventListener('click', () => closeModal('modalNovoCliente'));

const formNovoCliente = document.getElementById('formNovoCliente');
if (formNovoCliente) {
    formNovoCliente.addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal('modalNovoCliente');
        toast('Cliente salvo com sucesso!');
        formNovoCliente.reset();
    });
}

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
