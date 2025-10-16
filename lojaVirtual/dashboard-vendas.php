<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vendas - Dashboard TechStore</title>
    <link rel="stylesheet" href="./css/dashboard.css">
    <link rel="stylesheet" href="./css/dashboard-pages.css">
    <link rel="stylesheet" href="./css/pagination.css">
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
            <a href="dashboard-vendas.php" class="nav-item active">
                <i class="fas fa-shopping-bag"></i>
                <span>Vendas</span>
            </a>
            <a href="dashboard-produtos.php" class="nav-item">
                <i class="fas fa-box"></i>
                <span>Produtos</span>
            </a>
            <a href="dashboard-clientes.php" class="nav-item">
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
                <h1>Vendas</h1>
            </div>
            <div class="topbar-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar vendas...">
                </div>
                <button class="theme-toggle" id="themeToggleDash">
                    <i class="fas fa-moon"></i>
                </button>
                <div class="notifications">
                    <i class="fas fa-bell"></i>
                    <span class="badge">3</span>
                </div>
                <div class="user-menu">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff" alt="User">
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
                        <i class="fas fa-calendar-day"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Vendas Hoje</span>
                        <h3 class="stat-value">R$ 12.450,00</h3>
                        <span class="stat-change positive">+15.3%</span>
                    </div>
                </div>
                <div class="quick-stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-calendar-week"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Esta Semana</span>
                        <h3 class="stat-value">R$ 87.320,00</h3>
                        <span class="stat-change positive">+8.2%</span>
                    </div>
                </div>
                <div class="quick-stat-card">
                    <div class="stat-icon orange">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Este Mês</span>
                        <h3 class="stat-value">R$ 342.850,00</h3>
                        <span class="stat-change positive">+12.5%</span>
                    </div>
                </div>
                <div class="quick-stat-card">
                    <div class="stat-icon purple">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Total de Pedidos</span>
                        <h3 class="stat-value">1.247</h3>
                        <span class="stat-change negative">-2.4%</span>
                    </div>
                </div>
            </div>

            <!-- Filters and Actions -->
            <div class="page-header" data-aos="fade-up">
                <div class="header-left">
                    <button class="btn-primary" id="btnNovaVenda">
                        <i class="fas fa-plus"></i>
                        Nova Venda
                    </button>
                    <button class="btn-outline">
                        <i class="fas fa-filter"></i>
                        Filtros
                    </button>
                    <button class="btn-danger" id="btnLimparVendas">
                        <i class="fas fa-trash-alt"></i>
                        Limpar Todas as Vendas
                    </button>
                </div>
                <div class="header-right">
                    <select class="filter-select">
                        <option>Todas as Vendas</option>
                        <option>Concluídas</option>
                        <option>Pendentes</option>
                        <option>Canceladas</option>
                    </select>
                    <button class="btn-icon">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-icon">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </div>

            <!-- Sales Table -->
            <div class="data-table-card" data-aos="fade-up">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" class="select-all">
                            </th>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Produto</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="vendasTableBody">
                        <!-- Dados carregados via JS -->
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="pagination-container" data-aos="fade-up" id="vendasPaginationContainer">
                <!-- Paginação dinâmica será inserida via JavaScript -->
            </div>
            </div>
        </div>
    </main>

    <!-- Modal Nova Venda -->
    <div class="modal" id="modalNovaVenda">
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-plus-circle"></i> Nova Venda</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="formNovaVenda">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Cliente</label>
                            <select name="cliente_id" id="selectCliente" class="form-control" required>
                                <option value="">Carregando clientes...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Produto</label>
                            <select name="produto_id" id="selectProduto" class="form-control" required>
                                <option value="">Carregando produtos...</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Quantidade</label>
                            <input type="number" name="quantidade" class="form-control" min="1" value="1" required>
                        </div>
                        <div class="form-group">
                            <label>Valor Unitário</label>
                            <input type="number" name="valor_unit" id="valorUnit" class="form-control" step="0.01" placeholder="0.00" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Observações</label>
                        <textarea class="form-control" rows="3" placeholder="Observações adicionais..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal('modalNovaVenda')">Cancelar</button>
                        <button type="submit" class="btn-primary">Salvar Venda</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/toast.js"></script>
    <script src="js/theme-switcher.js"></script>
    <script src="js/dashboard-vendas-data.js"></script>
    <script src="js/dashboard-vendas.js"></script>
</body>

</html>