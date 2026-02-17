<?php

$host="localhost";
$username="lidorav_shainbar";
$password="gotSarV=mb8Wmc*o";
$db="lidorav_ECO_Life_Tips";

$conn = new mysqli($host, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully<br>";

$name = $_POST['name'];
$email = $_POST['email'];
$shower = $_POST['shower_time'];
$brush = $_POST['brush_teeth'];
$ac = $_POST['ac_temp'];
$laundry = $_POST['laundry'];
$light = $_POST['light'];
$transport = $_POST['transport'];
$recycle = $_POST['recycle'];
$score = $_POST['score'];


$sql = "INSERT INTO eco_results (name, email, shower_time, brush_teeth, ac_temp, laundry, light, transport, recycle, score)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssissssssi", $name, $email, $shower, $brush, $ac, $laundry, $light, $transport, $recycle, $score);
if ($stmt->execute() === FALSE) {
    echo "can't add new user. Error is: ". $stmt->error;
    exit();
}
echo "New user was added";

echo "Score received: $score<br>";

$stmt->close();
$conn->close();
?>