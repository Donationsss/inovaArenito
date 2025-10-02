<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../config/mail_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Método inválido'], 405);

$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
if (!$email) json_response(['error' => 'E-mail inválido'], 422);

$user = user_by_username_or_email($pdo, $email);
if (!$user) json_response(['success' => true]); // resposta genérica

$code = create_reset_code($pdo, $user['id']);

$headers = "From: " . MAIL_FROM . "\r\n" .
    "MIME-Version: 1.0\r\n" .
    "Content-Type: text/plain; charset=UTF-8\r\n";

$subject = MAIL_SUBJECT_PREFIX . ' Código de redefinição';
$txt = "Olá, {$user['full_name']}\n\nSeu código para redefinição: {$code}\nVálido por 15 minutos.\n\nSe não foi solicitado, ignore este e-mail.";

@mail($email, $subject, $txt, $headers);

json_response(['success' => true]);
