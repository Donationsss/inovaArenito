<?php
require_once "../db.php";
header('Content-Type: application/json; charset=utf-8');

$kpis = [];

/* total de vendas */
$row = $pdo->query("SELECT COUNT(*) c FROM vendas WHERE status='completed'")->fetch();
$kpis['total_vendas'] = (int)$row['c'];

/* receita total */
$row = $pdo->query("SELECT COALESCE(SUM(valor_total),0) s FROM vendas WHERE status='completed'")->fetch();
$kpis['receita_total'] = (float)$row['s'];

/* clientes ativos */
$row = $pdo->query("SELECT COUNT(*) c FROM usuarios")->fetch();
$kpis['clientes_ativos'] = (int)$row['c'];

/* produtos vendidos */
$row = $pdo->query("SELECT COALESCE(SUM(quantidade),0) q FROM vendas WHERE status='completed'")->fetch();
$kpis['produtos_vendidos'] = (int)$row['q'];

/* top produtos */
$top = $pdo->query("SELECT produto_id, produto_nome, SUM(quantidade) total_qtd, SUM(valor_total) total_valor
                    FROM vendas WHERE status='completed'
                    GROUP BY produto_id, produto_nome
                    ORDER BY total_qtd DESC LIMIT 10")->fetchAll();
$kpis['top_produtos'] = $top;

/* vendas do mês (por dia) */
$cur = date('Y-m-01');
$series = $pdo->query("SELECT DATE(data) dia, SUM(valor_total) valor
                       FROM vendas
                       WHERE status='completed' AND data >= '{$cur}'
                       GROUP BY DATE(data)
                       ORDER BY dia ASC")->fetchAll();
$kpis['vendas_mes'] = $series;

/* vendas recentes */
$recentes = $pdo->query("SELECT v.id, v.produto_nome, v.quantidade, v.valor_total, v.data, v.status, 
                               COALESCE(u.username, v.cliente_email, 'Cliente Anônimo') as cliente
                         FROM vendas v 
                         LEFT JOIN usuarios u ON v.usuario_id = u.id 
                         ORDER BY v.data DESC LIMIT 20")->fetchAll();
$kpis['vendas_recentes'] = $recentes;

echo json_encode($kpis);
