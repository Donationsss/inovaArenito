// Inicializar AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 50,
});

// Sidebar Toggle
const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// Carregar vendas do localStorage
function loadVendas() {
  let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

  // Se não houver vendas, criar algumas de exemplo
  if (vendas.length === 0) {
    vendas = [
      {
        id: "#A1B2C3",
        cliente: "João Silva",
        produto: "Notebook Ultra Pro",
        data: "05/10/2025",
        valor: 4999.0,
        status: "completed",
      },
      {
        id: "#D4E5F6",
        cliente: "Maria Santos",
        produto: "Smartphone XZ Plus",
        data: "06/10/2025",
        valor: 2549.0,
        status: "completed",
      },
      {
        id: "#G7H8I9",
        cliente: "Pedro Costa",
        produto: "Fone Wireless Pro",
        data: "07/10/2025",
        valor: 899.0,
        status: "pending",
      },
      {
        id: "#J1K2L3",
        cliente: "Ana Paula",
        produto: "Notebook Gamer X",
        data: "08/10/2025",
        valor: 7899.0,
        status: "completed",
      },
      {
        id: "#M4N5O6",
        cliente: "Carlos Souza",
        produto: "Smartphone Pro Max",
        data: "08/10/2025",
        valor: 3499.0,
        status: "completed",
      },
      {
        id: "#P7Q8R9",
        cliente: "Juliana Lima",
        produto: "Smartwatch Elite",
        data: "09/10/2025",
        valor: 1199.0,
        status: "pending",
      },
      {
        id: "#S1T2U3",
        cliente: "Roberto Alves",
        produto: "Notebook Ultra Pro",
        data: "09/10/2025",
        valor: 4999.0,
        status: "cancelled",
      },
    ];
    localStorage.setItem("vendas", JSON.stringify(vendas));
  }

  return vendas;
}

// Atualizar estatísticas
function updateStats() {
  const vendas = loadVendas();

  const totalVendas = vendas.length;
  const receitaTotal = vendas.reduce((acc, venda) => {
    if (venda.status === "completed") {
      return acc + venda.valor;
    }
    return acc;
  }, 0);

  const clientes = [...new Set(vendas.map((v) => v.cliente))].length;
  const produtosVendidos = vendas.filter(
    (v) => v.status === "completed"
  ).length;

  document.getElementById("totalVendas").textContent = totalVendas;
  document.getElementById("receitaTotal").textContent = `R$ ${receitaTotal
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("totalClientes").textContent = clientes;
  document.getElementById("produtosVendidos").textContent = produtosVendidos;
}

// Preencher tabela de vendas
function fillSalesTable() {
  const vendas = loadVendas();
  const tbody = document.getElementById("salesTableBody");

  if (!tbody) return;

  tbody.innerHTML = "";

  vendas
    .slice()
    .reverse()
    .forEach((venda) => {
      const tr = document.createElement("tr");

      const statusClass =
        venda.status === "completed"
          ? "completed"
          : venda.status === "pending"
          ? "pending"
          : "cancelled";
      const statusText =
        venda.status === "completed"
          ? "Concluído"
          : venda.status === "pending"
          ? "Pendente"
          : "Cancelado";

      tr.innerHTML = `
            <td><strong>${venda.id}</strong></td>
            <td>${venda.cliente}</td>
            <td>${venda.produto}</td>
            <td>${venda.data}</td>
            <td><strong>R$ ${venda.valor
              .toFixed(2)
              .replace(".", ",")}</strong></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" title="Ver detalhes">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" title="Excluir" onclick="deleteVenda('${
                      venda.id
                    }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

      tbody.appendChild(tr);
    });
}

// Deletar venda
function deleteVenda(id) {
  if (confirm("Tem certeza que deseja excluir esta venda?")) {
    let vendas = loadVendas();
    vendas = vendas.filter((v) => v.id !== id);
    localStorage.setItem("vendas", JSON.stringify(vendas));
    fillSalesTable();
    updateStats();
    showNotification("Venda excluída com sucesso!");
  }
}

// Criar gráfico de vendas
function createSalesChart() {
  const ctx = document.getElementById("salesChart");
  if (!ctx) return;

  const vendas = loadVendas();

  // Agrupar vendas por dia
  const vendasPorDia = {};
  vendas.forEach((venda) => {
    const data = venda.data;
    if (!vendasPorDia[data]) {
      vendasPorDia[data] = 0;
    }
    if (venda.status === "completed") {
      vendasPorDia[data] += venda.valor;
    }
  });

  const labels = Object.keys(vendasPorDia).slice(-7);
  const data = labels.map((label) => vendasPorDia[label]);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Vendas (R$)",
          data: data,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#2563eb",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          borderRadius: 8,
          titleFont: {
            size: 14,
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: function (context) {
              return (
                "Vendas: R$ " + context.parsed.y.toFixed(2).replace(".", ",")
              );
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
            drawBorder: false,
          },
          ticks: {
            callback: function (value) {
              return "R$ " + value.toLocaleString("pt-BR");
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// Mostrar notificação
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
    `;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Exportar dados
const btnExport = document.querySelector(".btn-export");
if (btnExport) {
  btnExport.addEventListener("click", () => {
    const vendas = loadVendas();
    const csv = convertToCSV(vendas);
    downloadCSV(csv, "vendas_techstore.csv");
    showNotification("Dados exportados com sucesso!");
  });
}

// Converter para CSV
function convertToCSV(data) {
  const headers = ["ID", "Cliente", "Produto", "Data", "Valor", "Status"];
  const rows = data.map((item) => [
    item.id,
    item.cliente,
    item.produto,
    item.data,
    `R$ ${item.valor.toFixed(2).replace(".", ",")}`,
    item.status,
  ]);

  let csv = headers.join(",") + "\n";
  rows.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  return csv;
}

// Download CSV
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Inicializar dashboard
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  fillSalesTable();
  createSalesChart();
});

// Animações CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

async function carregarKPIs() {
  const res = await fetch("api/dashboard_kpis.php");
  const k = await res.json();

  // KPIs
  document.getElementById("kpiTotalVendas").textContent = k.total_vendas;
  document.getElementById("kpiReceitaTotal").textContent =
    "R$ " + k.receita_total.toFixed(2).replace(".", ",");
  document.getElementById("kpiClientesAtivos").textContent = k.clientes_ativos;
  document.getElementById("kpiProdutosVendidos").textContent =
    k.produtos_vendidos;

  // Top produtos
  const list = document.getElementById("topProdutos");
  list.innerHTML = "";
  k.top_produtos.forEach((p, idx) => {
    const li = document.createElement("div");
    li.className = "product-item";
    li.innerHTML = `
      <div class="product-info">
        <div class="rank">${idx + 1}</div>
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
    list.appendChild(li);
  });

  // Vendas do mês (gráfico ocupa o card inteiro)
  montarGraficoVendasMes(k.vendas_mes);

  // Vendas recentes
  const tbody = document.getElementById("tableVendasRecentes");
  tbody.innerHTML = "";
  k.vendas_recentes.forEach((v) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>#${v.id}</td>
      <td>${v.produto_nome}</td>
      <td>${v.quantidade}</td>
      <td>R$ ${parseFloat(v.valor_total).toFixed(2).replace(".", ",")}</td>
      <td>${new Date(v.data).toLocaleString("pt-BR")}</td>
      <td><span class="status-badge ${v.status}">${
      v.status === "completed" ? "Concluída" : v.status
    }</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function montarGraficoVendasMes(series) {
  const ctx = document.getElementById("vendasMesChart").getContext("2d");
  if (window._chartVendasMes) window._chartVendasMes.destroy();
  const labels = series.map((s) => s.dia);
  const data = series.map((s) => parseFloat(s.valor));
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
      maintainAspectRatio: false, // ocupa o card inteiro
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: (v) => "R$ " + v } },
        x: { grid: { display: false } },
      },
    },
  });
}

// Call
carregarKPIs();
