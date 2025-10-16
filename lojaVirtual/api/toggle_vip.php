<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

// Verificar se é administrador
session_start();
if (!isset($_SESSION['usuario_id']) || !isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Acesso negado. Apenas administradores podem alterar status VIP.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$user_id = $input['user_id'] ?? null;
$is_vip = $input['is_vip'] ?? false;

if (!$user_id || !is_numeric($user_id)) {
    http_response_code(422);
    echo json_encode(['error' => 'ID do usuário é obrigatório e deve ser numérico']);
    exit;
}

try {
    // Verificar se o usuário existe
    $stmt = $pdo->prepare("SELECT username, is_vip FROM usuarios WHERE id = ?");
    $stmt->execute([$user_id]);
    $usuario = $stmt->fetch();
    
    if (!$usuario) {
        http_response_code(404);
        echo json_encode(['error' => 'Usuário não encontrado']);
        exit;
    }
    
    // Atualizar status VIP
    $updateStmt = $pdo->prepare("UPDATE usuarios SET is_vip = ? WHERE id = ?");
    $updateStmt->execute([$is_vip ? 1 : 0, $user_id]);
    
    $action = $is_vip ? 'adicionado ao' : 'removido do';
    $message = "Usuário {$usuario['username']} foi {$action} grupo VIP.";
    
    echo json_encode([
        'success' => true,
        'message' => $message,
        'user_id' => $user_id,
        'username' => $usuario['username'],
        'is_vip' => $is_vip
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao alterar status VIP: ' . $e->getMessage()]);
}
?>