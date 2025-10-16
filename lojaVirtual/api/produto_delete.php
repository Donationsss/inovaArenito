<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

// Verificar se é administrador
session_start();
if (!isset($_SESSION['usuario_id']) || !isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Acesso negado. Apenas administradores podem deletar produtos.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if (!$id || !is_numeric($id)) {
    http_response_code(422);
    echo json_encode(['error' => 'ID do produto é obrigatório e deve ser numérico']);
    exit;
}

try {
    // Verificar se o produto existe
    $stmt = $pdo->prepare("SELECT nome FROM produtos WHERE id = ?");
    $stmt->execute([$id]);
    $produto = $stmt->fetch();
    
    if (!$produto) {
        http_response_code(404);
        echo json_encode(['error' => 'Produto não encontrado']);
        exit;
    }
    
    // Verificar se há vendas relacionadas a este produto
    $vendasStmt = $pdo->prepare("SELECT COUNT(*) FROM vendas WHERE produto_id = ?");
    $vendasStmt->execute([$id]);
    $totalVendas = $vendasStmt->fetchColumn();
    
    if ($totalVendas > 0) {
        // Se há vendas, apenas marcar como inativo ao invés de deletar
        $updateStmt = $pdo->prepare("UPDATE produtos SET ativo = 0 WHERE id = ?");
        $updateStmt->execute([$id]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Produto desativado com sucesso (mantido devido ao histórico de vendas)',
            'action' => 'deactivated'
        ]);
    } else {
        // Se não há vendas, pode deletar completamente
        $deleteStmt = $pdo->prepare("DELETE FROM produtos WHERE id = ?");
        $deleteStmt->execute([$id]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Produto deletado com sucesso',
            'action' => 'deleted'
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao deletar produto: ' . $e->getMessage()]);
}
?>