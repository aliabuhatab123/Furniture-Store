<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "ecommerceproject";   // Replace with your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch data from orders table with associated order_items
$sql = "SELECT o.id as order_id, o.user_id, o.first_name, o.last_name, o.street_address, o.city, o.phone_number, o.email_address, o.note, o.purchase_date, oi.product_id, oi.title as product_title, oi.price as product_price, oi.quantity as product_quantity, oi.image as product_image
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id";

$result = $conn->query($sql);

if (!$result) {
    // Query failed
    die("Query failed: " . $conn->error);
}

if ($result->num_rows > 0) {
    $orders = array();
    while ($row = $result->fetch_assoc()) {
        $order_id = $row['order_id'];

        // Check if order already exists in $orders array
        $order_index = array_search($order_id, array_column($orders, 'order_id'));

        if ($order_index === false) {
            // If order not found, add it to $orders array
            $orders[] = array(
                'order_id' => $order_id,
                'user_id' => $row['user_id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'street_address' => $row['street_address'],
                'city' => $row['city'],
                'phone_number' => $row['phone_number'],
                'email_address' => $row['email_address'],
                'note' => $row['note'],
                'purchase_date' => $row['purchase_date'],
                'products' => array(
                    array(
                        'product_id' => $row['product_id'],
                        'title' => $row['product_title'],
                        'price' => $row['product_price'],
                        'quantity' => $row['product_quantity'],
                        'image' => $row['product_image']
                    )
                )
            );
        } else {
            // If order exists, add product to 'products' array of existing order
            $orders[$order_index]['products'][] = array(
                'product_id' => $row['product_id'],
                'title' => $row['product_title'],
                'price' => $row['product_price'],
                'quantity' => $row['product_quantity'],
                'image' => $row['product_image']
            );
        }
    }
    echo json_encode($orders);
} else {
    echo json_encode(array('message' => 'No orders found.'));
}

$conn->close();
?>
