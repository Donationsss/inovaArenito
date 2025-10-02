<?php
session_start();
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Método inválido'], 405);

if (isset($_COOKIE['remember'])) {
    $pdo->prepare("UPDATE users SET remember_token=NULL WHERE remember_token=?")->execute([$_COOKIE['remember']]);
    setcookie('remember', '', time() - 3600, '/');
}
session_unset();
session_destroy();
json_response(['success' => true]);
