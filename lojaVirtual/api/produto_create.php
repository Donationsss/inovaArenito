<?php
require_once "../db.php";
session_start();
if (empty($_SESSION['is_admin'])) {
    http_response_code(403);
    exit;
}

$nome = trim($_POST['nome'] ?? '');
$categoria = trim($_POST['categoria'] ?? '');
$marca = trim($_POST['marca'] ?? '');
$preco = (float)($_POST['preco'] ?? 0);
$preco_promocional = strlen($_POST['preco_promocional'] ?? '') ? (float)$_POST['preco_promocional'] : null;
$estoque = (int)($_POST['estoque'] ?? 0);
$imagem = trim($_POST['imagem'] ?? '');

if ($nome === '' || $categoria === '' || $preco <= 0) {
    http_response_code(422);
    echo "Dados inválidos";
    exit;
}

$stmt = $pdo->prepare("INSERT INTO produtos (nome,categoria,marca,preco,preco_promocional,estoque,imagem) VALUES (?,?,?,?,?,?,?)");
$stmt->execute([$nome, $categoria, $marca, $preco, $preco_promocional, $estoque, $imagem]);
echo "OK";
