<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error'=>'Método inválido'],405);

$input = $_POST;
require_post_fields(['full_name','username','email','password','confirm_password'], $input);

$full_name = sanitize($input['full_name']);
$username  = sanitize($input['username']);
$email     = filter_var($input['email'], FILTER_VALIDATE_EMAIL) ?: json_response(['error'=>'E-mail inválido'],422);
$pass      = $input['password'];
$confirm   = $input['confirm_password'];

if ($pass !== $confirm) json_response(['error'=>'Senhas não coincidem'],422);
if (strlen($pass) < 8)  json_response(['error'=>'Senha deve ter pelo menos 8 caracteres'],422);

if (user_by_username_or_email($pdo, $username)) json_response(['error'=>'Nome de usuário já existe'],409);
if (user_by_username_or_email($pdo, $email))    json_response(['error'=>'E-mail já cadastrado'],409);

$user_id = create_user($pdo, $full_name, $username, $email, $pass);
json_response(['success'=>true,'user_id'=>$user_id],201);
