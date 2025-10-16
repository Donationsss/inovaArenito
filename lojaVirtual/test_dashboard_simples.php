<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste - Dashboard Relatórios Simples</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            color: #1a1a1a;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .chart-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .chart-container {
            height: 300px;
            position: relative;
        }
        .chart-container-large {
            height: 400px;
            position: relative;
        }
        .charts-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        h1, h3 {
            margin-bottom: 1rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        .status-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        .completed { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .pending { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .cancelled { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .text-success { color: #10b981; }
        .text-warning { color: #f59e0b; }
        .text-danger { color: #ef4444; }
        .text-info { color: #3b82f6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Dashboard Relatórios - Teste Simples</h1>
        
        <!-- Gráfico de Faturamento -->
        <div class="chart-card">
            <h3>Faturamento Mensal</h3>
            <div class="chart-container-large">
                <canvas id="faturamentoChart"></canvas>
            </div>
        </div>

        <!-- Gráficos Menores -->
        <div class="charts-row">
            <div class="chart-card">
                <h3>Vendas por Categoria</h3>
                <div class="chart-container">
                    <canvas id="categoriaChart"></canvas>
                </div>
            </div>

            <div class="chart-card">
                <h3>Métodos de Pagamento</h3>
                <div class="chart-container">
                    <canvas id="pagamentoChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Tabela Performance -->
        <div class="chart-card">
            <h3>Performance de Produtos</h3>
            <table>
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

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/relatorios-data.js"></script>
</body>
</html>