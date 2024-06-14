<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root"; // Change this to your MySQL username
$password = ""; // Change this to your MySQL password
$dbname = "ecommerceproject";
$table = "items";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize the input (ensure all fields are provided)
    $itemId = isset($_POST['itemId']) ? $_POST['itemId'] : '';
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $price = isset($_POST['price']) ? $_POST['price'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $category = isset($_POST['category']) ? $_POST['category'] : '';
    $longDescription = isset($_POST['longDescription']) ? $_POST['longDescription'] : '';

    // Check if an image file is uploaded
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Directory to save uploaded images
        $targetDir = "library/images/products/";

        // Create directory if it doesn't exist
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Check file extension
        $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
        $allowedExtensions = array("jpg", "jpeg", "png", "gif");

        if (!in_array($imageFileType, $allowedExtensions)) {
            echo json_encode(array("error" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."));
            exit;
        }

        // Generate a unique filename based on item ID and original file name
        $fileName = urlencode($itemId . "_" . basename($_FILES["image"]["name"]));
        $targetFile = $targetDir . $fileName;

        // Check if file is uploaded successfully
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            // Update product details including image path in database
            $sql = "UPDATE $table SET title=?, price=?, description=?, category=?, mainImagePath=?, longDescription=? WHERE itemID=?";
            $stmt = $conn->prepare($sql);

            // Check if prepare() succeeded
            if ($stmt === false) {
                echo json_encode(array("error" => "Prepare statement failed: " . $conn->error));
                exit;
            }

            $stmt->bind_param("ssssssi", $title, $price, $description, $category, $targetFile, $longDescription, $itemId);

            if ($stmt->execute()) {
                echo json_encode(array("message" => "Item updated successfully"));
            } else {
                echo json_encode(array("error" => "Error updating item: " . $stmt->error));
            }

            $stmt->close();
        } else {
            echo json_encode(array("error" => "Sorry, there was an error uploading your file."));
        }
    } else {
        // If no image is uploaded, update product details without changing image path
        $sql = "UPDATE $table SET title=?, price=?, description=?, category=?, longDescription=? WHERE itemID=?";
        $stmt = $conn->prepare($sql);

        // Check if prepare() succeeded
        if ($stmt === false) {
            echo json_encode(array("error" => "Prepare statement failed: " . $conn->error));
            exit;
        }

        $stmt->bind_param("sssssi", $title, $price, $description, $category, $longDescription, $itemId);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Item updated successfully"));
        } else {
            echo json_encode(array("error" => "Error updating item: " . $stmt->error));
        }

        $stmt->close();
    }
} else {
    // Set response code to 405 (Method Not Allowed) and exit
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
}

$conn->close();
?>
