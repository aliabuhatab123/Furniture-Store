<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "ecommerceproject";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user ID is provided
if(isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    // Query to fetch orders and their items for the given user ID
    $sql = "
    SELECT 
        o.id as order_id, 
        o.purchase_date,
        SUM(oi.price * oi.quantity) as total_price,
        GROUP_CONCAT(oi.product_id) as product_ids,
        GROUP_CONCAT(oi.title) as titles,
        GROUP_CONCAT(oi.price) as prices,
        GROUP_CONCAT(oi.quantity) as quantities,
        GROUP_CONCAT(oi.image) as images
    FROM 
        orders o
    LEFT JOIN 
        order_items oi ON o.id = oi.order_id
    WHERE 
        o.user_id = $userId
    GROUP BY 
        o.id, o.purchase_date
    ORDER BY 
        o.purchase_date DESC";

    // Execute the query
    $result = $conn->query($sql);

    // Check if there are any orders
    if ($result->num_rows > 0) {
        $orders = array();

        // Loop through each order
        while($row = $result->fetch_assoc()) {
            $order = array(
                'id' => $row['order_id'],
                'purchase_date' => $row['purchase_date'],
                'total_price' => $row['total_price'],
                'products' => array()
            );
            
            $product_ids = explode(',', $row['product_ids']);
            $titles = explode(',', $row['titles']);
            $prices = explode(',', $row['prices']);
            $quantities = explode(',', $row['quantities']);
            $images = explode(',', $row['images']);
            
            for ($i = 0; $i < count($product_ids); $i++) {
                $order['products'][] = array(
                    'id' => $product_ids[$i],
                    'title' => $titles[$i],
                    'price' => $prices[$i],
                    'quantity' => $quantities[$i],
                    'image' => $images[$i]
                );
            }
            
            $orders[] = $order;
        }

        // Return the orders array as JSON response
        echo json_encode($orders);
    } else {
        // No orders found for the user
        echo json_encode(array('message' => 'No orders found for the user'));
    }
} else {
    // User ID not provided in the request
    echo json_encode(array('message' => 'User ID is required'));
}

// Close the database connection
$conn->close();
?>
