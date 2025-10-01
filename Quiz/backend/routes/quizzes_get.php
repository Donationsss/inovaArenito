<?php
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../config/db.php';

$featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
$category = isset($_GET['category']) ? (int)$_GET['category'] : null;

$sql = "SELECT q.id, q.title, q.difficulty, q.avg_rating, q.total_questions, q.time_limit_seconds, q.is_featured,
               c.id as category_id, c.name as category_name, c.slug as category_slug
        FROM quizzes q
        JOIN categories c ON c.id = q.category_id
        WHERE 1=1";
$params = [];
if ($featured !== null) { $sql .= " AND q.is_featured = ?"; $params[] = $featured; }
if ($category) { $sql .= " AND q.category_id = ?"; $params[] = $category; }
$sql .= " ORDER BY q.is_featured DESC, q.created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
json_response(['quizzes'=>$stmt->fetchAll()]);
