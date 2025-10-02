<?php
session_start();
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../lib/helpers.php';

if (!isset($_SESSION['user_id'])) json_response(['error' => 'Não autenticado'], 401);
$uid = (int)$_SESSION['user_id'];

$today = new DateTime('today');
$datestr = $today->format('Y-m-d');
$iso_year = (int)$today->format('o');
$iso_week = (int)$today->format('W');

$st = $pdo->prepare("SELECT quizzes_played,points,accuracy_percent FROM progress_daily WHERE user_id=? AND date=?");
$st->execute([$uid, $datestr]);
$daily = $st->fetch() ?: ['quizzes_played' => 0, 'points' => 0, 'accuracy_percent' => 0];

$st = $pdo->prepare("SELECT quizzes_played,points,accuracy_percent FROM progress_weekly WHERE user_id=? AND iso_year=? AND iso_week=?");
$st->execute([$uid, $iso_year, $iso_week]);
$weekly = $st->fetch() ?: ['quizzes_played' => 0, 'points' => 0, 'accuracy_percent' => 0];

json_response(['daily' => $daily, 'weekly' => $weekly]);
