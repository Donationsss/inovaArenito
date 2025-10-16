<?php
require_once "../db.php";
session_start();
header('Content-Type: application/json; charset=utf-8');

$payload = json_decode(file_get_contents('php://input'), true);
$itens = $payload['itens'] ?? [];
$cliente_email = $payload['cliente_email'] ?? null;
$usuario_id = $_SESSION['usuario_id'] ?? null;

if (!is_array($itens) || !count($itens)) {
    http_response_code(422);
    echo json_encode(['error' => 'Carrinho vazio']);
    exit;
}

$pdo->beginTransaction();
try {
    foreach ($itens as $i) {
        $produto_id = (int)$i['id'];
        $nome = $i['nome'];
        $quant = (int)$i['quantidade'];
        $valor = (float)$i['preco'];

        $stmt = $pdo->prepare("SELECT estoque FROM produtos WHERE id=? FOR UPDATE");
        $stmt->execute([$produto_id]);
        $p = $stmt->fetch();
        if (!$p) {
            throw new Exception('Produto não encontrado');
        }
        if ($p['estoque'] < $quant) {
            throw new Exception('Sem estoque');
        }

        $novoEstoque = $p['estoque'] - $quant;
        $up = $pdo->prepare("UPDATE produtos SET estoque=? WHERE id=?");
        $up->execute([$novoEstoque, $produto_id]);

        $total = $valor * $quant;

        $ins = $pdo->prepare("INSERT INTO vendas (usuario_id, cliente_email, produto_id, produto_nome, quantidade, valor_unit, valor_total, status) VALUES (?,?,?,?,?,?,?,'completed')");
        $ins->execute([$usuario_id, $cliente_email, $produto_id, $nome, $quant, $valor, $total]);
    }
    $pdo->commit();
    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    $pdo->rollBack();
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
