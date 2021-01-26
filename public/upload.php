<?php

  error_reporting( E_ALL );
  ini_set('display_errors', 1);
  header('Access-Control-Allow-Origin: *');

  $image = $_POST['image'];
  $name = $_POST['name'];
  $image = str_replace(' ' , '+' , $image);
  $image = preg_replace('#^image:image/\w+;base64,#i' , '' , $image);
  $decoded_image = base64_decode($image);
  file_put_contents('./uploads/'.$name, $decoded_image);
?>