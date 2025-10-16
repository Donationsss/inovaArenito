<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

try {
    $kpis = [];
    
    // Total de clientes
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $total = $stmt->fetch();
    $kpis['total_clientes'] = (int)$total['total'];
    
    // Clientes VIP
    $stmt = $pdo->query("SELECT COUNT(*) as vip FROM usuarios WHERE is_vip = 1");
    $vip = $stmt->fetch();
    $kpis['clientes_vip'] = (int)$vip['vip'];
    
    // Clientes que já compraram
    $stmt = $pdo->query("
        SELECT COUNT(DISTINCT usuario_id) as ativos 
        FROM vendas 
        WHERE status = 'completed'
    ");
    $ativos = $stmt->fetch();
    $kpis['clientes_ativos'] = (int)$ativos['ativos'];
    
    // Novos clientes (simulado - não temos created_at)
    $kpis['novos_clientes'] = 0;
    
    echo json_encode($kpis);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>