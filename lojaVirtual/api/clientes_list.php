<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$stmt = $pdo->query("SELECT id, username, email, created_at FROM usuarios ORDER BY created_at DESC");
echo json_encode($stmt->fetchAll());
