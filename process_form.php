<?php

// Database connection configuration
$host = 'localhost'; 
$dbname = 'contact_form_db'; 
$username = 'root';
$password = ''; 

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Sanitize and validate form inputs
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $mobile = filter_input(INPUT_POST, 'mobile', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);

        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Invalid email format";
            exit;
        }

        // Prepare an SQL statement to insert form data
        $stmt = $pdo->prepare("INSERT INTO contact_form (name, mobile, email, service) VALUES (:name, :mobile, :email, :service)");

        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':mobile', $mobile);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':service', $service);

        // Execute the statement and check for success
        if ($stmt->execute()) {
            echo "Form submitted successfully!";
        } else {
            echo "Error submitting form.";
        }
    } else {
        echo "Invalid request method.";
    }
} catch (PDOException $e) {
    // Catch any PDO exceptions and display an error message
    echo "Database error: " . $e->getMessage();
}
?>
