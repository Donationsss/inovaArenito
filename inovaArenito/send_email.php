<?php
// send_email.php
// Recebe POST do formulário de contato. Suporta anexo (campo 'anexo') e valida CSRF.
// Envia usando PHP mail() — mantenha as instruções XAMPP abaixo.
// Retorna JSON { success: bool, message/error: string }.

// Recomendação XAMPP (Windows):
// 1) Abra apache\php\php.ini e configure:
//    [mail function]
//    SMTP = smtp.seudominio.com    ; ou localhost se usar sendmail
//    smtp_port = 25
//    sendmail_from = you@seudominio.com
// 2) Configure sendmail (xampp\sendmail\sendmail.ini) com SMTP do seu provedor
//    smtp_server=smtp.gmail.com
//    smtp_port=587
//    auth_username=seuusuario
//    auth_password=sua_senha
//    force_sender=you@seudominio.com
// 3) No php.ini aponte sendmail_path se necessário (Windows geralmente usa sendmail.exe)
//    sendmail_path = "\"C:\xampp\sendmail\sendmail.exe\" -t"
// 4) Reinicie Apache.
// Observação: provedor de email pode bloquear envios diretos; para testes locais o sendmail do XAMPP funciona quando bem configurado.

// --- Início do script ---
header('Content-Type: application/json; charset=utf-8');
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success'=>false,'error'=>'Método não permitido']);
    exit;
}

// Helper sanitização
function clean($v) {
    return trim(filter_var($v, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES));
}

$nome = isset($_POST['nome']) ? clean($_POST['nome']) : '';
$email_raw = isset($_POST['email']) ? trim($_POST['email']) : '';
$email = filter_var($email_raw, FILTER_VALIDATE_EMAIL);
$assunto = isset($_POST['assunto']) ? clean($_POST['assunto']) : 'Contato via site';
$mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';
$csrf = isset($_POST['csrf_token']) ? $_POST['csrf_token'] : '';

// CSRF validation (se token setado em sessão)
if (isset($_SESSION['csrf_token'])) {
    if (!$csrf || !hash_equals($_SESSION['csrf_token'], $csrf)) {
        http_response_code(400);
        echo json_encode(['success'=>false,'error'=>'Token CSRF inválido.']);
        exit;
    }
}

// campos obrigatórios
if (!$nome || !$email || !$mensagem) {
    http_response_code(400);
    echo json_encode(['success'=>false,'error'=>'Campos obrigatórios faltando ou inválidos.']);
    exit;
}

// Destinatário: altere para o e-mail que deve receber as mensagens
$destinatario = 'enzo.donassan@gmail.com'; // <<-- substitua antes de testar

// Cabeçalhos base
$fromHeader = "{$nome} <{$email}>";
$boundary = md5(time());

// Se houver anexo, criar email multipart/mixed; caso contrário enviar texto simples.
$hasAttachment = isset($_FILES['anexo']) && is_uploaded_file($_FILES['anexo']['tmp_name']);
$headers = [];
$headers[] = "From: {$fromHeader}";
$headers[] = "Reply-To: {$email}";
$headers[] = "MIME-Version: 1.0";

$subject = $assunto;

// Monta corpo
$body_plain = "Você recebeu uma nova mensagem pelo formulário de contato.\n\n";
$body_plain .= "Nome: {$nome}\n";
$body_plain .= "Email: {$email}\n";
$body_plain .= "Assunto: {$assunto}\n\n";
$body_plain .= "Mensagem:\n{$mensagem}\n\n";
$body_plain .= "-----\nEnviado em: " . date('Y-m-d H:i:s') . "\n";

// Se attachment -> criar multipart
if ($hasAttachment) {
    $file = $_FILES['anexo'];
    $filename = basename($file['name']);
    $filedata = file_get_contents($file['tmp_name']);
    $filesize = filesize($file['tmp_name']);
    $file_mime = mime_content_type($file['tmp_name']) ?: 'application/octet-stream';
    $attachment = chunk_split(base64_encode($filedata));

    // headers para multipart
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

    // corpo multipart
    $body = "";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=utf-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $body_plain . "\r\n";

    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$file_mime}; name=\"{$filename}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
    $body .= $attachment . "\r\n";
    $body .= "--{$boundary}--";
} else {
    $headers[] = "Content-Type: text/plain; charset=utf-8";
    $body = $body_plain;
}

// Tenta enviar
$header_str = implode("\r\n", $headers);

$sent = @mail($destinatario, $subject, $body, $header_str);

if ($sent) {
    echo json_encode(['success'=>true,'message'=>'Enviado com sucesso.']);
} else {
    http_response_code(500);
    echo json_encode(['success'=>false,'error'=>'Erro ao enviar email (mail() retornou false). Verifique configuração do servidor / sendmail / php.ini.']);
}
