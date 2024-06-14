<?php
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if user data exists in session storage
if (isset($_SESSION['userData'])) {
    $userData = $_SESSION['userData'];
    $response = ['loggedIn' => true, 'userData' => $userData];
} else {
    $response = ['loggedIn' => false];
}

echo json_encode($response);
?>
