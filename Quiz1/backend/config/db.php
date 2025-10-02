<?php
$env = require __DIR__ . '/env.php';
$dsn = "mysql:host={$env['db']['host']};dbname={$env['db']['name']};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
try {
    $pdo = new PDO($dsn, $env['db']['user'], $env['db']['pass'], $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo 'DB error';
    exit;
}
