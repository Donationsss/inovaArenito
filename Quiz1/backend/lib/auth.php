<?php
require_once __DIR__ . '/../config/db.php';

function user_by_username_or_email(PDO $pdo, $id)
{
    $st = $pdo->prepare("SELECT * FROM users WHERE username=:u OR email=:u LIMIT 1");
    $st->execute([':u' => $id]);
    return $st->fetch();
}
function create_user(PDO $pdo, $full, $user, $email, $pass)
{
    $algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
    $hash = password_hash($pass, $algo);
    $st = $pdo->prepare("INSERT INTO users(full_name,username,email,password_hash) VALUES(?,?,?,?)");
    $st->execute([$full, $user, $email, $hash]);
    return (int)$pdo->lastInsertId();
}
function set_remember(PDO $pdo, $user_id, $token)
{
    $st = $pdo->prepare("UPDATE users SET remember_token=? WHERE id=?");
    $st->execute([$token, $user_id]);
}
function create_reset_code(PDO $pdo, $user_id)
{
    $code = str_pad((string)random_int(0, 99999999), 8, '0', STR_PAD_LEFT);
    $exp = (new DateTime('+15 minutes'))->format('Y-m-d H:i:s');
    $pdo->prepare("INSERT INTO password_resets(user_id,code,expires_at) VALUES(?,?,?)")->execute([$user_id, $code, $exp]);
    return $code;
}
function consume_reset_code(PDO $pdo, $user_id, $code)
{
    $st = $pdo->prepare("SELECT * FROM password_resets WHERE user_id=? AND code=? AND used=0 LIMIT 1");
    $st->execute([$user_id, $code]);
    $row = $st->fetch();
    if (!$row) return false;
    if (new DateTime() > new DateTime($row['expires_at'])) return false;
    $pdo->prepare("UPDATE password_resets SET used=1 WHERE id=?")->execute([$row['id']]);
    return true;
}
