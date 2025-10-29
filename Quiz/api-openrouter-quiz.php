<?php
header('Content-Type: application/json');

$api_key = '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'; // Sua API key OpenRouter

$data = json_decode(file_get_contents('php://input'), true);
$category = $data['category'] ?? 'Conhecimentos gerais';
$qty = $data['qty'] ?? 10;

$prompt = "Gere $qty perguntas de múltipla escolha sobre \"$category\" em português, cada uma com 4 opções, retornando SOMENTE um array JSON conforme:
[
  {\"question\": \"...\", \"options\": [\"A\", \"B\", \"C\", \"D\"], \"correct\": 0}
]";

$curl = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $api_key"
]);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([
    "model" => "gpt-4o-mini",
    "messages" => [
        ["role" => "user", "content" => $prompt]
    ],
    "max_tokens" => 1500,
    "temperature" => 0.8
]));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);
$info = curl_getinfo($curl);
curl_close($curl);

if ($response === false || $info['http_code'] !== 200) {
    echo json_encode(["error" => "Falha comunicação com OpenRouter: " . $response]);
    exit;
}

$result = json_decode($response, true);
$content = $result['choices'][0]['message']['content'] ?? '';
if (preg_match('/(\[.*\])/s', $content, $match)) {
    $jsonText = $match[1];
} else {
    $jsonText = $content;
}

try {
    $questions = json_decode($jsonText, true);
    if (!is_array($questions)) throw new Exception("JSON inválido");
    echo json_encode(["questions" => $questions]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erro ao decodificar JSON: " . $e->getMessage(), "raw" => $content]);
}
?>
