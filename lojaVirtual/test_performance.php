<?php
session_start();

echo "<h2>Teste API Performance Produtos</h2>";
echo "<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>";

// Incluir a API diretamente
$_GET['periodo'] = '30';
$_GET['limit'] = '10';

ob_start();
include 'api/performance_produtos.php';
$output = ob_get_clean();

echo "<h3>Resposta da API:</h3>";
echo "<pre style='background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;'>";
echo htmlspecialchars($output);
echo "</pre>";

$data = json_decode($output, true);
if ($data && !isset($data['error'])) {
    echo "<div style='color: green; margin-top: 10px;'>✅ API funcionando! " . count($data['data']) . " produtos encontrados.</div>";
} else {
    echo "<div style='color: red; margin-top: 10px;'>❌ Erro na API</div>";
}

echo "<hr>";
echo "<p><a href='dashboard-relatorios.php'>→ Ir para Dashboard</a></p>";
?>