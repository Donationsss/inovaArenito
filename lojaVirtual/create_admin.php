<?php
require_once "db.php";

echo "<h2>Verificar/Criar Usuário Administrador</h2>";

try {
    // Verificar se a tabela usuarios existe
    $stmt = $pdo->prepare("SHOW TABLES LIKE 'usuarios'");
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        echo "<h3>Criando tabela usuarios...</h3>";
        $pdo->exec("
            CREATE TABLE usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                is_admin TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        echo "<p style='color:green'>✅ Tabela usuarios criada</p>";
    } else {
        echo "<p style='color:green'>✅ Tabela usuarios já existe</p>";
    }
    
    // Verificar se já existe um admin
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE is_admin = 1");
    $stmt->execute();
    $admins = $stmt->fetchAll();
    
    if (count($admins) > 0) {
        echo "<h3>Usuários Administradores encontrados:</h3>";
        foreach ($admins as $admin) {
            echo "<p>👤 <strong>{$admin['username']}</strong> (ID: {$admin['id']})</p>";
        }
    } else {
        echo "<h3>❌ Nenhum usuário administrador encontrado!</h3>";
        echo "<p>Criando usuário administrador padrão...</p>";
        
        $username = "admin";
        $password = password_hash("123456", PASSWORD_DEFAULT);
        
        $stmt = $pdo->prepare("INSERT INTO usuarios (username, password, is_admin) VALUES (?, ?, 1)");
        $stmt->execute([$username, $password]);
        
        echo "<p style='color:green'>✅ Usuário administrador criado!</p>";
        echo "<p><strong>Username:</strong> admin</p>";
        echo "<p><strong>Password:</strong> 123456</p>";
        echo "<p style='color:red'>⚠️ IMPORTANTE: Altere esta senha após o primeiro login!</p>";
    }
    
    // Verificar se a tabela produtos existe
    echo "<h3>Verificando tabela produtos...</h3>";
    $stmt = $pdo->prepare("SHOW TABLES LIKE 'produtos'");
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        echo "<p>Criando tabela produtos...</p>";
        $pdo->exec("
            CREATE TABLE produtos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                categoria VARCHAR(100) NOT NULL,
                marca VARCHAR(100),
                preco DECIMAL(10,2) NOT NULL,
                preco_promocional DECIMAL(10,2) DEFAULT NULL,
                estoque INT DEFAULT 0,
                imagem VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        echo "<p style='color:green'>✅ Tabela produtos criada</p>";
    } else {
        echo "<p style='color:green'>✅ Tabela produtos já existe</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color:red'>❌ Erro: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<h3>Próximos passos:</h3>";
echo "<ol>";
echo "<li><a href='login.php'>Fazer login como administrador</a></li>";
echo "<li><a href='dashboard-produtos.php'>Acessar dashboard de produtos</a></li>";
echo "<li><a href='test_produto.php'>Executar teste de produto</a></li>";
echo "</ol>";
?>