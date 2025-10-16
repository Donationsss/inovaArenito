<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$stmt = $pdo->query("SELECT id, nome, categoria, marca, preco, preco_promocional, estoque, imagem FROM produtos ORDER BY created_at DESC");
echo json_encode($stmt->fetchAll());
