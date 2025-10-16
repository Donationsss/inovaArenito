<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$kpis = [];

try {
    // Vendas hoje
    $stmt = $pdo->query("
        SELECT 
            COUNT(*) as vendas_hoje,
            COALESCE(SUM(valor_total), 0) as receita_hoje
        FROM vendas 
        WHERE status = 'completed' 
        AND DATE(data) = CURDATE()
    ");
    $hoje = $stmt->fetch();
    
    // Vendas esta semana
    $stmt = $pdo->query("
        SELECT 
            COUNT(*) as vendas_semana,
            COALESCE(SUM(valor_total), 0) as receita_semana
        FROM vendas 
        WHERE status = 'completed' 
        AND YEARWEEK(data, 1) = YEARWEEK(CURDATE(), 1)
    ");
    $semana = $stmt->fetch();
    
    // Vendas este mês
    $stmt = $pdo->query("
        SELECT 
            COUNT(*) as vendas_mes,
            COALESCE(SUM(valor_total), 0) as receita_mes
        FROM vendas 
        WHERE status = 'completed' 
        AND YEAR(data) = YEAR(CURDATE()) 
        AND MONTH(data) = MONTH(CURDATE())
    ");
    $mes = $stmt->fetch();
    
    // Total de pedidos (todas as vendas)
    $stmt = $pdo->query("
        SELECT COUNT(*) as total_pedidos
        FROM vendas
    ");
    $total = $stmt->fetch();
    
    // Calcular mudanças percentuais (simuladas para demonstração)
    $kpis = [
        'vendas_hoje' => [
            'valor' => $hoje['receita_hoje'],
            'quantidade' => $hoje['vendas_hoje'],
            'mudanca' => '+15.3%' // Simulado
        ],
        'vendas_semana' => [
            'valor' => $semana['receita_semana'],
            'quantidade' => $semana['vendas_semana'],
            'mudanca' => '+8.2%' // Simulado
        ],
        'vendas_mes' => [
            'valor' => $mes['receita_mes'],
            'quantidade' => $mes['vendas_mes'],
            'mudanca' => '+12.5%' // Simulado
        ],
        'total_pedidos' => [
            'valor' => $total['total_pedidos'],
            'mudanca' => '-2.4%' // Simulado
        ]
    ];
    
    echo json_encode($kpis);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>