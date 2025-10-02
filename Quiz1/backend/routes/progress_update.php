<?php
session_start();
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../lib/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['error' => 'Método inválido'], 405);
if (!isset($_SESSION['user_id'])) json_response(['error' => 'Não autenticado'], 401);

$uid = (int)$_SESSION['user_id'];
$points = (int)($_POST['points'] ?? 0);
$correct = (int)($_POST['correct'] ?? 0);
$total = (int)($_POST['total'] ?? 12);
$acc = $total > 0 ? round(($correct / $total) * 100, 2) : 0.0;

$today = new DateTime('today');
$datestr = $today->format('Y-m-d');
$iso_year = (int)$today->format('o');
$iso_week = (int)$today->format('W');

$pdo->beginTransaction();
try {
    $st = $pdo->prepare("SELECT id,quizzes_played,accuracy_percent,points FROM progress_daily WHERE user_id=? AND date=? FOR UPDATE");
    $st->execute([$uid, $datestr]);
    if ($r = $st->fetch()) {
        $n = $r['quizzes_played'] + 1;
        $newAcc = ($r['accuracy_percent'] * $r['quizzes_played'] + $acc) / $n;
        $pdo->prepare("UPDATE progress_daily SET quizzes_played=?, points=points+?, accuracy_percent=? WHERE id=?")
            ->execute([$n, $points, round($newAcc, 2), $r['id']]);
    } else {
        $pdo->prepare("INSERT INTO progress_daily(user_id,date,quizzes_played,points,accuracy_percent) VALUES(?,?,?,?,?)")
            ->execute([$uid, $datestr, 1, $points, $acc]);
    }

    $st = $pdo->prepare("SELECT id,quizzes_played,accuracy_percent,points FROM progress_weekly WHERE user_id=? AND iso_year=? AND iso_week=? FOR UPDATE");
    $st->execute([$uid, $iso_year, $iso_week]);
    if ($r = $st->fetch()) {
        $n = $r['quizzes_played'] + 1;
        $newAcc = ($r['accuracy_percent'] * $r['quizzes_played'] + $acc) / $n;
        $pdo->prepare("UPDATE progress_weekly SET quizzes_played=?, points=points+?, accuracy_percent=? WHERE id=?")
            ->execute([$n, $points, round($newAcc, 2), $r['id']]);
    } else {
        $pdo->prepare("INSERT INTO progress_weekly(user_id,iso_year,iso_week,quizzes_played,points,accuracy_percent) VALUES(?,?,?,?,?,?)")
            ->execute([$uid, $iso_year, $iso_week, 1, $points, $acc]);
    }

    $pdo->commit();
    json_response(['success' => true]);
} catch (Throwable $e) {
    $pdo->rollBack();
    json_response(['error' => 'Falha ao atualizar progresso'], 500);
}
