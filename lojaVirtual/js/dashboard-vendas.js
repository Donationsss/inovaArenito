AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
if (sidebarToggle) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));

// Helpers
function showToast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
    Object.assign(el.style, {
        position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: '#fff', padding: '12px 16px', borderRadius: '8px',
        boxShadow: '0 8px 20px rgba(0,0,0,.3)'
    });
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; }, 2500);
    setTimeout(() => el.remove(), 3000);
}

// Modal controls
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
window.closeModal = closeModal;

const btnNovaVenda = document.getElementById('btnNovaVenda');
const modalNovaVenda = document.getElementById('modalNovaVenda');
if (btnNovaVenda) btnNovaVenda.addEventListener('click', () => openModal('modalNovaVenda'));
if (modalNovaVenda) modalNovaVenda.querySelector('.modal-close').addEventListener('click', () => closeModal('modalNovaVenda'));

// Carregar vendas do localStorage (reuso do mecanismo da loja)
function getVendas() {
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    if (vendas.length === 0) {
        // seed inicial
        vendas = [
            { id: '#A1B2C3', cliente: 'João Silva', produto: 'Notebook Ultra Pro', data: '05/10/2025', valor: 4999.00, status: 'completed' },
            { id: '#D4E5F6', cliente: 'Maria Santos', produto: 'Smartphone XZ Plus', data: '06/10/2025', valor: 2549.00, status: 'completed' },
            { id: '#G7H8I9', cliente: 'Pedro Costa', produto: 'Fone Wireless Pro', data: '07/10/2025', valor: 899.00, status: 'pending' },
            { id: '#J1K2L3', cliente: 'Ana Paula', produto: 'Notebook Gamer X', data: '08/10/2025', valor: 7899.00, status: 'completed' },
            { id: '#M4N5O6', cliente: 'Carlos Souza', produto: 'Smartphone Pro Max', data: '08/10/2025', valor: 3499.00, status: 'completed' },
            { id: '#P7Q8R9', cliente: 'Juliana Lima', produto: 'Smartwatch Elite', data: '09/10/2025', valor: 1199.00, status: 'pending' },
            { id: '#S1T2U3', cliente: 'Roberto Alves', produto: 'Notebook Ultra Pro', data: '09/10/2025', valor: 4999.00, status: 'cancelled' }
        ];
        localStorage.setItem('vendas', JSON.stringify(vendas));
    }
    return vendas;
}

function salvarVendas(vendas) {
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

function statusBadge(status) {
    const map = { completed: 'Concluído', pending: 'Pendente', cancelled: 'Cancelado' };
    const cls = status === 'completed' ? 'completed' : status === 'pending' ? 'pending' : 'cancelled';
    return `<span class="status-badge ${cls}">${map[status]}</span>`;
}

function renderTabela() {
    const tbody = document.getElementById('vendasTableBody');
    if (!tbody) return;
    const vendas = getVendas().slice().reverse();
    tbody.innerHTML = '';
    vendas.forEach(v => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="row-check"></td>
            <td><strong>${v.id}</strong></td>
            <td>${v.cliente}</td>
            <td>${v.produto}</td>
            <td>${v.data}</td>
            <td><strong>R$ ${v.valor.toFixed(2).replace('.', ',')}</strong></td>
            <td>${statusBadge(v.status)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" title="Ver"><i class="fas fa-eye"></i></button>
                    <button class="btn-action" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action" title="Excluir"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tr.querySelectorAll('.btn-action')[2].addEventListener('click', () => {
            const novas = getVendas().filter(x => x.id !== v.id);
            salvarVendas(novas);
            renderTabela();
            showToast('Venda excluída com sucesso!');
        });
        tbody.appendChild(tr);
    });
}

// Salvar nova venda
const formNovaVenda = document.getElementById('formNovaVenda');
if (formNovaVenda) {
    formNovaVenda.addEventListener('submit', (e) => {
        e.preventDefault();
        const selects = formNovaVenda.querySelectorAll('select');
        const inputs = formNovaVenda.querySelectorAll('input[type="number"]');
        const venda = {
            id: '#' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            cliente: selects[0].value || 'Cliente',
            produto: selects[1].value || 'Produto',
            data: new Date().toLocaleDateString('pt-BR'),
            valor: parseFloat(inputs[0].value || '0'),
            status: (selects[2]?.value || 'Concluído').toLowerCase() === 'concluído' ? 'completed'
                   : (selects[2]?.value || '').toLowerCase() === 'pendente' ? 'pending' : 'cancelled'
        };
        const vendas = getVendas();
        vendas.push(venda);
        salvarVendas(vendas);
        closeModal('modalNovaVenda');
        formNovaVenda.reset();
        renderTabela();
        showToast('Venda cadastrada!');
    });
}

renderTabela();
