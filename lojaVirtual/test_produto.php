<?php
session_start();
require_once "db.php";

echo "<h2>Debug - Criação de Produto</h2>";

// Verificar sessão
echo "<h3>1. Verificando Sessão:</h3>";
if (empty($_SESSION)) {
    echo "<p style='color:red'>❌ Nenhuma sessão ativa</p>";
} else {
    echo "<p>✅ Sessão ativa:</p>";
    echo "<pre>" . print_r($_SESSION, true) . "</pre>";
}

if (empty($_SESSION['is_admin'])) {
    echo "<p style='color:red'>❌ Usuário não é administrador ou não está logado</p>";
} else {
    echo "<p style='color:green'>✅ Usuário é administrador</p>";
}

// Verificar conexão com BD
echo "<h3>2. Verificando Banco de Dados:</h3>";
try {
    $stmt = $pdo->prepare("SHOW TABLES LIKE 'produtos'");
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo "<p style='color:green'>✅ Tabela 'produtos' existe</p>";
        
        // Verificar estrutura da tabela
        $stmt = $pdo->prepare("DESCRIBE produtos");
        $stmt->execute();
        $columns = $stmt->fetchAll();
        echo "<p>Estrutura da tabela:</p>";
        echo "<pre>";
        foreach ($columns as $col) {
            echo $col['Field'] . " - " . $col['Type'] . "\n";
        }
        echo "</pre>";
    } else {
        echo "<p style='color:red'>❌ Tabela 'produtos' não existe</p>";
    }
} catch (Exception $e) {
    echo "<p style='color:red'>❌ Erro de conexão: " . $e->getMessage() . "</p>";
}

// Teste de criação se for admin
if (!empty($_SESSION['is_admin'])) {
    echo "<h3>3. Teste de Criação de Produto:</h3>";
    try {
        $nome = "Produto Teste " . date('H:i:s');
        $categoria = "hardware";
        $marca = "Teste";
        $preco = 99.99;
        $preco_promocional = null;
        $estoque = 10;
        $imagem = "";
        
        $stmt = $pdo->prepare("INSERT INTO produtos (nome,categoria,marca,preco,preco_promocional,estoque,imagem) VALUES (?,?,?,?,?,?,?)");
        $stmt->execute([$nome, $categoria, $marca, $preco, $preco_promocional, $estoque, $imagem]);
        
        echo "<p style='color:green'>✅ Produto teste criado com sucesso!</p>";
        echo "<p>ID: " . $pdo->lastInsertId() . "</p>";
        
    } catch (Exception $e) {
        echo "<p style='color:red'>❌ Erro ao criar produto teste: " . $e->getMessage() . "</p>";
    }
}

echo "<hr>";
echo "<p><a href='login.php'>← Voltar para Login</a></p>";
echo "<p><a href='dashboard-produtos.php'>← Ir para Dashboard</a></p>";
?>