<?php
require_once dirname(__DIR__) . "/db.php";
// session_start(); // Removido - sessão já iniciada pelo arquivo principal

// Temporário: remover validação para testes
// if (empty($_SESSION['is_admin']) && empty($_SESSION['usuario_id'])) {
//     http_response_code(403);
//     echo json_encode(["error" => "Acesso negado"]);
//     exit;
// }

try {
    $periodo = $_GET['periodo'] ?? '30'; // dias
    
    // Query para buscar vendas por categoria no período especificado
    $sql = "
        SELECT 
            p.categoria,
            COUNT(v.id) as total_vendas,
            SUM(v.quantidade) as quantidade_total,
            SUM(v.valor_total) as faturamento_total,
            AVG(v.valor_total) as ticket_medio
        FROM vendas v
        JOIN produtos p ON v.produto_id = p.id
        WHERE v.data >= DATE_SUB(NOW(), INTERVAL ? DAY)
        AND v.status = 'completed'
        GROUP BY p.categoria
        ORDER BY faturamento_total DESC
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$periodo]);
    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Calcular percentuais
    $total_geral = array_sum(array_column($dados, 'faturamento_total'));
    
    $resultado = [];
    $cores = [
        '#2563eb', // Azul
        '#10b981', // Verde
        '#f59e0b', // Amarelo
        '#ef4444', // Vermelho
        '#8b5cf6', // Roxo
        '#f97316', // Laranja
        '#06b6d4', // Cyan
        '#84cc16'  // Lima
    ];
    
    foreach ($dados as $index => $dado) {
        $percentual = $total_geral > 0 ? ($dado['faturamento_total'] / $total_geral) * 100 : 0;
        
        $resultado[] = [
            'categoria' => ucfirst($dado['categoria']),
            'total_vendas' => intval($dado['total_vendas']),
            'quantidade_total' => intval($dado['quantidade_total']),
            'faturamento_total' => floatval($dado['faturamento_total']),
            'ticket_medio' => floatval($dado['ticket_medio']),
            'percentual' => round($percentual, 1),
            'cor' => $cores[$index % count($cores)]
        ];
    }
    
    // Se não houver dados, retornar categorias com valores zerados
    if (empty($resultado)) {
        $categorias_padrao = ['hardware', 'notebooks', 'smartphones', 'tablets', 'perifericos'];
        foreach ($categorias_padrao as $index => $categoria) {
            $resultado[] = [
                'categoria' => ucfirst($categoria),
                'total_vendas' => 0,
                'quantidade_total' => 0,
                'faturamento_total' => 0,
                'ticket_medio' => 0,
                'percentual' => 0,
                'cor' => $cores[$index % count($cores)]
            ];
        }
    }
    
    echo json_encode([
        'success' => true,
        'periodo' => $periodo . ' dias',
        'data' => $resultado,
        'resumo' => [
            'total_categorias' => count($resultado),
            'faturamento_total' => $total_geral,
            'categoria_lider' => !empty($resultado) ? $resultado[0]['categoria'] : null
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar dados: ' . $e->getMessage()]);
}
?>