<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerceproject";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  // If there's a connection error, return a JSON response with an error message
  echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
  exit();
}

if (isset($_GET['productId'])) {
  $id = intval($_GET['productId']);
  
  // Prepare and execute the SQL query
  $sql = "SELECT * FROM items WHERE itemID = ?";
  $stmt = $conn->prepare($sql);
  
  if (!$stmt) {
    // If there's an error preparing the statement, return an error response
    echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
    exit();
  }
  
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $result = $stmt->get_result();

  if (!$result) {
    // If there's an error fetching the result, return an error response
    echo json_encode(["error" => "Failed to fetch result: " . $conn->error]);
    exit();
  }

  if ($result->num_rows > 0) {
    // If the product is found, fetch the data and return it as JSON
    $product = $result->fetch_assoc();
    echo json_encode($product);
  } else {
    // If the product is not found, return a JSON response with a message
    echo json_encode(["error" => "Product not found"]);
  }
} else {
  // If no product ID is provided, return a JSON response with a message
  echo json_encode(["error" => "No product ID provided"]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
