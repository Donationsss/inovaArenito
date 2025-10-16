// js/dashboard-data.js
// Integra o DASHBOARD ao back-end: KPIs, gráfico do mês, top produtos, vendas recentes, clientes e CRUD de produtos.

(function () {
  // Util: montar moeda
  const moeda = (v) =>
    "R$ " +
    Number(v || 0)
      .toFixed(2)
      .replace(".", ",");

  // KPIs + Tabelas + Gráfico
  async function carregarKPIs() {
    try {
      const res = await fetch("api/dashboard_kpis.php");
      const k = await res.json();

      // KPIs (ajuste IDs conforme seu HTML)
      setText("#kpiTotalVendas", k.total_vendas);
      setText("#kpiReceitaTotal", moeda(k.receita_total));
      setText("#kpiClientesAtivos", k.clientes_ativos);
      setText("#kpiProdutosVendidos", k.produtos_vendidos);

      // Top produtos (lista)
      const topList = qs("#topProdutos");
      if (topList) {
        topList.innerHTML = "";
        (k.top_produtos || []).forEach((p, i) => {
          const row = document.createElement("div");
          row.className = "product-item";
          row.innerHTML = `
            <div class="product-info">
              <div class="rank">${i + 1}</div>
              <div class="name">${p.produto_nome}</div>
            </div>
            <div class="product-stats">
              <div class="sales">Vendas: ${p.total_qtd}</div>
              <div class="progress-bar"><div class="progress" style="width:${Math.min(
                100,
                p.total_qtd * 5
              )}%"></div></div>
            </div>
          `;
          topList.appendChild(row);
        });
      }

      // Vendas do mês (gráfico)
      montarGraficoVendasMes(k.vendas_mes || []);

      // Vendas recentes com paginação
      carregarVendasRecentes();
    } catch (e) {
      showToast("Erro ao carregar dashboard", "error", 3000);
    }
  }

  // Gráfico Vendas do Mês
  function montarGraficoVendasMes(series) {
    const canvas = document.getElementById("vendasMesChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (window._chartVendasMes) window._chartVendasMes.destroy();
    const labels = series.map((s) => s.dia);
    const data = series.map((s) => Number(s.valor || 0));
    window._chartVendasMes = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Faturamento (R$)",
            data,
            backgroundColor: "rgba(37,99,235,0.25)",
            borderColor: "#2563eb",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // ocupa o bloco inteiro
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (v) => "R$ " + v },
            grid: { color: "rgba(0,0,0,0.05)" },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // Produtos do Dashboard (lista + criar + estoque)
  async function listarProdutosDashboard() {
    const grid = qs(".products-grid, .dashboard-products-grid");
    if (!grid) return;
    try {
      const res = await fetch("api/produtos_list.php");
      const produtos = await res.json();
      grid.innerHTML = "";
      produtos.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product-card";
        const fora = p.estoque <= 0;
        card.innerHTML = `
          <div class="product-image">
            <img src="${
              p.imagem || "https://picsum.photos/400?random=" + p.id
            }" alt="${p.nome}">
            <span class="stock-badge ${fora ? "out-of-stock" : "in-stock"}">${
          fora ? "Sem Estoque" : "Em Estoque"
        }</span>
          </div>
          <div class="product-info">
            <h3>${p.nome}</h3>
            <p class="product-category"><i class="fas fa-tag"></i> ${
              p.categoria
            }</p>
            <div class="product-stats">
              <div class="stat"><span class="label">Preço:</span><span class="value">${moeda(
                p.preco_promocional && p.preco_promocional > 0
                  ? p.preco_promocional
                  : p.preco
              )}</span></div>
              <div class="stat"><span class="label">Estoque:</span><span class="value ${
                fora ? "danger" : ""
              }">${p.estoque} unid.</span></div>
            </div>
            <div class="product-actions">
              <button class="btn-icon-sm" title="Atualizar Estoque" onclick="promptEstoque(${
                p.id
              }, ${p.estoque})"><i class="fas fa-box"></i></button>
              <button class="btn-icon-sm danger" title="Deletar Produto" onclick="deletarProduto(${
                p.id
              }, '${p.nome.replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (e) {
      showToast("Erro ao carregar produtos", "error", 3000);
    }
  }

  // Criar novo produto (form id="formNovoProduto")
  async function bindCriarProduto() {
    const form = document.getElementById("formNovoProduto");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      try {
        let imageUrl = '';
        
        // Verificar qual tipo de imagem foi selecionado
        const imageType = form.querySelector('input[name="image_type"]:checked')?.value;
        
        if (imageType === 'file') {
          // Upload do arquivo primeiro
          const imageFile = form.querySelector('input[name="imagem_file"]').files[0];
          if (imageFile) {
            const uploadFormData = new FormData();
            uploadFormData.append('image', imageFile);
            
            const uploadRes = await fetch('api/upload_image.php', {
              method: 'POST',
              body: uploadFormData
            });
            
            if (!uploadRes.ok) {
              const errorText = await uploadRes.text();
              let errorMsg = "Erro ao fazer upload da imagem";
              
              try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.error) {
                  errorMsg = errorJson.error;
                }
              } catch (e) {
                errorMsg = errorText || "Erro desconhecido no upload";
              }
              
              throw new Error(errorMsg);
            }
            
            const uploadResult = await uploadRes.json();
            imageUrl = uploadResult.image_url;
          }
        } else {
          // Usar URL fornecida
          imageUrl = form.querySelector('input[name="imagem_url"]').value || '';
        }
        
        // Criar FormData para o produto
        const fd = new FormData();
        fd.append('nome', form.querySelector('input[name="nome"]').value);
        fd.append('categoria', form.querySelector('select[name="categoria"]').value);
        fd.append('marca', form.querySelector('input[name="marca"]').value);
        fd.append('preco', form.querySelector('input[name="preco"]').value);
        fd.append('preco_promocional', form.querySelector('input[name="preco_promocional"]').value);
        fd.append('estoque', form.querySelector('input[name="estoque"]').value);
        fd.append('imagem', imageUrl);
        
        const res = await fetch("api/produto_create.php", {
          method: "POST",
          body: fd,
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          let errorMsg = "Erro ao criar produto";
          
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error) {
              errorMsg = errorJson.error;
            }
          } catch (e) {
            errorMsg = errorText || "Erro desconhecido";
          }
          
          throw new Error(errorMsg);
        }
        
        showToast("Produto criado com sucesso!", "success", 3000);
        form.reset();
        
        // Reset do componente de imagem
        const urlInput = document.getElementById('urlInput');
        const fileInput = document.getElementById('fileInput');
        const filePreview = document.getElementById('filePreview');
        const fileUploadContent = document.querySelector('.file-upload-content');
        const imageUrlRadio = document.getElementById('imageUrl');
        
        if (imageUrlRadio) imageUrlRadio.checked = true;
        if (urlInput) urlInput.style.display = 'block';
        if (fileInput) fileInput.style.display = 'none';
        if (filePreview) filePreview.style.display = 'none';
        if (fileUploadContent) fileUploadContent.style.display = 'block';
        
        listarProdutosDashboard();
        if (typeof closeModal === 'function') {
          closeModal('modalNovoProduto');
        }
      } catch (err) {
        showToast(err.message, "error", 5000);
      }
    });
  }

  // Atualizar estoque com prompt simples
  window.promptEstoque = async function (id, atual) {
    const novo = prompt("Novo estoque para o produto #" + id, String(atual));
    if (novo === null) return;
    const val = parseInt(novo, 10);
    if (isNaN(val) || val < 0) {
      showToast("Valor inválido", "error", 3000);
      return;
    }
    const fd = new FormData();
    fd.append("id", id);
    fd.append("estoque", val);
    try {
      const res = await fetch("api/produto_update_estoque.php", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error();
      showToast("Estoque atualizado", "success", 3000);
      listarProdutosDashboard();
    } catch (e) {
      showToast("Erro ao atualizar estoque", "error", 3000);
    }
  };

  // Deletar produto
  window.deletarProduto = async function (id, nome) {
    if (!confirm(`Tem certeza que deseja deletar o produto "${nome}"?\n\nEsta ação não pode ser desfeita!`)) {
      return;
    }

    try {
      const res = await fetch("api/produto_delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
      });
      
      if (!res.ok) throw new Error("Erro na requisição");
      
      const result = await res.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      showToast("Produto deletado com sucesso", "success", 3000);
      listarProdutosDashboard();
      
      // Recarregar produtos na loja se a função existir
      if (typeof carregarProdutos === 'function') {
        carregarProdutos();
      }
      
    } catch (e) {
      showToast("Erro ao deletar produto: " + e.message, "error", 3000);
    }
  };

  // Carregar KPIs da página de clientes
  async function carregarKPIsClientes() {
    try {
      const res = await fetch("api/clientes_kpis.php");
      const kpis = await res.json();
      
      if (kpis.error) throw new Error(kpis.error);
      
      // Total de clientes
      const totalCard = qs('.quick-stat-card:nth-child(1) .stat-value');
      if (totalCard && window.location.pathname.includes('dashboard-clientes.php')) {
        totalCard.textContent = kpis.total_clientes;
      }
      
      // Clientes ativos  
      const ativosCard = qs('.quick-stat-card:nth-child(2) .stat-value');
      if (ativosCard && window.location.pathname.includes('dashboard-clientes.php')) {
        ativosCard.textContent = kpis.clientes_ativos;
      }
      
      // Clientes VIP
      const vipCard = qs('.quick-stat-card:nth-child(3) .stat-value');
      if (vipCard && window.location.pathname.includes('dashboard-clientes.php')) {
        vipCard.textContent = kpis.clientes_vip;
      }
      
      // Novos clientes
      const novosCard = qs('.quick-stat-card:nth-child(4) .stat-value');
      if (novosCard && window.location.pathname.includes('dashboard-clientes.php')) {
        novosCard.textContent = kpis.novos_clientes;
      }
      
    } catch (e) {
      console.error("Erro ao carregar KPIs de clientes:", e);
      if (typeof showToast === 'function') {
        showToast("Erro ao carregar estatísticas de clientes", "error", 3000);
      }
    }
  }

  // Clientes (cards da página de clientes no dashboard)
  async function carregarClientesDashboard() {
    const grid = qs(".clientes-grid");
    if (!grid) return;
    try {
      const res = await fetch("api/clientes_list.php");
      const clientes = await res.json();
      grid.innerHTML = "";
      clientes.forEach((c) => {
        const card = document.createElement("div");
        card.className = "cliente-card";
        const isVip = c.is_vip == 1;
        card.innerHTML = `
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(
              c.username
            )}&background=${isVip ? '8b5cf6' : '2563eb'}&color=fff&size=80" alt="${c.username}">
            ${isVip ? '<span class="cliente-badge vip">VIP</span>' : ''}
          </div>
          <div class="cliente-info">
            <h3>${c.username}</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> ${
              c.email || "-"
            }</p>
            <div class="cliente-stats">
              <div class="stat-item"><span class="label">Compras</span><span class="value">${c.total_compras || 0}</span></div>
              <div class="stat-item"><span class="label">Total Gasto</span><span class="value">${moeda(c.total_gasto || 0)}</span></div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary"><i class="fas fa-eye"></i> Ver Perfil</button>
              <button class="btn-sm ${isVip ? 'btn-warning' : 'btn-success'}" onclick="toggleVip(${c.id}, ${!isVip})">
                <i class="fas fa-star"></i> ${isVip ? 'Remover VIP' : 'Tornar VIP'}
              </button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (e) {
      showToast("Erro ao carregar clientes", "error", 3000);
    }
  }

  // Helpers
  function qs(s) {
    return document.querySelector(s);
  }
  function setText(sel, val) {
    const el = qs(sel);
    if (el) el.textContent = val;
  }

  // Carregar vendas recentes com paginação
  let currentPage = 1;
  async function carregarVendasRecentes(page = 1) {
    try {
      const res = await fetch(`api/vendas_paginadas.php?page=${page}&limit=10`);
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      const tbody = qs("#tableVendasRecentes");
      if (tbody) {
        tbody.innerHTML = "";
        data.vendas.forEach((v) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>#${v.id}</td>
            <td>${v.cliente}</td>
            <td>${v.produto_nome}</td>
            <td>${new Date(v.data).toLocaleString("pt-BR")}</td>
            <td>${moeda(v.valor_total)}</td>
            <td><span class="status-badge ${v.status}">${
            v.status === "completed" ? "Concluída" : v.status
          }</span></td>
          `;
          tbody.appendChild(tr);
        });
      }
      
      // Renderizar paginação
      renderizarPaginacao(data.pagination);
      currentPage = page;
      
    } catch (e) {
      showToast("Erro ao carregar vendas", "error", 3000);
    }
  }
  
  // Renderizar controles de paginação
  function renderizarPaginacao(pagination) {
    const container = qs("#vendasPagination");
    if (!container) return;
    
    if (pagination.total_pages <= 1) {
      container.innerHTML = "";
      return;
    }
    
    let html = '<div class="pagination">';
    
    // Botão anterior
    if (pagination.has_prev) {
      html += `<button class="page-btn" onclick="carregarVendasRecentes(${pagination.current_page - 1})"><i class="fas fa-chevron-left"></i></button>`;
    } else {
      html += '<button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>';
    }
    
    // Números das páginas
    const startPage = Math.max(1, pagination.current_page - 2);
    const endPage = Math.min(pagination.total_pages, pagination.current_page + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === pagination.current_page;
      html += `<button class="page-btn ${isActive ? 'active' : ''}" onclick="carregarVendasRecentes(${i})">${i}</button>`;
    }
    
    // Botão próximo
    if (pagination.has_next) {
      html += `<button class="page-btn" onclick="carregarVendasRecentes(${pagination.current_page + 1})"><i class="fas fa-chevron-right"></i></button>`;
    } else {
      html += '<button class="page-btn" disabled><i class="fas fa-chevron-right"></i></button>';
    }
    
    html += '</div>';
    html += `<div class="pagination-info">Mostrando ${(pagination.current_page - 1) * pagination.items_per_page + 1}-${Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)} de ${pagination.total_items} vendas</div>`;
    
    container.innerHTML = html;
  }
  
  // Toggle VIP status
  window.toggleVip = async function (userId, makeVip) {
    const action = makeVip ? 'tornar VIP' : 'remover status VIP';
    if (!confirm(`Tem certeza que deseja ${action} este usuário?`)) {
      return;
    }
    
    try {
      const res = await fetch("api/toggle_vip.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, is_vip: makeVip })
      });
      
      const result = await res.json();
      
      if (!res.ok || result.error) {
        throw new Error(result.error || 'Erro desconhecido');
      }
      
      showToast(result.message, "success", 3000);
      carregarClientesDashboard(); // Recarregar lista de clientes
      
    } catch (e) {
      showToast("Erro ao alterar status VIP: " + e.message, "error", 3000);
    }
  };

  // Expor função globalmente
  window.carregarVendasRecentes = carregarVendasRecentes;

  // Boot dinâmico: chama apenas o que existe na página
  document.addEventListener("DOMContentLoaded", () => {
    // Dashboard home
    if (qs("#kpiTotalVendas") || qs("#vendasMesChart")) carregarKPIs();

    // Dashboard produtos
    if (qs(".products-grid, .dashboard-products-grid"))
      listarProdutosDashboard();
    if (qs("#formNovoProduto")) bindCriarProduto();

    // Dashboard clientes
    if (qs(".clientes-grid")) {
      carregarClientesDashboard();
      carregarKPIsClientes(); // Carregar KPIs da página de clientes
    }
  });
})();
