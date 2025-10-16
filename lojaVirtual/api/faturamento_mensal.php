<?php
require_once dirname(__DIR__) . "/db.php";
// session_start(); // Removido - sessão já iniciada pelo arquivo principal

// Temporário: remover validação para testes
// if (empty($_SESSION['is_admin']) && empty($_SESSION['usuario_id'])) {
//     http_response_code(403);
//     echo json_encode(["error" => "Acesso negado"]);
//     exit;
// }

try {
    $year = $_GET['year'] ?? date('Y');
    
    // Query para buscar faturamento mensal do ano especificado
    $sql = "
        SELECT 
            MONTH(data) as mes,
            SUM(valor_total) as faturamento,
            COUNT(*) as total_vendas
        FROM vendas 
        WHERE YEAR(data) = ? 
        AND status = 'completed'
        GROUP BY MONTH(data)
        ORDER BY mes
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$year]);
    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Criar array com todos os 12 meses, preenchendo com 0 os que não têm dados
    $meses = [
        1 => 'Janeiro', 2 => 'Fevereiro', 3 => 'Março', 4 => 'Abril',
        5 => 'Maio', 6 => 'Junho', 7 => 'Julho', 8 => 'Agosto',
        9 => 'Setembro', 10 => 'Outubro', 11 => 'Novembro', 12 => 'Dezembro'
    ];
    
    $resultado = [];
    foreach ($meses as $num_mes => $nome_mes) {
        $encontrado = false;
        foreach ($dados as $dado) {
            if ($dado['mes'] == $num_mes) {
                $resultado[] = [
                    'mes' => $num_mes,
                    'nome_mes' => $nome_mes,
                    'faturamento' => floatval($dado['faturamento']),
                    'total_vendas' => intval($dado['total_vendas'])
                ];
                $encontrado = true;
                break;
            }
        }
        
        if (!$encontrado) {
            $resultado[] = [
                'mes' => $num_mes,
                'nome_mes' => $nome_mes,
                'faturamento' => 0,
                'total_vendas' => 0
            ];
        }
    }
    
    // Calcular total anual
    $total_anual = array_sum(array_column($resultado, 'faturamento'));
    $total_vendas_anual = array_sum(array_column($resultado, 'total_vendas'));
    
    echo json_encode([
        'success' => true,
        'year' => $year,
        'data' => $resultado,
        'resumo' => [
            'total_anual' => $total_anual,
            'total_vendas_anual' => $total_vendas_anual,
            'media_mensal' => $total_anual / 12
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar dados: ' . $e->getMessage()]);
}
?>