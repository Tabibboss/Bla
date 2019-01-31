<?php


// var_dump($_SERVER);



// header('Access-Control-Allow-Origin: *'); 
// var_dump(file_get_contents("php://input"));
// exit;
//   $data = file_get_contents("php://input", false, stream_context_get_default(), 0, $_SERVER["CONTENT_LENGTH"]);
//   global $_POST_JSON;
//   $_POST_JSON = json_decode($_REQUEST["JSON_RAW"],true);

print_r($_POST);
  // exit;

// exit;
$postdata = json_decode(file_get_contents('php://input'), true);
var_dump($postdata);
// exit;



$request = json_decode(file_get_contents("php://input"), true);
print_r($request);
exit;

$user = $request['user'];
$passWord = $request['passWord'];



// print_r($postdata);
echo 'ok';



// var_dump(file_get_contents('php://input'));
$rawPostBody = file_get_contents('php://input');
$postData = json_decode($rawPostBody, true);//$postData is now an array

print_r($rawPostBody);
echo '1';

?>