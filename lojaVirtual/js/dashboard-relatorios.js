AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

const ctxFat = document.getElementById('faturamentoChart');
const ctxCat = document.getElementById('categoriaChart');
const ctxPay = document.getElementById('pagamentoChart');

if (ctxFat) {
    new Chart(ctxFat, {
        type: 'bar',
        data: {
            labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            datasets: [{
                label: 'Faturamento (R$)',
                data: [120, 140, 180, 160, 200, 230, 260, 280, 310, 340, 320, 360],
                backgroundColor: 'rgba(37,99,235,0.6)',
                borderColor: '#2563eb',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => 'R$ ' + v + 'k' } },
                x: { grid: { display: false } }
            }
        }
    });
}

if (ctxCat) {
    new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: ['Hardware','Periféricos','Notebooks','Smartphones'],
            datasets: [{
                data: [35, 20, 25, 20],
                backgroundColor: ['#2563eb','#8b5cf6','#10b981','#f59e0b'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
}

if (ctxPay) {
    new Chart(ctxPay, {
        type: 'pie',
        data: {
            labels: ['Cartão','PIX','Boleto','PayPal'],
            datasets: [{
                data: [55, 30, 10, 5],
                backgroundColor: ['#2563eb','#10b981','#f59e0b','#ef4444'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
}
