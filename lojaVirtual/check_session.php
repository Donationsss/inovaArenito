<?php
session_start();

echo "<h2>Status da Sessão</h2>";
echo "<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>";

if (empty($_SESSION)) {
    echo "<p style='color: red;'>❌ Nenhuma sessão ativa</p>";
    echo "<p><a href='login.php'>→ Fazer login</a></p>";
} else {
    echo "<p style='color: green;'>✅ Sessão ativa!</p>";
    echo "<pre>";
    print_r($_SESSION);
    echo "</pre>";
    
    if (!empty($_SESSION['is_admin'])) {
        echo "<p style='color: green;'>✅ Usuário é administrador</p>";
        echo "<p><a href='dashboard-relatorios.php'>→ Ir para Relatórios</a></p>";
    } else {
        echo "<p style='color: orange;'>⚠️ Usuário não é administrador</p>";
    }
}

echo "<hr>";
echo "<p><a href='dashboard.php'>← Dashboard Principal</a></p>";
?>