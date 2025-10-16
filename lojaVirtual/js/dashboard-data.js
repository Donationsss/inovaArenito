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

      // Vendas recentes
      const tbody = qs("#tableVendasRecentes");
      if (tbody) {
        tbody.innerHTML = "";
        (k.vendas_recentes || []).forEach((v) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>#${v.id}</td>
            <td>${v.produto_nome}</td>
            <td>${v.quantidade}</td>
            <td>${moeda(v.valor_total)}</td>
            <td>${new Date(v.data).toLocaleString("pt-BR")}</td>
            <td><span class="status-badge ${v.status}">${
            v.status === "completed" ? "Concluída" : v.status
          }</span></td>
          `;
          tbody.appendChild(tr);
        });
      }
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
      const fd = new FormData(form);
      try {
        const res = await fetch("api/produto_create.php", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) throw new Error(await res.text());
        showToast("Produto criado", "success", 3000);
        form.reset();
        listarProdutosDashboard();
      } catch (err) {
        showToast("Erro ao criar produto", "error", 3000);
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
        card.innerHTML = `
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(
              c.username
            )}&background=2563eb&color=fff&size=80" alt="${c.username}">
          </div>
          <div class="cliente-info">
            <h3>${c.username}</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> ${
              c.email || "-"
            }</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> - </p>
            <div class="cliente-stats">
              <div class="stat-item"><span class="label">ID</span><span class="value">${
                c.id
              }</span></div>
              <div class="stat-item"><span class="label">Desde</span><span class="value">${new Date(
                c.created_at
              ).toLocaleDateString("pt-BR")}</span></div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary"><i class="fas fa-eye"></i> Ver Perfil</button>
              <button class="btn-sm btn-outline"><i class="fas fa-envelope"></i></button>
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

  // Boot dinâmico: chama apenas o que existe na página
  document.addEventListener("DOMContentLoaded", () => {
    // Dashboard home
    if (qs("#kpiTotalVendas") || qs("#vendasMesChart")) carregarKPIs();

    // Dashboard produtos
    if (qs(".products-grid, .dashboard-products-grid"))
      listarProdutosDashboard();
    if (qs("#formNovoProduto")) bindCriarProduto();

    // Dashboard clientes
    if (qs(".clientes-grid")) carregarClientesDashboard();
  });
})();
