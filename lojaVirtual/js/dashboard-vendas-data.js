// js/dashboard-vendas-data.js
// Gerencia dados dinâmicos da página de vendas

(function () {
  const moeda = (v) => "R$ " + Number(v || 0).toFixed(2).replace(".", ",");
  let currentPage = 1;

  // Carregar KPIs da página de vendas
  async function carregarKPIsVendas() {
    try {
      const res = await fetch("api/vendas_kpis.php");
      const kpis = await res.json();
      
      if (kpis.error) throw new Error(kpis.error);
      
      // Atualizar cards de vendas hoje
      const vendasHojeCard = document.querySelector('.quick-stat-card:nth-child(1) .stat-value');
      if (vendasHojeCard) {
        vendasHojeCard.textContent = moeda(kpis.vendas_hoje.valor);
      }
      
      // Atualizar cards de vendas desta semana
      const vendasSemanaCard = document.querySelector('.quick-stat-card:nth-child(2) .stat-value');
      if (vendasSemanaCard) {
        vendasSemanaCard.textContent = moeda(kpis.vendas_semana.valor);
      }
      
      // Atualizar cards de vendas deste mês
      const vendasMesCard = document.querySelector('.quick-stat-card:nth-child(3) .stat-value');
      if (vendasMesCard) {
        vendasMesCard.textContent = moeda(kpis.vendas_mes.valor);
      }
      
      // Atualizar card de total de pedidos
      const totalPedidosCard = document.querySelector('.quick-stat-card:nth-child(4) .stat-value');
      if (totalPedidosCard) {
        totalPedidosCard.textContent = kpis.total_pedidos.valor;
      }
      
    } catch (e) {
      console.error("Erro ao carregar KPIs de vendas:", e);
      if (typeof showToast === 'function') {
        showToast("Erro ao carregar estatísticas de vendas", "error", 3000);
      }
    }
  }

  // Carregar vendas com paginação
  async function carregarVendas(page = 1) {
    try {
      const res = await fetch(`api/vendas_paginadas.php?page=${page}&limit=15`);
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      const tbody = document.getElementById("vendasTableBody");
      if (tbody) {
        tbody.innerHTML = "";
        data.vendas.forEach((v) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td><input type="checkbox" class="row-select" data-id="${v.id}"></td>
            <td>#${v.id}</td>
            <td>${v.cliente}</td>
            <td>${v.produto_nome}</td>
            <td>${new Date(v.data).toLocaleDateString("pt-BR")}</td>
            <td>${moeda(v.valor_total)}</td>
            <td><span class="status-badge ${v.status}">${
            v.status === "completed" ? "Concluída" : v.status
          }</span></td>
            <td>
              <button class="btn-icon-sm" title="Ver detalhes">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn-icon-sm" title="Editar">
                <i class="fas fa-edit"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
      
      // Renderizar paginação
      renderizarPaginacaoVendas(data.pagination);
      currentPage = page;
      
    } catch (e) {
      showToast("Erro ao carregar vendas", "error", 3000);
    }
  }

  // Renderizar paginação estilizada
  function renderizarPaginacaoVendas(pagination) {
    const container = document.getElementById("vendasPaginationContainer");
    if (!container) return;
    
    let html = `
      <div class="pagination-info">
        Mostrando ${(pagination.current_page - 1) * pagination.items_per_page + 1}-${Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)} de ${pagination.total_items} vendas
      </div>
    `;
    
    if (pagination.total_pages > 1) {
      html += '<div class="pagination">';
      
      // Botão anterior
      if (pagination.has_prev) {
        html += `<button class="page-btn" onclick="carregarVendasPagina(${pagination.current_page - 1})">
          <i class="fas fa-chevron-left"></i>
        </button>`;
      } else {
        html += '<button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>';
      }
      
      // Páginas
      const startPage = Math.max(1, pagination.current_page - 2);
      const endPage = Math.min(pagination.total_pages, pagination.current_page + 2);
      
      if (startPage > 1) {
        html += '<button class="page-btn" onclick="carregarVendasPagina(1)">1</button>';
        if (startPage > 2) html += '<span class="page-ellipsis">...</span>';
      }
      
      for (let i = startPage; i <= endPage; i++) {
        const isActive = i === pagination.current_page;
        html += `<button class="page-btn ${isActive ? 'active' : ''}" onclick="carregarVendasPagina(${i})">${i}</button>`;
      }
      
      if (endPage < pagination.total_pages) {
        if (endPage < pagination.total_pages - 1) html += '<span class="page-ellipsis">...</span>';
        html += `<button class="page-btn" onclick="carregarVendasPagina(${pagination.total_pages})">${pagination.total_pages}</button>`;
      }
      
      // Botão próximo
      if (pagination.has_next) {
        html += `<button class="page-btn" onclick="carregarVendasPagina(${pagination.current_page + 1})">
          <i class="fas fa-chevron-right"></i>
        </button>`;
      } else {
        html += '<button class="page-btn" disabled><i class="fas fa-chevron-right"></i></button>';
      }
      
      html += '</div>';
    }
    
    container.innerHTML = html;
  }

  // Carregar clientes para o modal
  async function carregarClientesModal() {
    try {
      const res = await fetch("api/clientes_list.php");
      const clientes = await res.json();
      
      const select = document.getElementById("selectCliente");
      if (select) {
        select.innerHTML = '<option value="">Selecione o cliente</option>';
        clientes.forEach(c => {
          const option = document.createElement("option");
          option.value = c.id;
          option.textContent = c.username;
          select.appendChild(option);
        });
      }
    } catch (e) {
      console.error("Erro ao carregar clientes:", e);
    }
  }

  // Carregar produtos para o modal
  async function carregarProdutosModal() {
    try {
      const res = await fetch("api/produtos_list.php");
      const produtos = await res.json();
      
      const select = document.getElementById("selectProduto");
      if (select) {
        select.innerHTML = '<option value="">Selecione o produto</option>';
        produtos.forEach(p => {
          if (p.estoque > 0) { // Apenas produtos em estoque
            const preco = p.preco_promocional && p.preco_promocional > 0 ? p.preco_promocional : p.preco;
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = `${p.nome} - ${moeda(preco)} (Estoque: ${p.estoque})`;
            option.setAttribute('data-preco', preco);
            select.appendChild(option);
          }
        });
        
        // Evento para atualizar preço automaticamente
        select.addEventListener('change', function() {
          const valorUnit = document.getElementById('valorUnit');
          if (valorUnit) {
            const selectedOption = this.options[this.selectedIndex];
            const preco = selectedOption.getAttribute('data-preco') || 0;
            valorUnit.value = preco;
          }
        });
      }
    } catch (e) {
      console.error("Erro ao carregar produtos:", e);
    }
  }

  // Limpar todas as vendas
  async function limparTodasVendas() {
    if (!confirm("ATENÇÃO: Esta ação irá remover TODAS as vendas e restaurar o estoque dos produtos.\n\nEsta ação não pode ser desfeita!\n\nTem certeza que deseja continuar?")) {
      return;
    }
    
    if (!confirm("Última confirmação: Tem CERTEZA ABSOLUTA que deseja limpar todas as vendas?")) {
      return;
    }
    
    try {
      const res = await fetch("api/limpar_vendas.php", {
        method: "POST"
      });
      
      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Erro desconhecido');
      }
      
      showToast(data.message, "success", 5000);
      
      // Recarregar vendas e dashboard
      carregarVendas(1);
      carregarKPIsVendas(); // Recarregar KPIs da página de vendas
      
      // Recarregar vendas recentes no dashboard se existir
      if (typeof carregarVendasRecentes === 'function') {
        carregarVendasRecentes(1);
      }
      
      // Recarregar KPIs do dashboard se existir
      if (typeof carregarKPIs === 'function') {
        carregarKPIs();
      }
      
      // Forçar atualização da página após 1 segundo
      setTimeout(() => {
        if (typeof carregarVendasRecentes === 'function') {
          carregarVendasRecentes(1);
        }
      }, 1000);
      
    } catch (e) {
      showToast("Erro ao limpar vendas: " + e.message, "error", 5000);
    }
  }

  // Função global para paginação
  window.carregarVendasPagina = carregarVendas;

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    // Carregar vendas se estivermos na página de vendas
    if (document.getElementById("vendasTableBody")) {
      carregarVendas();
      carregarKPIsVendas(); // Carregar KPIs da página de vendas
    }
    
    // Configurar modal de nova venda
    const modalNovaVenda = document.getElementById("modalNovaVenda");
    const btnNovaVenda = document.getElementById("btnNovaVenda");
    
    if (btnNovaVenda && modalNovaVenda) {
      btnNovaVenda.addEventListener('click', () => {
        carregarClientesModal();
        carregarProdutosModal();
        modalNovaVenda.classList.add('active');
      });
    }
    
    // Configurar botão limpar vendas
    const btnLimparVendas = document.getElementById("btnLimparVendas");
    if (btnLimparVendas) {
      btnLimparVendas.addEventListener('click', limparTodasVendas);
    }
    
    // Configurar formulário de nova venda
    const formNovaVenda = document.getElementById("formNovaVenda");
    if (formNovaVenda) {
      formNovaVenda.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(formNovaVenda);
        const data = {
          itens: [{
            id: formData.get('produto_id'),
            quantidade: parseInt(formData.get('quantidade')),
            preco: parseFloat(formData.get('valor_unit'))
          }],
          cliente_id: formData.get('cliente_id')
        };
        
        try {
          const res = await fetch("api/venda_create.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          
          const result = await res.json();
          
          if (!res.ok || !result.ok) {
            throw new Error(result.error || 'Erro ao criar venda');
          }
          
          showToast("Venda criada com sucesso!", "success", 3000);
          modalNovaVenda.classList.remove('active');
          formNovaVenda.reset();
          carregarVendas(currentPage);
          
        } catch (e) {
          showToast("Erro ao criar venda: " + e.message, "error", 3000);
        }
      });
    }
  });
})();