<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

try {
    // Contar total de vendas
    $totalQuery = $pdo->query("SELECT COUNT(*) FROM vendas WHERE status = 'completed'");
    $totalVendas = $totalQuery->fetchColumn();
    $totalPages = ceil($totalVendas / $limit);

    // Buscar vendas da página atual
    $vendasQuery = $pdo->prepare("
        SELECT v.id, v.produto_nome, v.quantidade, v.valor_total, v.data, v.status,
               COALESCE(u.username, v.cliente_email, 'Cliente Anônimo') as cliente
        FROM vendas v 
        LEFT JOIN usuarios u ON v.usuario_id = u.id 
        WHERE v.status = 'completed'
        ORDER BY v.data DESC 
        LIMIT :limit OFFSET :offset
    ");
    
    $vendasQuery->bindValue(':limit', $limit, PDO::PARAM_INT);
    $vendasQuery->bindValue(':offset', $offset, PDO::PARAM_INT);
    $vendasQuery->execute();
    
    $vendas = $vendasQuery->fetchAll();

    echo json_encode([
        'vendas' => $vendas,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_items' => $totalVendas,
            'items_per_page' => $limit,
            'has_next' => $page < $totalPages,
            'has_prev' => $page > 1
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>