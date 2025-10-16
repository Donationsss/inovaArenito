<?php
session_start();

// Simular que está logado como admin para os testes
if (empty($_SESSION['is_admin'])) {
    $_SESSION['usuario_id'] = 9;
    $_SESSION['usuario_nome'] = 'Admin';
    $_SESSION['is_admin'] = true;
}

echo "<h2>Teste Direto das APIs (sem HTTP)</h2>";
echo "<style>
body { font-family: Arial, sans-serif; margin: 20px; }
.test { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
.success { background-color: #d4edda; }
.error { background-color: #f8d7da; }
pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; max-height: 300px; }
</style>";

// Teste 1: API Faturamento Mensal
echo "<div class='test'>";
echo "<h3>1. Faturamento Mensal</h3>";
ob_start();
$_GET['year'] = '2025';
include 'api/faturamento_mensal.php';
$output = ob_get_clean();

$data = json_decode($output, true);
if ($data && !isset($data['error'])) {
    echo "<div class='success'>✅ API funcionando!</div>";
    echo "<p><strong>Dados encontrados:</strong> " . count($data['data']) . " meses</p>";
    echo "<details><summary>Ver resposta</summary><pre>$output</pre></details>";
} else {
    echo "<div class='error'>❌ Erro na API</div>";
    echo "<pre>$output</pre>";
}
echo "</div>";

// Teste 2: API Vendas por Categoria
echo "<div class='test'>";
echo "<h3>2. Vendas por Categoria</h3>";
ob_start();
$_GET['periodo'] = '30';
include 'api/vendas_por_categoria.php';
$output = ob_get_clean();

$data = json_decode($output, true);
if ($data && !isset($data['error'])) {
    echo "<div class='success'>✅ API funcionando!</div>";
    echo "<p><strong>Categorias encontradas:</strong> " . count($data['data']) . "</p>";
    echo "<details><summary>Ver resposta</summary><pre>$output</pre></details>";
} else {
    echo "<div class='error'>❌ Erro na API</div>";
    echo "<pre>$output</pre>";
}
echo "</div>";

// Teste 3: API Performance Produtos
echo "<div class='test'>";
echo "<h3>3. Performance de Produtos</h3>";
ob_start();
$_GET['periodo'] = '30';
$_GET['limit'] = '10';
include 'api/performance_produtos.php';
$output = ob_get_clean();

$data = json_decode($output, true);
if ($data && !isset($data['error'])) {
    echo "<div class='success'>✅ API funcionando!</div>";
    echo "<p><strong>Produtos encontrados:</strong> " . count($data['data']) . "</p>";
    echo "<details><summary>Ver resposta</summary><pre>$output</pre></details>";
} else {
    echo "<div class='error'>❌ Erro na API</div>";
    echo "<pre>$output</pre>";
}
echo "</div>";

echo "<hr>";
echo "<p><a href='dashboard-relatorios.php'>→ Testar Dashboard de Relatórios</a></p>";
?>