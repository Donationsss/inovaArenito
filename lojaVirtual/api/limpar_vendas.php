<?php
require_once "../db.php";

// Definir cabeçalho antes de qualquer output
header('Content-Type: application/json; charset=utf-8');

// Verificar método
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

try {
    $pdo->beginTransaction();
    
    // Reverter estoque dos produtos vendidos
    $vendas = $pdo->query("
        SELECT produto_id, SUM(quantidade) as total_vendido 
        FROM vendas 
        WHERE status = 'completed'
        GROUP BY produto_id
    ")->fetchAll();
    
    foreach ($vendas as $venda) {
        $pdo->prepare("
            UPDATE produtos 
            SET estoque = estoque + ? 
            WHERE id = ?
        ")->execute([$venda['total_vendido'], $venda['produto_id']]);
    }
    
    // Deletar todas as vendas
    $resultado = $pdo->exec("DELETE FROM vendas WHERE id > 0");
    
    // Resetar auto_increment
    $pdo->exec("ALTER TABLE vendas AUTO_INCREMENT = 1");
    
    $pdo->commit();
    
    echo json_encode([
        'success' => true,
        'message' => "Todas as vendas foram removidas com sucesso. $resultado registros deletados.",
        'vendas_removidas' => $resultado
    ]);

} catch (Exception $e) {
    $pdo->rollback();
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao limpar vendas: ' . $e->getMessage()]);
}
?>