<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$relatorios = [];

try {
    /* Relatório de Vendas */
    // Total de vendas por período
    $vendas_periodo = $pdo->query("
        SELECT 
            DATE(data) as dia,
            COUNT(*) as total_vendas,
            SUM(valor_total) as faturamento
        FROM vendas 
        WHERE status='completed' AND data >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(data)
        ORDER BY dia DESC
    ")->fetchAll();
    $relatorios['vendas_periodo'] = $vendas_periodo;

    // Top produtos vendidos
    $top_produtos = $pdo->query("
        SELECT 
            produto_nome,
            SUM(quantidade) as total_vendido,
            SUM(valor_total) as receita_total,
            COUNT(*) as num_pedidos
        FROM vendas 
        WHERE status='completed' AND data >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY produto_id, produto_nome
        ORDER BY total_vendido DESC
        LIMIT 10
    ")->fetchAll();
    $relatorios['top_produtos'] = $top_produtos;

    /* Relatório de Estoque */
    $estoque_status = $pdo->query("
        SELECT 
            COUNT(*) as total_produtos,
            SUM(CASE WHEN estoque > 10 THEN 1 ELSE 0 END) as estoque_bom,
            SUM(CASE WHEN estoque BETWEEN 1 AND 10 THEN 1 ELSE 0 END) as estoque_baixo,
            SUM(CASE WHEN estoque = 0 THEN 1 ELSE 0 END) as sem_estoque,
            SUM(estoque * preco) as valor_total_estoque
        FROM produtos
    ")->fetch();
    $relatorios['estoque_status'] = $estoque_status;

    // Produtos por categoria
    $produtos_categoria = $pdo->query("
        SELECT 
            categoria,
            COUNT(*) as quantidade,
            SUM(estoque) as estoque_total,
            AVG(preco) as preco_medio
        FROM produtos
        GROUP BY categoria
        ORDER BY quantidade DESC
    ")->fetchAll();
    $relatorios['produtos_categoria'] = $produtos_categoria;

    /* Relatório de Clientes */
    $clientes_stats = $pdo->query("
        SELECT 
            COUNT(*) as total_clientes,
            0 as novos_mes,
            0 as novos_semana
        FROM usuarios
    ")->fetch();
    $relatorios['clientes_stats'] = $clientes_stats;

    // Clientes que mais compraram
    $top_clientes = $pdo->query("
        SELECT 
            u.username,
            u.email,
            COUNT(v.id) as total_pedidos,
            SUM(v.valor_total) as total_gasto
        FROM usuarios u
        LEFT JOIN vendas v ON u.id = v.usuario_id AND v.status = 'completed'
        GROUP BY u.id, u.username, u.email
        HAVING total_pedidos > 0
        ORDER BY total_gasto DESC
        LIMIT 10
    ")->fetchAll();
    $relatorios['top_clientes'] = $top_clientes;

    /* Relatório Financeiro */
    // Faturamento por mês (últimos 24 meses)
    $faturamento_mensal = $pdo->query("
        SELECT 
            DATE_FORMAT(data, '%Y-%m') as mes,
            COUNT(*) as vendas,
            SUM(valor_total) as faturamento,
            AVG(valor_total) as ticket_medio
        FROM vendas 
        WHERE status='completed' AND data >= DATE_SUB(NOW(), INTERVAL 24 MONTH)
        GROUP BY DATE_FORMAT(data, '%Y-%m')
        ORDER BY mes ASC
    ")->fetchAll();
    $relatorios['faturamento_mensal'] = $faturamento_mensal;

    // Resumo financeiro geral
    $resumo_financeiro = $pdo->query("
        SELECT 
            SUM(valor_total) as receita_total,
            COUNT(*) as total_transacoes,
            AVG(valor_total) as ticket_medio,
            SUM(CASE WHEN data >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN valor_total ELSE 0 END) as receita_mes,
            SUM(CASE WHEN data >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN valor_total ELSE 0 END) as receita_semana
        FROM vendas 
        WHERE status='completed'
    ")->fetch();
    $relatorios['resumo_financeiro'] = $resumo_financeiro;

    /* Métricas de Performance */
    // Vendas por categoria (apenas categorias com vendas)
    $performance_categoria = $pdo->query("
        SELECT 
            p.categoria,
            COUNT(v.id) as vendas,
            SUM(v.quantidade) as qtd_vendida,
            SUM(v.valor_total) as receita
        FROM vendas v
        JOIN produtos p ON v.produto_id = p.id
        WHERE v.status = 'completed'
        GROUP BY p.categoria
        ORDER BY receita DESC
    ")->fetchAll();
    $relatorios['performance_categoria'] = $performance_categoria;

    echo json_encode($relatorios);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>