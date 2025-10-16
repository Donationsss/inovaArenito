<?php
require_once "../db.php";
session_start();

if (empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(["error" => "Acesso negado. Usuário não é administrador"]);
    exit;
}

// Verificar se um arquivo foi enviado
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "Nenhum arquivo foi enviado ou houve erro no upload"]);
    exit;
}

$file = $_FILES['image'];
$uploadDir = '../uploads/';

// Validar tipo de arquivo
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["error" => "Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP"]);
    exit;
}

// Validar tamanho (5MB máximo)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(["error" => "Arquivo muito grande. Máximo 5MB"]);
    exit;
}

// Gerar nome único para o arquivo
$fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$fileName = 'produto_' . uniqid() . '_' . time() . '.' . $fileExtension;
$filePath = $uploadDir . $fileName;

// Criar pasta se não existir
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Mover o arquivo
if (move_uploaded_file($file['tmp_name'], $filePath)) {
    // Retornar o caminho relativo da imagem
    $imageUrl = 'uploads/' . $fileName;
    
    echo json_encode([
        "success" => true,
        "image_url" => $imageUrl,
        "message" => "Imagem enviada com sucesso"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao salvar o arquivo"]);
}
?>