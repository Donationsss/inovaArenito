<?php
// backend/config/db.php
$DB_HOST = '127.0.0.1';
$DB_NAME = 'quizapp';
$DB_USER = 'root';
$DB_PASS = ''; // padrão do XAMPP
$DB_DSN  = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4";

$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
];

try {
  $pdo = new PDO($DB_DSN, $DB_USER, $DB_PASS, $options);
} catch (PDOException $e) {
  http_response_code(500);
  echo 'DB connection error';
  exit;
}
