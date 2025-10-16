<?php
echo "<h2>Debug API Performance</h2>";
echo "<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>";

echo "<h3>1. Teste de Conexão com DB</h3>";
try {
    require_once "db.php";
    echo "✅ Conexão com DB OK<br>";
    
    // Teste query simples
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM produtos");
    $stmt->execute();
    $result = $stmt->fetch();
    echo "✅ Total de produtos: " . $result['total'] . "<br>";
    
} catch (Exception $e) {
    echo "❌ Erro DB: " . $e->getMessage() . "<br>";
}

echo "<h3>2. Teste da API Performance</h3>";
session_start();

// Definir parâmetros
$_GET['periodo'] = '30';
$_GET['limit'] = '5';

try {
    ob_start();
    include 'api/performance_produtos.php';
    $output = ob_get_clean();
    
    echo "<strong>Saída da API:</strong><br>";
    echo "<pre style='background: #f5f5f5; padding: 10px; border-radius: 5px; max-height: 400px; overflow-y: auto;'>";
    echo htmlspecialchars($output);
    echo "</pre>";
    
    $data = json_decode($output, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo "<br>✅ JSON válido<br>";
        if (isset($data['error'])) {
            echo "❌ Erro na API: " . $data['error'] . "<br>";
        } else {
            echo "✅ API funcionando! " . count($data['data']) . " produtos retornados<br>";
        }
    } else {
        echo "❌ JSON inválido: " . json_last_error_msg() . "<br>";
    }
    
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "<br>";
}

echo "<hr>";
echo "<p><a href='dashboard-relatorios.php'>→ Dashboard de Relatórios</a></p>";
?>