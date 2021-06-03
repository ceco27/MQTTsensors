<?php
	require('phpMQTT.php');
	header('Access-Control-Allow-Origin: *');
	$server = 'ecoproj.predistic.com';
	$port = 1883;
	$username = '';
	$password = '';
	$client_id = uniqid();
	$mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);
	
	
	$name = (isset($_POST['Topic'])) ? $_POST['Topic'] : '*';
	if(!$mqtt->connect(true, NULL, $username, $password)) {
	exit(1);
	}
	
	$res = $mqtt->subscribeAndWaitForMessage($name, 0);
	echo $res;
	
	$mqtt->close();
?>
