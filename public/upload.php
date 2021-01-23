<?php

  error_reporting( E_ALL );
  ini_set('display_errors', 1);

  header('Access-Control-Allow-Origin: *');
  header('Content-type: multipart/form-data;');

  $data = $_POST["image"];
  var_dump($data);
  // $data = str_replace(' ' , '+' , $data);
  // $data = preg_replace('#^data:image/\w+;base64,#i' , '' , $data);
  // $image = base64_decode($data);
?>