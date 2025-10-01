<?php
session_start();
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error'=>'Método inválido'],405);
if (!isset($_SESSION['user_id'])) json_response(['error'=>'Não autenticado'],401);

$user_id = (int)$_SESSION['user_id'];

$quiz_id   = (int)($_POST['quiz_id'] ?? 0);
$score     = (int)($_POST['score'] ?? 0);
$correct   = (int)($_POST['correct'] ?? 0);
$total     = (int)($_POST['total'] ?? 12);
$duration  = (int)($_POST['duration_seconds'] ?? 0);

if ($quiz_id <= 0) json_response(['error'=>'quiz_id inválido'],422);
if ($total <= 0) $total = 12;

$ins = $pdo->prepare("INSERT INTO quiz_attempts (user_id, quiz_id, score, correct_count, total_questions, duration_seconds) VALUES (?,?,?,?,?,?)");
$ins->execute([$user_id, $quiz_id, $score, $correct, $total, $duration]);

json_response(['success'=>true, 'attempt_id'=>$pdo->lastInsertId()]);
