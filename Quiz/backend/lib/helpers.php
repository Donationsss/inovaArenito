<?php
// backend/lib/helpers.php
function json_response($data, $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data);
  exit;
}

function sanitize($s) {
  return trim(filter_var($s, FILTER_SANITIZE_SPECIAL_CHARS));
}

function require_post_fields($fields, $source) {
  foreach ($fields as $f) {
    if (!isset($source[$f]) || $source[$f] === '') {
      json_response(['error' => "Campo obrigatório: $f"], 422);
    }
  }
}

function iso_week_parts(DateTime $dt) {
  return [(int)$dt->format('o'), (int)$dt->format('W')];
}
