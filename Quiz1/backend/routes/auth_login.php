<?php
session_start();
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Método inválido'], 405);

require_post_fields(['username', 'password'], $_POST);
$user = user_by_username_or_email($pdo, $_POST['username']);
if (!$user) json_response(['error' => 'Credenciais inválidas'], 401);

if (!password_verify($_POST['password'], $user['password_hash'])) json_response(['error' => 'Credenciais inválidas'], 401);

$_SESSION['user_id'] = (int)$user['id'];
if (!empty($_POST['remember'])) {
    $token = bin2hex(random_bytes(32));
    setcookie('remember', $token, time() + 60 * 60 * 24 * 30, '/', '', false, true);
    set_remember($pdo, $user['id'], $token);
}
json_response(['success' => true]);
