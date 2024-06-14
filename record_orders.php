<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db = 'ecommerceproject';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid input"]);
    exit();
}

$user_id = $data['userId'];
$first_name = $data['orderDetails']['firstName'];
$last_name = $data['orderDetails']['lastName'];
$street_address = $data['orderDetails']['streetAddress'];
$city = $data['orderDetails']['city'];
$phone_number = $data['orderDetails']['phoneNumber'];
$email_address = $data['orderDetails']['emailAddress'];
$note = $data['orderDetails']['note'];
$purchase_date = $data['purchaseDate'];
$products = $data['products'];

// Insert order details into the orders table
$stmt = $conn->prepare("INSERT INTO orders (user_id, first_name, last_name, street_address, city, phone_number, email_address, note, purchase_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("issssssss", $user_id, $first_name, $last_name, $street_address, $city, $phone_number, $email_address, $note, $purchase_date);

if ($stmt->execute()) {
    $order_id = $stmt->insert_id; // Get the last inserted order ID

    // Insert product details into the order_items table
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, title, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)");

    foreach ($products as $product) {
        $product_id = $product['id'];
        $title = $product['title'];
        $price = $product['price'];
        $quantity = $product['quantity'];
        $image = $product['image'];

        $stmt->bind_param("iisdss", $order_id, $product_id, $title, $price, $quantity, $image);
        
        if (!$stmt->execute()) {
            echo json_encode(["error" => "Error: " . $stmt->error]);
            $stmt->close();
            $conn->close();
            exit();
        }
    }

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
