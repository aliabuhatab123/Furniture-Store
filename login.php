<?php 


// Settings for Cross-Origin Resource Sharing (CORS) policy.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "ecommerceproject");

// Connection with database
if ($conn->connect_error) {
    echo json_encode(array("status" => "error", "message" => $conn->connect_error));
    exit();
} 


$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

// Extracting Email and Password
$email = $dData["email"];
$pass = sha1($dData["password"]);
$response = array();

// Validating and Querying the Database
if($email != "" && $pass != "") {
    $sql = $conn->prepare("SELECT * FROM users WHERE userEmail = ? AND userPassword = ?");
    $sql->bind_param("ss", $email, $pass);
    $sql->execute();
    $result = $sql->get_result();

    // Processing the Query Result
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $response = array("status" => "success", "data" => $user);
    } else {
        $response = array("status" => "error", "message" => "Invalid email or password.");
    }
    $sql->close();
} else {
    $response = array("status" => "error", "message" => "Email and password are required.");
    echo $response['message'];
}

$conn->close();
echo json_encode($response);