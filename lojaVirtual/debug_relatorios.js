// Debug script para dashboard relatórios
console.log('🔧 DEBUG: Script de debug carregado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DEBUG: DOM carregado');
    
    // Verificar Chart.js
    console.log('🔧 DEBUG: Chart.js disponível:', typeof Chart !== 'undefined');
    if (typeof Chart !== 'undefined') {
        console.log('🔧 DEBUG: Chart.js versão:', Chart.version);
    }
    
    // Verificar elementos canvas
    const canvases = ['faturamentoChart', 'categoriaChart', 'pagamentoChart'];
    canvases.forEach(id => {
        const element = document.getElementById(id);
        console.log(`🔧 DEBUG: Canvas ${id}:`, element ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
        if (element) {
            const rect = element.getBoundingClientRect();
            console.log(`🔧 DEBUG: Canvas ${id} dimensões:`, {
                width: rect.width,
                height: rect.height,
                visible: rect.width > 0 && rect.height > 0
            });
        }
    });
    
    // Verificar CSS
    const testChart = document.getElementById('faturamentoChart');
    if (testChart) {
        const styles = window.getComputedStyle(testChart.parentElement);
        console.log('🔧 DEBUG: Container styles:', {
            height: styles.height,
            display: styles.display,
            visibility: styles.visibility,
            overflow: styles.overflow
        });
    }
    
    // Verificar se há erros de rede
    console.log('🔧 DEBUG: Testando APIs...');
    
    fetch('api/faturamento_mensal.php?year=2025')
        .then(response => {
            console.log('🔧 DEBUG: API faturamento - Status:', response.status);
            return response.text();
        })
        .then(text => {
            console.log('🔧 DEBUG: API faturamento - Resposta (100 chars):', text.substring(0, 100));
            try {
                const data = JSON.parse(text);
                console.log('🔧 DEBUG: API faturamento - JSON válido:', data.success);
                
                // Tentar criar um gráfico simples
                const canvas = document.getElementById('faturamentoChart');
                if (canvas && typeof Chart !== 'undefined') {
                    console.log('🔧 DEBUG: Tentando criar gráfico de teste...');
                    const ctx = canvas.getContext('2d');
                    
                    const testChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Fev', 'Mar'],
                            datasets: [{
                                label: 'Teste',
                                data: [10, 20, 15],
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                    
                    console.log('🔧 DEBUG: ✅ Gráfico de teste criado com sucesso!');
                } else {
                    console.log('🔧 DEBUG: ❌ Não foi possível criar gráfico de teste');
                }
                
            } catch (e) {
                console.log('🔧 DEBUG: API faturamento - Erro JSON:', e.message);
            }
        })
        .catch(error => {
            console.log('🔧 DEBUG: API faturamento - Erro de rede:', error);
        });
});