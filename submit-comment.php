<?php
header('Content-Type: application/json; charset=utf-8');

$filename = 'comment-data.txt';

$name = $_POST['name'] ?? '';
$text = $_POST['text'] ?? '';

// sanitize name & comment
$name = strip_tags($name);
$text = strip_tags($text);

// slice to max lengths
$name = mb_substr($name, 0, 20);
$text = mb_substr($text, 0, 200);

// clean up special chars
$name = str_replace("|", '', $name);
$text = str_replace(["\r", "|"], '', $text);

// convert newlines to <br>
$text = str_replace("\n", '<br>', $text);

if (trim($name) === '' || trim($text) === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Name and text required']);
    exit;
}

$timestamp = time();

$entry = implode('|', [
    $name,
    $timestamp,
    $text
]) . "\n";

// write to file
file_put_contents($filename, $entry, FILE_APPEND | LOCK_EX);

// return updated comments
include 'get-comments.php';
