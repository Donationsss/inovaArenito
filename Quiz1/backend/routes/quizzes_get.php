<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../lib/helpers.php';

$featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
$category = isset($_GET['category']) ? (int)$_GET['category'] : null;
$quiz_id  = isset($_GET['quiz_id']) ? (int)$_GET['quiz_id'] : null;

$sql = "SELECT q.*, c.name AS category_name, c.slug AS category_slug
      FROM quizzes q JOIN categories c ON c.id=q.category_id WHERE 1=1";
$p = [];
if ($featured !== null) {
    $sql .= " AND q.is_featured=?";
    $p[] = $featured;
}
if ($category) {
    $sql .= " AND q.category_id=?";
    $p[] = $category;
}
if ($quiz_id) {
    $sql .= " AND q.id=?";
    $p[] = $quiz_id;
}
$sql .= " ORDER BY q.is_featured DESC, q.created_at DESC";

$st = $pdo->prepare($sql);
$st->execute($p);
json_response(['quizzes' => $st->fetchAll()]);
