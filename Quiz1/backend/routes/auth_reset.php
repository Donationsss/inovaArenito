<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Método inválido'], 405);

require_post_fields(['email', 'code', 'new_password', 'confirm_password'], $_POST);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ?: json_response(['error' => 'E-mail inválido'], 422);

$user = user_by_username_or_email($pdo, $email);
if (!$user) json_response(['error' => 'Código inválido'], 400);

if ($_POST['new_password'] !== $_POST['confirm_password']) json_response(['error' => 'Senhas não coincidem'], 422);
if (strlen($_POST['new_password']) < 8) json_response(['error' => 'Senha deve ter pelo menos 8 caracteres'], 422);

if (!consume_reset_code($pdo, $user['id'], $_POST['code'])) json_response(['error' => 'Código inválido/expirado'], 400);

$algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
$hash = password_hash($_POST['new_password'], $algo);
$pdo->prepare("UPDATE users SET password_hash=? WHERE id=?")->execute([$hash, $user['id']]);

json_response(['success' => true]);
