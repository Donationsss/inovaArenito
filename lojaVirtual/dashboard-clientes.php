<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Clientes - Dashboard TechStore</title>

  <!-- CSS do dashboard -->
  <link rel="stylesheet" href="./css/dashboard.css">
  <link rel="stylesheet" href="./css/dashboard-pages.css">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <i class="fas fa-store"></i>
        <span>TechStore</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <a href="dashboard.php" class="nav-item">
        <i class="fas fa-chart-line"></i>
        <span>Dashboard</span>
      </a>
      <a href="dashboard-vendas.php" class="nav-item">
        <i class="fas fa-shopping-bag"></i>
        <span>Vendas</span>
      </a>
      <a href="dashboard-produtos.php" class="nav-item">
        <i class="fas fa-box"></i>
        <span>Produtos</span>
      </a>
      <a href="dashboard-clientes.php" class="nav-item active">
        <i class="fas fa-users"></i>
        <span>Clientes</span>
      </a>
      <a href="dashboard-relatorios.php" class="nav-item">
        <i class="fas fa-chart-bar"></i>
        <span>Relatórios</span>
      </a>
      <a href="dashboard-configuracoes.php" class="nav-item">
        <i class="fas fa-cog"></i>
        <span>Configurações</span>
      </a>
    </nav>
    <div class="sidebar-footer">
      <a href="index.php" class="nav-item">
        <i class="fas fa-arrow-left"></i>
        <span>Voltar à Loja</span>
      </a>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Top Bar -->
    <header class="topbar">
      <div class="topbar-left">
        <button class="sidebar-toggle">
          <i class="fas fa-bars"></i>
        </button>
        <h1>Clientes</h1>
      </div>
      <div class="topbar-right">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar clientes..." />
        </div>
        <button class="theme-toggle" id="themeToggleDash">
          <i class="fas fa-moon"></i>
        </button>
        <div class="notifications">
          <i class="fas fa-bell"></i>
          <span class="badge">3</span>
        </div>
        <div class="user-menu">
          <img src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff" alt="User" />
          <span>Admin</span>
        </div>
      </div>
    </header>

    <!-- Dashboard Content -->
    <div class="dashboard-content">
      <!-- Quick Stats -->
      <div class="quick-stats-grid" data-aos="fade-up">
        <div class="quick-stat-card">
          <div class="stat-icon blue">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-details">
            <span class="stat-label">Total de Clientes</span>
            <h3 class="stat-value">1,247</h3>
            <span class="stat-change positive">+87 este mês</span>
          </div>
        </div>
        <div class="quick-stat-card">
          <div class="stat-icon green">
            <i class="fas fa-user-check"></i>
          </div>
          <div class="stat-details">
            <span class="stat-label">Clientes Ativos</span>
            <h3 class="stat-value">1,089</h3>
            <span class="stat-change positive">87.3%</span>
          </div>
        </div>
        <div class="quick-stat-card">
          <div class="stat-icon purple">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-details">
            <span class="stat-label">Clientes VIP</span>
            <h3 class="stat-value">156</h3>
            <span class="stat-change positive">12.5%</span>
          </div>
        </div>
        <div class="quick-stat-card">
          <div class="stat-icon orange">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="stat-details">
            <span class="stat-label">Novos Hoje</span>
            <h3 class="stat-value">23</h3>
            <span class="stat-change positive">+5 vs ontem</span>
          </div>
        </div>
      </div>

      <!-- Page Header -->
      <div class="page-header" data-aos="fade-up">
        <div class="header-left">
          <button class="btn-primary" id="btnNovoCliente">
            <i class="fas fa-user-plus"></i>
            Novo Cliente
          </button>
          <button class="btn-outline">
            <i class="fas fa-upload"></i>
            Importar
          </button>
        </div>
        <div class="header-right">
          <select class="filter-select">
            <option>Todos os Clientes</option>
            <option>Ativos</option>
            <option>Inativos</option>
            <option>VIP</option>
          </select>
          <button class="btn-icon" title="Exportar">
            <i class="fas fa-download"></i>
          </button>
        </div>
      </div>

      <!-- Clientes Grid -->
      <div class="clientes-grid" data-aos="fade-up">
        <div class="cliente-card">
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=João+Silva&background=2563eb&color=fff&size=80" alt="Cliente">
            <span class="cliente-badge vip">VIP</span>
          </div>
          <div class="cliente-info">
            <h3>João Silva</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> joao.silva@email.com</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> (11) 99999-9999</p>
            <div class="cliente-stats">
              <div class="stat-item">
                <span class="label">Compras</span>
                <span class="value">47</span>
              </div>
              <div class="stat-item">
                <span class="label">Gasto Total</span>
                <span class="value">R$ 23.450</span>
              </div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary">
                <i class="fas fa-eye"></i> Ver Perfil
              </button>
              <button class="btn-sm btn-outline">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cliente-card">
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=Maria+Santos&background=8b5cf6&color=fff&size=80" alt="Cliente">
            <span class="cliente-badge vip">VIP</span>
          </div>
          <div class="cliente-info">
            <h3>Maria Santos</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> maria.santos@email.com</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> (11) 98888-8888</p>
            <div class="cliente-stats">
              <div class="stat-item">
                <span class="label">Compras</span>
                <span class="value">52</span>
              </div>
              <div class="stat-item">
                <span class="label">Gasto Total</span>
                <span class="value">R$ 31.200</span>
              </div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary">
                <i class="fas fa-eye"></i> Ver Perfil
              </button>
              <button class="btn-sm btn-outline">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cliente-card">
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=Pedro+Costa&background=10b981&color=fff&size=80" alt="Cliente">
          </div>
          <div class="cliente-info">
            <h3>Pedro Costa</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> pedro.costa@email.com</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> (11) 97777-7777</p>
            <div class="cliente-stats">
              <div class="stat-item">
                <span class="label">Compras</span>
                <span class="value">18</span>
              </div>
              <div class="stat-item">
                <span class="label">Gasto Total</span>
                <span class="value">R$ 8.340</span>
              </div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary">
                <i class="fas fa-eye"></i> Ver Perfil
              </button>
              <button class="btn-sm btn-outline">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cliente-card">
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=Ana+Paula&background=f59e0b&color=fff&size=80" alt="Cliente">
          </div>
          <div class="cliente-info">
            <h3>Ana Paula</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> ana.paula@email.com</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> (11) 96666-6666</p>
            <div class="cliente-stats">
              <div class="stat-item">
                <span class="label">Compras</span>
                <span class="value">29</span>
              </div>
              <div class="stat-item">
                <span class="label">Gasto Total</span>
                <span class="value">R$ 14.670</span>
              </div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary">
                <i class="fas fa-eye"></i> Ver Perfil
              </button>
              <button class="btn-sm btn-outline">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cliente-card">
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=Carlos+Souza&background=ef4444&color=fff&size=80" alt="Cliente">
          </div>
          <div class="cliente-info">
            <h3>Carlos Souza</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> carlos.souza@email.com</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> (11) 95555-5555</p>
            <div class="cliente-stats">
              <div class="stat-item">
                <span class="label">Compras</span>
                <span class="value">12</span>
              </div>
              <div class="stat-item">
                <span class="label">Gasto Total</span>
                <span class="value">R$ 5.890</span>
              </div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary">
                <i class="fas fa-eye"></i> Ver Perfil
              </button>
              <button class="btn-sm btn-outline">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="cliente-card">
          <div class="cliente-header">
            <img src="https://ui-avatars.com/api/?name=Juliana+Lima&background=ec4899&color=fff&size=80" alt="Cliente">
            <span class="cliente-badge vip">VIP</span>
          </div>
          <div class="cliente-info">
            <h3>Juliana Lima</h3>
            <p class="cliente-email"><i class="fas fa-envelope"></i> juliana.lima@email.com</p>
            <p class="cliente-phone"><i class="fas fa-phone"></i> (11) 94444-4444</p>
            <div class="cliente-stats">
              <div class="stat-item">
                <span class="label">Compras</span>
                <span class="value">38</span>
              </div>
              <div class="stat-item">
                <span class="label">Gasto Total</span>
                <span class="value">R$ 19.280</span>
              </div>
            </div>
            <div class="cliente-actions">
              <button class="btn-sm btn-primary">
                <i class="fas fa-eye"></i> Ver Perfil
              </button>
              <button class="btn-sm btn-outline">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-container" data-aos="fade-up">
        <div class="pagination-info">
          Mostrando 1-6 de 1,247 clientes
        </div>
        <div class="pagination">
          <button class="page-btn" disabled>
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <span>...</span>
          <button class="page-btn">208</button>
          <button class="page-btn">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- Modal Novo Cliente -->
  <div class="modal" id="modalNovoCliente">
    <div class="modal-content">
      <div class="modal-header">
        <h2><i class="fas fa-user-plus"></i> Novo Cliente</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <form id="formNovoCliente">
          <div class="form-row">
            <div class="form-group col-6">
              <label>Nome Completo *</label>
              <input type="text" class="form-control" placeholder="Ex: João Silva" required>
            </div>
            <div class="form-group col-6">
              <label>CPF *</label>
              <input type="text" class="form-control" placeholder="000.000.000-00" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-6">
              <label>E-mail *</label>
              <input type="email" class="form-control" placeholder="email@exemplo.com" required>
            </div>
            <div class="form-group col-6">
              <label>Telefone *</label>
              <input type="tel" class="form-control" placeholder="(00) 00000-0000" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-8">
              <label>Endereço</label>
              <input type="text" class="form-control" placeholder="Rua, Número">
            </div>
            <div class="form-group col-4">
              <label>CEP</label>
              <input type="text" class="form-control" placeholder="00000-000">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-6">
              <label>Cidade</label>
              <input type="text" class="form-control" placeholder="Cidade">
            </div>
            <div class="form-group col-6">
              <label>Estado</label>
              <select class="form-control">
                <option value="">Selecione</option>
                <option>SP</option>
                <option>RJ</option>
                <option>MG</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox"> Cliente VIP
            </label>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-outline" onclick="document.getElementById('modalNovoCliente').classList.remove('active')">Cancelar</button>
            <button type="submit" class="btn-primary">Salvar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Libs -->
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <!-- Tema global -->
  <script src="js/theme-switcher.js"></script>
  <!-- Script da página -->
  <script src="js/dashboard-clientes.js"></script>
</body>

</html>