<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Include your database connection file
include_once 'db_connection.php';

// Read the raw input stream
$data = file_get_contents("php://input");

// Decode the JSON data
$request = json_decode($data, true);

// Retrieve user data from the decoded JSON
$userId = $request['userId'] ?? '';
$userData = $request['userData'] ?? '';

// Extract user data
$firstName = $userData['firstName'] ?? '';
$lastName = $userData['lastName'] ?? '';
$email = $userData['email'] ?? '';
$gender = $userData['gender'] ?? '';
$phoneNumber = $userData['phoneNumber'] ?? '';

// Prepare and execute SQL statement to update user data
$sql = "UPDATE users SET firstName = ?, lastName = ?, email = ?, gender = ?, phoneNumber = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $firstName, $lastName, $email, $gender, $phoneNumber, $userId);
$result = $stmt->execute();

if ($result) {
    // User data updated successfully
    echo json_encode(array("message" => "User data updated successfully"));
} else {
    // Error updating user data
    http_response_code(500);
    echo json_encode(array("message" => "Error updating user data"));
}

// Close statement and database connection
$stmt->close();
$conn->close();
?>
