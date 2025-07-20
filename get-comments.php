<?php
header('Content-Type: application/json; charset=utf-8'); // 💥 this tells JS it's utf-8

$filename = 'comment-data.txt';
$comments = [];

if (file_exists($filename)) {
    $lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        [$name, $timestamp, $text] = explode('|', $line, 3);
        $text = str_replace('\\n', "\n", $text); // decode line breaks
        $comments[] = [
            'name' => $name,
            'timestamp' => (int)$timestamp,
            'text' => $text
        ];
    }
}

echo json_encode($comments, JSON_UNESCAPED_UNICODE); // 💖 keeps emojis!
