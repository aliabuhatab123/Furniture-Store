<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$servername = "localhost";
$username = "root";  
$password = "";  
$dbname = "ecommerceproject"; 
$table = "items"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// SQL query to fetch items grouped by category
$sql = "
    SELECT 
        category,
        itemID,
        title,
        price,
        description,
        mainImagePath
    FROM items
";

$result = $conn->query($sql);

$categories = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $category = $row['category'];

        if (!isset($categories[$category])) {
            $categories[$category] = array(
                "name" => $category,
                "products" => array()
            );
        }

        $categories[$category]["products"][] = array(
            "id" => $row['itemID'],
            "title" => $row['title'],
            "price" => $row['price'],
            "description" => $row['description'],
            "image" => $row['mainImagePath']
        );
    }
}

echo json_encode(array_values($categories));

$conn->close();
?>
