<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../config/mail_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error'=>'Método inválido'],405);

$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
if (!$email) json_response(['error'=>'E-mail inválido'],422);

$user = user_by_username_or_email($pdo, $email);
if (!$user) {
  // Resposta genérica para não revelar existência
  json_response(['success'=>true]);
}

$code = create_reset_code($pdo, $user['id']);

// Enviar e-mail com mail()
$to = $email;
$subject = MAIL_SUBJECT_PREFIX . ' Código de redefinição de senha';
$message = "Olá, {$user['full_name']}\n\nSeu código de redefinição é: {$code}\nEle expira em 15 minutos.\n\nSe não foi solicitado, ignore este e-mail.";
$headers = "From: ".MAIL_FROM."\r\n".
           "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($to, $subject, $message, $headers); // pode retornar true mesmo sem entrega real

json_response(['success'=>true]);
