<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Teste Chart.js</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .chart-container { width: 400px; height: 300px; margin: 20px 0; }
        .debug { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h2>Teste Chart.js</h2>
    
    <div class="debug">
        <h3>Debug:</h3>
        <p id="debug-info">Carregando...</p>
    </div>
    
    <div class="chart-container">
        <canvas id="testChart"></canvas>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const debug = document.getElementById('debug-info');
            
            // Verificar se Chart.js foi carregado
            if (typeof Chart === 'undefined') {
                debug.innerHTML = '❌ Chart.js não foi carregado!';
                return;
            }
            
            debug.innerHTML = '✅ Chart.js carregado! Versão: ' + Chart.version;
            
            // Criar gráfico de teste
            const canvas = document.getElementById('testChart');
            if (!canvas) {
                debug.innerHTML += '<br>❌ Canvas não encontrado!';
                return;
            }
            
            const ctx = canvas.getContext('2d');
            
            try {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
                        datasets: [{
                            label: 'Teste',
                            data: [12, 19, 3, 5],
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                
                debug.innerHTML += '<br>✅ Gráfico criado com sucesso!';
                
            } catch (error) {
                debug.innerHTML += '<br>❌ Erro ao criar gráfico: ' + error.message;
            }
        });
    </script>
    
    <p><a href="dashboard-relatorios.php">← Voltar para Dashboard</a></p>
</body>
</html>