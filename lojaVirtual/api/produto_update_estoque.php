<?php
require_once "../db.php";
session_start();
if (empty($_SESSION['is_admin'])) {
    http_response_code(403);
    exit;
}

$id = (int)($_POST['id'] ?? 0);
$estoque = (int)($_POST['estoque'] ?? 0);
if ($id <= 0) {
    http_response_code(422);
    exit;
}

$stmt = $pdo->prepare("UPDATE produtos SET estoque=? WHERE id=?");
$stmt->execute([$estoque, $id]);
echo "OK";
