<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/db.php';
$env = require __DIR__ . '/../config/env.php';

require_once __DIR__ . '/../../vendor/autoload.php';
$client = OpenAI::client($env['openai_api_key']);

$category = $_GET['category'] ?? 'conhecimentos-gerais';
$category = preg_replace('/[^a-zA-Z0-9\-]/', '', $category);

$prompt = "Gere 12 perguntas objetivas (A,B,C,D) em pt-BR sobre a categoria '{$category}'. 
Responda APENAS com JSON válido: 
[{\"text\":\"Pergunta...\",\"answers\":[\"A ...\",\"B ...\",\"C ...\",\"D ...\"],\"correctIndex\":0}, ...]";

try {
    $resp = $client->chat()->create([
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'system', 'content' => 'Você é um gerador de quizzes educacionais.'],
            ['role' => 'user', 'content' => $prompt],
        ],
        'temperature' => 0.8,
    ]);
    $content = $resp->choices[0]->message->content ?? '[]';
    $json = json_decode($content, true);
    if (!is_array($json)) $json = [];
    echo json_encode(['questions' => $json]);
} catch (Throwable $e) {
    echo json_encode(['questions' => []]);
}
