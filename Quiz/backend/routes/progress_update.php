<?php
session_start();
require_once __DIR__ . '/../lib/helpers.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error'=>'Método inválido'],405);
if (!isset($_SESSION['user_id'])) json_response(['error'=>'Não autenticado'],401);

$user_id = (int)$_SESSION['user_id'];
$points  = (int)($_POST['points'] ?? 0);
$correct = (int)($_POST['correct'] ?? 0);
$total   = (int)($_POST['total'] ?? 12);

$acc = $total > 0 ? round(($correct/$total)*100, 2) : 0.00;

$today = new DateTime('today');
$datestr = $today->format('Y-m-d');
$iso_year = (int)$today->format('o');
$iso_week = (int)$today->format('W');

$pdo->beginTransaction();
try {
  // Daily upsert
  $stmt = $pdo->prepare("SELECT id, quizzes_played, points, accuracy_percent FROM progress_daily WHERE user_id=? AND date=? FOR UPDATE");
  $stmt->execute([$user_id, $datestr]);
  if ($row = $stmt->fetch()) {
    $newPlayed = $row['quizzes_played'] + 1;
    // Média ponderada simples de acurácia
    $newAcc = ($row['accuracy_percent'] * $row['quizzes_played'] + $acc) / $newPlayed;
    $upd = $pdo->prepare("UPDATE progress_daily SET quizzes_played=?, points=points+?, accuracy_percent=? WHERE id=?");
    $upd->execute([$newPlayed, $points, round($newAcc,2), $row['id']]);
  } else {
    $ins = $pdo->prepare("INSERT INTO progress_daily (user_id, date, quizzes_played, points, accuracy_percent) VALUES (?,?,?,?,?)");
    $ins->execute([$user_id, $datestr, 1, $points, $acc]);
  }

  // Weekly upsert
  $stmt2 = $pdo->prepare("SELECT id, quizzes_played, accuracy_percent FROM progress_weekly WHERE user_id=? AND iso_year=? AND iso_week=? FOR UPDATE");
  $stmt2->execute([$user_id, $iso_year, $iso_week]);
  if ($roww = $stmt2->fetch()) {
    $newPlayed = $roww['quizzes_played'] + 1;
    $newAcc = ($roww['accuracy_percent'] * $roww['quizzes_played'] + $acc) / $newPlayed;
    $upd2 = $pdo->prepare("UPDATE progress_weekly SET quizzes_played=?, points=points+?, accuracy_percent=? WHERE id=?");
    $upd2->execute([$newPlayed, $points, round($newAcc,2), $roww['id']]);
  } else {
    $ins2 = $pdo->prepare("INSERT INTO progress_weekly (user_id, iso_year, iso_week, quizzes_played, points, accuracy_percent) VALUES (?,?,?,?,?,?)");
    $ins2->execute([$user_id, $iso_year, $iso_week, 1, $points, $acc]);
  }

  $pdo->commit();
  json_response(['success'=>true]);
} catch (Throwable $e) {
  $pdo->rollBack();
  json_response(['error'=>'Falha ao atualizar progresso'],500);
}
