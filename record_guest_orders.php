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

$first_name = $data['orderDetails']['firstName'];
$last_name = $data['orderDetails']['lastName'];
$street_address = $data['orderDetails']['streetAddress'];
$city = $data['orderDetails']['city'];
$phone_number = $data['orderDetails']['phoneNumber'];
$email_address = $data['orderDetails']['emailAddress'];
$note = $data['orderDetails']['note'];
$products = json_encode($data['products']);
$purchase_date = $data['purchaseDate'];

// Insert guest details into guests table
$stmt_guest = $conn->prepare("INSERT INTO guests (first_name, last_name, street_address, city, phone_number, email_address) VALUES (?, ?, ?, ?, ?, ?)");
$stmt_guest->bind_param("ssssss", $first_name, $last_name, $street_address, $city, $phone_number, $email_address);

if ($stmt_guest->execute()) {
    $guest_id = $stmt_guest->insert_id;

    $stmt_order = $conn->prepare("INSERT INTO guest_orders (guest_id, first_name, last_name, street_address, city, phone_number, email_address, note, products, purchase_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt_order->bind_param("isssssssss", $guest_id, $first_name, $last_name, $street_address, $city, $phone_number, $email_address, $note, $products, $purchase_date);

    if ($stmt_order->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt_order->error]);
    }

    $stmt_order->close();
} else {
    echo json_encode(["error" => "Error: " . $stmt_guest->error]);
}

$stmt_guest->close();
$conn->close();
?>
