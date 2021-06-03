<?php
	require('phpMQTT.php');
	header('Access-Control-Allow-Origin: *');
	$server = 'ecoproj.predistic.com';
	$port = 1883;
	$username = '';
	$password = '';
	$client_id = uniqid();
	$mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);
	
	$input = file_get_contents("php://input");
	
	$l = strlen($input);
	$pos = strpos($input, "#m=");
	$topic = substr($input, 2, $pos-2);
	$msg = substr($input, $pos+3, $l-$pos-3);
	/*echo $pos;
	echo $l;
	echo $topic;
	echo $msg;*/
	if ($mqtt->connect(true, NULL, $username, $password)) {
	$mqtt->publish($topic, $msg, 0, true);
	//echo json_encode("");
	$mqtt->close();
	} else {
    echo "Time out!\n";
	}
?>
