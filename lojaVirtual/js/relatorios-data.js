// js/relatorios-data.js
// Carrega dados dinâmicos para página de relatórios com Chart.js

console.log('🚀 relatorios-data.js carregado!');

(function () {
  const moeda = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let faturamentoChart = null;
  let categoriaChart = null;
  let pagamentoChart = null;

  // Carregar e renderizar todos os gráficos
  async function carregarRelatorios() {
    console.log('🚀 Iniciando carregamento dos relatórios...');
    
    try {
      // Carregar um por vez para facilitar debug
      await carregarFaturamentoMensal();
      console.log('✅ Faturamento mensal carregado');
      
      await carregarVendasPorCategoria();
      console.log('✅ Vendas por categoria carregadas');
      
      await carregarPerformanceProdutos();
      console.log('✅ Performance dos produtos carregada');
      
      renderizarGraficoPagamentos(); // Mock
      console.log('✅ Gráfico de pagamentos renderizado');
      
      console.log('✅ Todos os relatórios carregados com sucesso!');
    } catch (e) {
      console.error("❌ Erro ao carregar relatórios:", e);
      if (typeof showToast !== 'undefined') {
        showToast('Erro ao carregar relatórios', 'error', 3000);
      }
    }
  }

  // Carregar dados de faturamento mensal
  async function carregarFaturamentoMensal() {
    try {
      const yearSelect = document.querySelector('.select-period');
      const year = yearSelect ? yearSelect.value : new Date().getFullYear();
      
      const res = await fetch(`api/faturamento_mensal.php?year=${year}`);
      
      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      renderizarGraficoFaturamento(data.data);
    } catch (error) {
      console.error('Erro ao carregar faturamento:', error);
      const canvas = document.getElementById('faturamentoChart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#999';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Erro ao carregar dados', canvas.width/2, canvas.height/2);
      }
    }
  }

  // Carregar dados de vendas por categoria
  async function carregarVendasPorCategoria() {
    try {
      const res = await fetch('api/vendas_por_categoria.php?periodo=30');
      
      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      renderizarGraficoCategorias(data.data);
    } catch (error) {
      console.error('Erro ao carregar vendas por categoria:', error);
      // Renderizar gráfico com dados vazios ou mensagem de erro
      const canvas = document.getElementById('categoriaChart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#999';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Erro ao carregar dados', canvas.width/2, canvas.height/2);
      }
    }
  }

  // Carregar dados de performance dos produtos
  async function carregarPerformanceProdutos() {
    const res = await fetch('api/performance_produtos.php?periodo=30&limit=10');
    const data = await res.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    renderizarTabelaPerformance(data.data);
  }

  // Renderizar gráfico de faturamento mensal com Chart.js
  function renderizarGraficoFaturamento(dados) {
    const canvas = document.getElementById('faturamentoChart');
    if (!canvas) return;
    
    // Destruir gráfico anterior se existir
    if (faturamentoChart) {
      faturamentoChart.destroy();
      faturamentoChart = null;
    }
    
    const ctx = canvas.getContext('2d');
    const labels = dados.map(d => d.nome_mes);
    const values = dados.map(d => d.faturamento);
    
    faturamentoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Faturamento (R$)',
          data: values,
          backgroundColor: 'rgba(37, 99, 235, 0.3)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Faturamento: ' + moeda(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'R$ ' + value.toLocaleString('pt-BR');
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Renderizar gráfico de vendas por categoria (Pizza)
  function renderizarGraficoCategorias(dados) {
    const canvas = document.getElementById('categoriaChart');
    if (!canvas) return;
    
    // Destruir gráfico anterior se existir
    if (categoriaChart) {
      categoriaChart.destroy();
      categoriaChart = null;
    }
    
    const ctx = canvas.getContext('2d');
    const labels = dados.map(d => d.categoria);
    const values = dados.map(d => d.faturamento_total);
    const colors = dados.map(d => d.cor);
    
    categoriaChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const percentual = dados[context.dataIndex].percentual;
                return context.label + ': ' + moeda(context.parsed) + ' (' + percentual + '%)';
              }
            }
          }
        }
      }
    });
  }

  // Renderizar gráfico de métodos de pagamento (mock)
  function renderizarGraficoPagamentos() {
    const canvas = document.getElementById('pagamentoChart');
    if (!canvas) return;
    
    // Destruir gráfico anterior se existir
    if (pagamentoChart) {
      pagamentoChart.destroy();
      pagamentoChart = null;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Dados mock para métodos de pagamento
    const dadosMock = [
      { metodo: 'Cartão de Crédito', valor: 45.2, cor: '#2563eb' },
      { metodo: 'PIX', valor: 32.1, cor: '#10b981' },
      { metodo: 'Boleto', valor: 15.7, cor: '#f59e0b' },
      { metodo: 'Cartão de Débito', valor: 7.0, cor: '#8b5cf6' }
    ];
    
    pagamentoChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: dadosMock.map(d => d.metodo),
        datasets: [{
          data: dadosMock.map(d => d.valor),
          backgroundColor: dadosMock.map(d => d.cor),
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  // Tabela de performance de produtos
  function renderizarTabelaPerformance(dados) {
    const tbody = document.getElementById('performanceTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    dados.forEach((produto) => {
      const tr = document.createElement('tr');
      
      // Ícone de tendência baseado na performance
      let iconeTendencia = 'fas fa-minus';
      let corTendencia = 'text-warning';
      let textoTendencia = 'Estável';
      
      if (produto.tendencia === 'alta') {
        iconeTendencia = 'fas fa-arrow-up';
        corTendencia = 'text-success';
        textoTendencia = 'Alta';
      } else if (produto.tendencia === 'baixa') {
        iconeTendencia = 'fas fa-arrow-down';
        corTendencia = 'text-danger';
        textoTendencia = 'Baixa';
      } else if (produto.tendencia === 'media') {
        iconeTendencia = 'fas fa-arrow-right';
        corTendencia = 'text-info';
        textoTendencia = 'Média';
      }
      
      // Badge da margem
      let badgeClass = 'status-badge pending';
      if (produto.margem >= 30) badgeClass = 'status-badge completed';
      if (produto.margem < 15) badgeClass = 'status-badge cancelled';

      tr.innerHTML = `
        <td><strong>${produto.produto}</strong></td>
        <td>${produto.categoria}</td>
        <td>${produto.total_vendas}</td>
        <td>${moeda(produto.receita_total)}</td>
        <td><span class="${badgeClass}">${produto.margem.toFixed(1)}%</span></td>
        <td><i class="${iconeTendencia} ${corTendencia}"></i> ${textoTendencia}</td>
      `;

      tbody.appendChild(tr);
    });
  }
  
  // Event listeners para filtros
  function bindEventListeners() {
    // Selector de ano para faturamento
    const yearSelect = document.querySelector('.select-period');
    if (yearSelect) {
      yearSelect.addEventListener('change', () => {
        carregarFaturamentoMensal();
      });
    }
    
    // Botão de gerar relatório
    const btnGerar = document.querySelector('.btn-primary');
    if (btnGerar && btnGerar.textContent.includes('Gerar')) {
      btnGerar.addEventListener('click', () => {
        carregarRelatorios();
        showToast && showToast('Relatório atualizado!', 'success', 3000);
      });
    }
  }

  // Inicializar quando a página carregar
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📝 DOM carregado, verificando elementos...');
    
    const faturamentoChart = document.getElementById('faturamentoChart');
    const categoriaChart = document.getElementById('categoriaChart');
    const pagamentoChart = document.getElementById('pagamentoChart');
    
    console.log('Elementos encontrados:', {
      faturamentoChart: !!faturamentoChart,
      categoriaChart: !!categoriaChart,
      pagamentoChart: !!pagamentoChart
    });
    
    // Verificar se Chart.js está carregado
    if (typeof Chart === 'undefined') {
      console.error('❌ Chart.js não está carregado!');
      return;
    } else {
      console.log('✅ Chart.js carregado, versão:', Chart.version);
    }
    
    if (faturamentoChart) {
      console.log('✅ Iniciando carregamento dos relatórios...');
      carregarRelatorios();
      bindEventListeners();
    } else {
      console.error('❌ Canvas faturamentoChart não encontrado!');
    }
  });

})();
