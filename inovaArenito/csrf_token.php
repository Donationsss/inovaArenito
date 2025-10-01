<?php
// csrf_token.php
// Gera e guarda token de CSRF na sessão para validação no envio do formulário.
// Uso: o front-end faz fetch('csrf_token.php') e preenche o campo hidden.

session_start();

if (!isset($_SESSION['csrf_token']) || empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(24));
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
