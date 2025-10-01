<?php
session_start();
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error'=>'Método inválido'],405);

$input = $_POST;
require_post_fields(['username','password'], $input);

$user = user_by_username_or_email($pdo, $input['username']);
if (!$user) json_response(['error'=>'Credenciais inválidas'],401);

if (!password_verify($input['password'], $user['password_hash'])) {
  json_response(['error'=>'Credenciais inválidas'],401);
}

// Rehash se necessário
if (verify_password_needs_rehash($user['password_hash'])) {
  $algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
  $newHash = password_hash($input['password'], $algo);
  $stmt = $pdo->prepare("UPDATE users SET password_hash=? WHERE id=?");
  $stmt->execute([$newHash, $user['id']]);
}

$_SESSION['user_id'] = (int)$user['id'];

if (!empty($input['remember'])) {
  $token = bin2hex(random_bytes(32));
  setcookie('remember', $token, time()+60*60*24*30, '/', '', false, true);
  set_remember_token($pdo, $user['id'], $token);
}

json_response(['success'=>true]);
