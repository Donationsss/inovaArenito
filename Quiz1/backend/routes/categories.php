<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../lib/helpers.php';
$rows = $pdo->query("SELECT id,name,slug FROM categories ORDER BY name ASC")->fetchAll();
json_response(['categories' => $rows]);
