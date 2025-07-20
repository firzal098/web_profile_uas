<?php
header('Content-Type: application/json; charset=utf-8');

$filename = 'comment-data.txt';

$name = $_POST['name'] ?? '';
$text = str_replace(["\r", "|"], '', $_POST['text'] ?? '');
$text = str_replace("\n", '<br>', $text); // ← encode newlines!
if (trim($name) === '' || trim($text) === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Name and text required']);
    exit;
}

$timestamp = time();

// sanitize + encode to utf-8
$entry = implode('|', [
    $name,
    $timestamp,
    str_replace(["\r", "|"], '', $text) // keep \n!
]) . "\n";


// force utf-8 encoding when writing
file_put_contents($filename, $entry, FILE_APPEND | LOCK_EX);

include 'get-comments.php';
