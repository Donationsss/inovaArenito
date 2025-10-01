<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../lib/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error'=>'Método inválido'],405);

$input = $_POST;
require_post_fields(['email','code','new_password','confirm_password'], $input);

$email = filter_var($input['email'], FILTER_VALIDATE_EMAIL) ?: json_response(['error'=>'E-mail inválido'],422);
$user  = user_by_username_or_email($pdo, $email);
if (!$user) json_response(['error'=>'Código inválido'],400);

if ($input['new_password'] !== $input['confirm_password']) json_response(['error'=>'Senhas não coincidem'],422);
if (strlen($input['new_password']) < 8) json_response(['error'=>'Senha deve ter pelo menos 8 caracteres'],422);

if (!consume_reset_code($pdo, $user['id'], $input['code'])) {
  json_response(['error'=>'Código inválido ou expirado'],400);
}

$algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
$newHash = password_hash($input['new_password'], $algo);
$stmt = $pdo->prepare("UPDATE users SET password_hash=? WHERE id=?");
$stmt->execute([$newHash, $user['id']]);

json_response(['success'=>true]);
