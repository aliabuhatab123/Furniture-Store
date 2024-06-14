<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";  
$password = "";  
$dbname = "ecommerceproject"; 
$table = "items"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$sql = "SELECT * FROM $table";
$result = $conn->query($sql);

$items = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Append the base URL to the image path to create the complete image URL
        if (isset($row["mainImagePath"])) {
            $row["image_url"] = "http://localhost/api/" . $row["mainImagePath"];
        } else {
            $row["image_url"] = "http://localhost/default-image-path.jpg"; // Fallback image if the path is not set
        }
        // Add additional fields to the $row array
        $row["id"] = $row["itemID"];
        $row["name"] = $row["title"];
        $row["rating"] = 4.5; // Example rating (replace with actual rating field from database)
        $items[] = $row;
    }
} else {
    echo json_encode(["error" => "No records found"]);
    exit();
}

echo json_encode($items);

$conn->close();
?>
