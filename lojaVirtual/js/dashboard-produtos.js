AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));

// Modal Novo Produto
function openModal(id){ document.getElementById(id).classList.add('active'); }
function closeModal(id){ document.getElementById(id).classList.remove('active'); }
window.closeModal = closeModal;

const btnNovoProduto = document.getElementById('btnNovoProduto');
const modalNovoProduto = document.getElementById('modalNovoProduto');
if (btnNovoProduto) btnNovoProduto.addEventListener('click', () => openModal('modalNovoProduto'));
if (modalNovoProduto) modalNovoProduto.querySelector('.modal-close').addEventListener('click', () => closeModal('modalNovoProduto'));

// Upload mock
const upload = document.querySelector('.file-upload');
if (upload) {
    upload.addEventListener('click', () => upload.querySelector('input[type="file"]').click());
    upload.querySelector('input[type="file"]').addEventListener('change', () => {
        upload.querySelector('p').textContent = 'Arquivo selecionado!';
    });
}

// Salvar produto (apenas mock local)
const formNovoProduto = document.getElementById('formNovoProduto');
if (formNovoProduto) {
    formNovoProduto.addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal('modalNovoProduto');
        showToast('Produto cadastrado com sucesso!');
        formNovoProduto.reset();
    });
}

function showToast(msg) {
    const el = document.createElement('div');
    el.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    Object.assign(el.style, {
        position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
        background: '#10b981', color: '#fff', padding: '12px 16px',
        borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,.3)'
    });
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; }, 2500);
    setTimeout(() => el.remove(), 3000);
}
