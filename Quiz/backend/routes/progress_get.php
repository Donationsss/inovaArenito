<?php
session_start();
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../config/db.php';

if (!isset($_SESSION['user_id'])) json_response(['error'=>'Não autenticado'],401);

$user_id = (int)$_SESSION['user_id'];
$today = new DateTime('today');
list($iso_year, $iso_week) = [(int)$today->format('o'), (int)$today->format('W')];

$stmt = $pdo->prepare("SELECT * FROM progress_daily WHERE user_id=? AND date=?");
$stmt->execute([$user_id, $today->format('Y-m-d')]);
$daily = $stmt->fetch() ?: ['quizzes_played'=>0,'points'=>0,'accuracy_percent'=>0];

$stmt = $pdo->prepare("SELECT * FROM progress_weekly WHERE user_id=? AND iso_year=? AND iso_week=?");
$stmt->execute([$user_id, $iso_year, $iso_week]);
$weekly = $stmt->fetch() ?: ['quizzes_played'=>0,'points'=>0,'accuracy_percent'=>0];

json_response(['daily'=>$daily,'weekly'=>$weekly]);
