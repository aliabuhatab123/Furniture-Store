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

// Query to fetch guest orders and their items
$sql = "
    SELECT 
        go.order_id,
        go.guest_id,
        go.first_name,
        go.last_name,
        go.street_address,
        go.city,
        go.phone_number,
        go.email_address,
        go.note,
        go.purchase_date,
        go.products
    FROM 
        guest_orders go
    ORDER BY 
        go.purchase_date DESC";

// Execute the query
$result = $conn->query($sql);

// Check if query execution was successful
if ($result === false) {
    // Handle query error
    echo json_encode(array('message' => 'Error executing the query: ' . $conn->error));
} else {
    // Check if there are any guest orders
    if ($result->num_rows > 0) {
        $guestOrders = array();

        // Loop through each guest order
        while($row = $result->fetch_assoc()) {
            // Decode JSON string into PHP array
            $products = json_decode($row['products'], true);

            $guestOrder = array(
                'order_id' => $row['order_id'],
                'guest_id' => $row['guest_id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'street_address' => $row['street_address'],
                'city' => $row['city'],
                'phone_number' => $row['phone_number'],
                'email_address' => $row['email_address'],
                'note' => $row['note'],
                'purchase_date' => $row['purchase_date'],
                'products' => $products
            );

            $guestOrders[] = $guestOrder;
        }

        // Return the guest orders array as JSON response
        echo json_encode($guestOrders);
    } else {
        // No guest orders found
        echo json_encode(array('message' => 'No guest orders found.'));
    }
}

// Close the database connection
$conn->close();
?>
