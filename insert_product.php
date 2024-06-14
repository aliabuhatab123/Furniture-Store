<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";  
$password = "";  
$dbname = "ecommerceproject"; 
$table = "items"; 

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all necessary fields are set
    if(isset($_POST["title"], $_POST["price"], $_POST["description"], $_POST["category"], $_POST["longDescription"], $_FILES["image"])) {
        // Retrieve form data and store them in variables
        $title = $_POST["title"];
        $price = $_POST["price"];
        $description = $_POST["description"];
        $category = $_POST["category"];
        $longDescription = $_POST["longDescription"];
        
        // Get the last inserted ID
        $last_id = $conn->insert_id;

        // Directory to save uploaded images
        $targetDir = "library/images/products/";

        // Create directory if it doesn't exist
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Upload image
        $fileName = urlencode($last_id . "_" . basename($_FILES["image"]["name"]));
        $targetFile = $targetDir . $fileName;

        // Check if file is uploaded successfully
        if(move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            // Insert product details into database
            $sql = "INSERT INTO $table (title, price, description, category, mainImagePath, longDescription) VALUES (?, ?, ?, ?, ?, ?)";
            // use prepare method to prevent the SQL injection hacking 
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssss", $title, $price, $description, $category, $targetFile, $longDescription);
            
            if ($stmt->execute()) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $stmt->close();
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        echo "Required fields are missing.";
    }
}

$conn->close();
?>
