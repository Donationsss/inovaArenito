<?php
session_start();
require_once "db.php";

// Simular login como admin para teste
$_SESSION['is_admin'] = true;

echo "<h2>Teste das APIs de Relatórios</h2>";
echo "<style>
body { font-family: Arial, sans-serif; margin: 20px; }
.api-test { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
.success { background-color: #d4edda; border-color: #c3e6cb; }
.error { background-color: #f8d7da; border-color: #f5c6cb; }
pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; }
</style>";

// Testar API de Faturamento Mensal (usando include direto)
echo "<div class='api-test'>";
echo "<h3>1. Faturamento Mensal (2025)</h3>";
try {
    // Limpar $_GET anterior
    $_GET = [];
    $_GET['year'] = '2025';
    
    ob_start();
    include 'api/faturamento_mensal.php';
    $response = ob_get_clean();
    
    // Remover possíveis notices/warnings HTML do início
    $json_start = strpos($response, '{');
    if ($json_start !== false) {
        $clean_response = substr($response, $json_start);
    } else {
        $clean_response = $response;
    }
    
    $data = json_decode($clean_response, true);
    
    if ($data && !isset($data['error'])) {
        echo "<div class='success'>✅ API funcionando!</div>";
        echo "<p><strong>Total anual:</strong> R$ " . number_format($data['resumo']['total_anual'], 2, ',', '.') . "</p>";
        echo "<p><strong>Total de vendas:</strong> " . $data['resumo']['total_vendas_anual'] . "</p>";
        echo "<details><summary>Ver dados completos</summary><pre>" . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre></details>";
    } else {
        echo "<div class='error'>❌ Erro: " . ($data['error'] ?? 'Resposta inválida') . "</div>";
        echo "<pre>Resposta bruta: " . htmlspecialchars($response) . "</pre>";
    }
} catch (Exception $e) {
    echo "<div class='error'>❌ Erro: " . $e->getMessage() . "</div>";
}
echo "</div>";

// Testar API de Vendas por Categoria (usando include direto)
echo "<div class='api-test'>";
echo "<h3>2. Vendas por Categoria (30 dias)</h3>";
try {
    $_GET = [];
    $_GET['periodo'] = '30';
    
    ob_start();
    include 'api/vendas_por_categoria.php';
    $response = ob_get_clean();
    
    // Limpar HTML do JSON
    $json_start = strpos($response, '{');
    $clean_response = $json_start !== false ? substr($response, $json_start) : $response;
    $data = json_decode($clean_response, true);
    
    if ($data && !isset($data['error'])) {
        echo "<div class='success'>✅ API funcionando!</div>";
        echo "<p><strong>Total de categorias:</strong> " . $data['resumo']['total_categorias'] . "</p>";
        echo "<p><strong>Faturamento total:</strong> R$ " . number_format($data['resumo']['faturamento_total'], 2, ',', '.') . "</p>";
        echo "<p><strong>Categoria líder:</strong> " . ($data['resumo']['categoria_lider'] ?? 'N/A') . "</p>";
        echo "<details><summary>Ver dados completos</summary><pre>" . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre></details>";
    } else {
        echo "<div class='error'>❌ Erro: " . ($data['error'] ?? 'Resposta inválida') . "</div>";
        echo "<pre>Resposta bruta: " . htmlspecialchars($response) . "</pre>";
    }
} catch (Exception $e) {
    echo "<div class='error'>❌ Erro: " . $e->getMessage() . "</div>";
}
echo "</div>";

// Testar API de Performance dos Produtos (usando include direto)
echo "<div class='api-test'>";
echo "<h3>3. Performance dos Produtos (30 dias)</h3>";
try {
    // Usar include direto em vez de HTTP request
    $_GET['periodo'] = '30';
    $_GET['limit'] = '5';
    
    ob_start();
    include 'api/performance_produtos.php';
    $response = ob_get_clean();
    
    // Limpar HTML do JSON
    $json_start = strpos($response, '{');
    $clean_response = $json_start !== false ? substr($response, $json_start) : $response;
    $data = json_decode($clean_response, true);
    
    if ($data && !isset($data['error'])) {
        echo "<div class='success'>✅ API funcionando!</div>";
        echo "<p><strong>Total de produtos:</strong> " . $data['resumo']['total_produtos'] . "</p>";
        echo "<p><strong>Receita total:</strong> R$ " . number_format($data['resumo']['receita_total'], 2, ',', '.') . "</p>";
        echo "<p><strong>Produto líder:</strong> " . ($data['resumo']['produto_lider'] ?? 'N/A') . "</p>";
        echo "<details><summary>Ver dados completos</summary><pre>" . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre></details>";
    } else {
        echo "<div class='error'>❌ Erro: " . ($data['error'] ?? 'Resposta inválida') . "</div>";
        echo "<pre>Resposta bruta: " . htmlspecialchars($response) . "</pre>";
    }
} catch (Exception $e) {
    echo "<div class='error'>❌ Erro: " . $e->getMessage() . "</div>";
}
echo "</div>";

echo "<hr>";
echo "<p><a href='dashboard-relatorios.php'>← Ir para Dashboard de Relatórios</a></p>";
?>