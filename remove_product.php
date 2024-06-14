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

    // Check if itemID is provided in JSON data
    if (isset($data->itemID)) {
        $itemID = $data->itemID;

        // Prepare SQL statement using a prepared statement
        $sql = "DELETE FROM items WHERE itemID = ?";

        // Create a prepared statement
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bind_param("i", $itemID); // Assuming itemID is an integer (change 'i' if it's another type)

        // Execute the statement
        if ($stmt->execute()) {
            echo "Item deleted successfully";
        } else {
            echo "Error deleting item: " . $conn->error;
        }

        // Close statement
        $stmt->close();
    } else {
        echo "Item ID is required.";
    }
} else {
    echo "Invalid request method.";
}

// Close database connection
$conn->close();
?>
