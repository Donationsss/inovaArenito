<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatórios - Dashboard TechStore</title>
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
            <a href="dashboard-clientes.php" class="nav-item">
                <i class="fas fa-users"></i>
                <span>Clientes</span>
            </a>
            <a href="dashboard-relatorios.php" class="nav-item active">
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
                <h1>Relatórios</h1>
            </div>
            <div class="topbar-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar...">
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
            <!-- Filters -->
            <div class="report-filters" data-aos="fade-up">
                <div class="filter-group">
                    <label>Período</label>
                    <select class="form-control">
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Últimos 90 dias</option>
                        <option>Este Ano</option>
                        <option>Personalizado</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Tipo de Relatório</label>
                    <select class="form-control">
                        <option>Vendas</option>
                        <option>Produtos</option>
                        <option>Clientes</option>
                        <option>Financeiro</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Categoria</label>
                    <select class="form-control">
                        <option>Todas</option>
                        <option>Hardware</option>
                        <option>Periféricos</option>
                        <option>Notebooks</option>
                        <option>Smartphones</option>
                    </select>
                </div>
                <button class="btn-primary">
                    <i class="fas fa-search"></i>
                    Gerar Relatório
                </button>
            </div>

            <!-- Report Cards -->
            <div class="report-cards-grid" data-aos="fade-up">
                <div class="report-card">
                    <div class="report-icon">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <div class="report-info">
                        <h3>Relatório de Vendas</h3>
                        <p>Análise completa das vendas do período</p>
                        <button class="btn-sm btn-primary">
                            <i class="fas fa-download"></i>
                            Baixar PDF
                        </button>
                    </div>
                </div>

                <div class="report-card">
                    <div class="report-icon">
                        <i class="fas fa-box-open"></i>
                    </div>
                    <div class="report-info">
                        <h3>Relatório de Estoque</h3>
                        <p>Situação atual do inventário</p>
                        <button class="btn-sm btn-primary">
                            <i class="fas fa-download"></i>
                            Baixar PDF
                        </button>
                    </div>
                </div>

                <div class="report-card">
                    <div class="report-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="report-info">
                        <h3>Relatório de Clientes</h3>
                        <p>Dados e comportamento dos clientes</p>
                        <button class="btn-sm btn-primary">
                            <i class="fas fa-download"></i>
                            Baixar PDF
                        </button>
                    </div>
                </div>

                <div class="report-card">
                    <div class="report-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="report-info">
                        <h3>Relatório Financeiro</h3>
                        <p>Receitas, despesas e lucros</p>
                        <button class="btn-sm btn-primary">
                            <i class="fas fa-download"></i>
                            Baixar PDF
                        </button>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div class="report-charts" data-aos="fade-up">
                <div class="chart-card-large">
                    <div class="card-header">
                        <h3>Faturamento Mensal</h3>
                        <select class="select-period">
                            <option>2025</option>
                            <option>2024</option>
                            <option>2023</option>
                        </select>
                    </div>
                    <div class="chart-container-large">
                        <canvas id="faturamentoChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="charts-row" data-aos="fade-up">
                <div class="chart-card">
                    <div class="card-header">
                        <h3>Vendas por Categoria</h3>
                    </div>
                    <div class="chart-container">
                        <canvas id="categoriaChart"></canvas>
                    </div>
                </div>

                <div class="chart-card">
                    <div class="card-header">
                        <h3>Métodos de Pagamento</h3>
                    </div>
                    <div class="chart-container">
                        <canvas id="pagamentoChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Performance Table -->
            <div class="table-card" data-aos="fade-up">
                <div class="card-header">
                    <h3>Performance de Produtos</h3>
                    <button class="btn-export">
                        <i class="fas fa-file-excel"></i>
                        Exportar Excel
                    </button>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Vendas</th>
                                <th>Receita</th>
                                <th>Margem</th>
                                <th>Tendência</th>
                            </tr>
                        </thead>
                        <tbody id="performanceTableBody">
                            <!-- Dados serão carregados via JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/toast.js"></script>
    <script src="js/theme-switcher.js"></script>
    <script>AOS.init();</script> <!-- Inicializar AOS -->
    <script src="js/relatorios-data.js"></script>
    <!-- <script src="js/dashboard-relatorios.js"></script> Comentado - conflita com relatorios-data.js -->
</body>

</html>