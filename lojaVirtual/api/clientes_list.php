<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$stmt = $pdo->query("
    SELECT u.id, u.username, u.email, u.is_vip,
           COUNT(v.id) as total_compras,
           COALESCE(SUM(v.valor_total), 0) as total_gasto
    FROM usuarios u
    LEFT JOIN vendas v ON u.id = v.usuario_id AND v.status = 'completed'
    GROUP BY u.id, u.username, u.email, u.is_vip
    ORDER BY u.id DESC
");
echo json_encode($stmt->fetchAll());
