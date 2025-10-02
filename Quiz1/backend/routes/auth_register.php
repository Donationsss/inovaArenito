<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Método inválido'], 405);

$in = $_POST;
require_post_fields(['full_name', 'username', 'email', 'password', 'confirm_password'], $in);

$full = sanitize($in['full_name']);
$user = sanitize($in['username']);
$email = filter_var($in['email'], FILTER_VALIDATE_EMAIL) ?: json_response(['error' => 'E-mail inválido'], 422);
$pass = $in['password'];
$conf = $in['confirm_password'];

if ($pass !== $conf) json_response(['error' => 'Senhas não coincidem'], 422);
if (strlen($pass) < 8) json_response(['error' => 'Senha deve ter pelo menos 8 caracteres'], 422);

if (user_by_username_or_email($pdo, $user)) json_response(['error' => 'Nome de usuário já existe'], 409);
if (user_by_username_or_email($pdo, $email)) json_response(['error' => 'E-mail já cadastrado'], 409);

$id = create_user($pdo, $full, $user, $email, $pass);
json_response(['success' => true, 'user_id' => $id], 201);
