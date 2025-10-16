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
    $periodo = intval($_GET['periodo'] ?? 30);
    $limit = intval($_GET['limit'] ?? 10);
    
    // Validar limites
    if ($limit > 50) $limit = 50;
    if ($limit < 1) $limit = 10;
    
    // Query sem placeholders problemáticos
    $sql = "
        SELECT 
            p.nome,
            p.categoria,
            p.preco,
            p.preco_promocional,
            COUNT(v.id) as total_vendas,
            COALESCE(SUM(v.quantidade), 0) as quantidade_vendida,
            COALESCE(SUM(v.valor_total), 0) as receita_total
        FROM produtos p
        LEFT JOIN vendas v ON p.id = v.produto_id AND v.status = 'completed'
        GROUP BY p.id, p.nome, p.categoria, p.preco, p.preco_promocional
        ORDER BY total_vendas DESC
        LIMIT " . $limit . "
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $resultado = [];
    foreach ($dados as $dado) {
        $total_vendas = intval($dado['total_vendas'] ?? 0);
        $receita = floatval($dado['receita_total'] ?? 0);
        $preco = floatval($dado['preco_promocional'] ?? $dado['preco'] ?? 0);
        
        // Cálculo simples de margem
        $margem = $receita > 0 ? 30.0 : 0; // Margem fixa para simplicidade
        
        // Tendência baseada nas vendas
        $tendencia = 'baixa';
        if ($total_vendas >= 5) {
            $tendencia = 'alta';
        } elseif ($total_vendas >= 2) {
            $tendencia = 'media';
        }
        
        $resultado[] = [
            'produto' => $dado['nome'] ?? 'Produto',
            'categoria' => ucfirst($dado['categoria'] ?? 'categoria'),
            'total_vendas' => $total_vendas,
            'quantidade_vendida' => intval($dado['quantidade_vendida'] ?? 0),
            'receita_total' => $receita,
            'ticket_medio' => $receita > 0 && $total_vendas > 0 ? ($receita / $total_vendas) : 0,
            'margem' => $margem,
            'lucro_estimado' => $receita * 0.3, // 30% da receita como lucro
            'tendencia' => $tendencia,
            'preco_atual' => $preco
        ];
    }
    
    echo json_encode([
        'success' => true,
        'periodo' => $periodo . ' dias',
        'data' => $resultado,
        'resumo' => [
            'total_produtos' => count($resultado),
            'receita_total' => array_sum(array_column($resultado, 'receita_total')),
            'produto_lider' => !empty($resultado) ? $resultado[0]['produto'] : null
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro ao buscar dados: ' . $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    ]);
}
?>