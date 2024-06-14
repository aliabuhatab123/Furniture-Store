<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the JSON data sent from the frontend
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate the received data
    if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
        echo json_encode(array("status" => "error", "message" => "Name, email, and password are required."));
        exit();
    }

    // Connect to the database
    $conn = new mysqli("localhost", "root", "", "ecommerceproject");

    // Check for database connection errors
    if ($conn->connect_error) {
        echo json_encode(array("status" => "error", "message" => "Database connection failed: " . $conn->connect_error));
        exit();
    }

    // Prepare the data for insertion into the database
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $password = sha1($conn->real_escape_string($data['password'])); // Hash the password for security
    $userLevel = "user"; // Set default user level

    // Check if the user with the provided email or name already exists
    $checkQuery = "SELECT * FROM users WHERE userEmail='$email' OR userName='$name'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        // User with the same email or name already exists
        echo json_encode(array("status" => "error", "message" => "User with the same email or name already exists."));
        exit();
    }

    // Insert the user data into the database
    $sql = "INSERT INTO users (userName, userEmail, userPassword, userLevel) VALUES ('$name', '$email', '$password', '$userLevel')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("status" => "success", "message" => "User registered successfully."));
    } else {
        echo json_encode(array("status" => "error", "message" => "Error registering user: " . $conn->error));
    }

    // Close the database connection
    $conn->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}
