<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "ecommerceproject";

// Establishing connection to MySQL database
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handling POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode JSON input
    $data = json_decode(file_get_contents("php://input"));

    // Check if userId is provided in JSON data and not empty
    if (isset($data->userId) && !empty($data->userId)) {
        $userId = $data->userId;

        // Prepare SQL statement to delete user
        $delete_sql = "DELETE FROM users WHERE Id = ?";
        $delete_stmt = $conn->prepare($delete_sql);

        if (!$delete_stmt) {
            echo json_encode(array("status" => "error", "message" => "Prepare statement failed: " . $conn->error));
            exit;
        }

        $delete_stmt->bind_param("i", $userId);

        // Execute deletion of user
        if ($delete_stmt->execute()) {
            // Check if any rows were affected
            if ($delete_stmt->affected_rows > 0) {
                echo json_encode(array("status" => "success", "message" => "User deleted successfully"));
            } else {
                echo json_encode(array("status" => "error", "message" => "No such user with ID $userId"));
            }
        } else {
            // Check if deletion failed due to foreign key constraint violation
            if ($conn->errno == 1451) {
                echo json_encode(array("status" => "error", "message" => "Error deleting user: There are associated records in other tables."));
            } else {
                echo json_encode(array("status" => "error", "message" => "Error deleting user: " . $conn->error));
            }
        }

        $delete_stmt->close();
    } else {
        // User ID is empty
        echo json_encode(array("status" => "error", "message" => "Please provide the user ID"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}

// Close database connection
$conn->close();
?>
