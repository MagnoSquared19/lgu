<?php

require_once('../model/global_var.php');


$host = getHostByName(php_uname('n'));	//getHostByName(getHostName());	//$host = '192.168.1.169';
$port = '10000';		
$null = NULL; 

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);		//Create TCP/IP stream socket
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);	//reuseable port
socket_bind($socket, 0, $port);								//bind socket to specified host
socket_listen($socket);										//listen to port/incomming connections

$clients = array($socket);									//create & add listning socket to the list

while(true) 	//start endless loop, so that our script doesn't stop
{	
	$changed = $clients;							//manage multiple connections	
	socket_select($changed, $null, $null, 0, 10);	//returns the socket resources in $changed array // waiting for socket to change status
	
	if(in_array($socket, $changed)) 				//check for new socket	
	{
		$socket_new = socket_accept($socket); 		//accpet new socket
		$clients[] = $socket_new; 					//add socket to client array
		
		$header = socket_read($socket_new, 1024); 	//read data sent by the socket
		perform_handshaking($header, $socket_new, $host, $port); //perform websocket handshake
		
		socket_getpeername($socket_new, $ip); 		//get ip address of connected socket
		//socket_getpeername($socket_new, $ip); 		//get ip address of connected socket
		$response = mask(json_encode(array('type'=>'system', 'data'=>$socket_new.' connected'))); //prepare json data
		send_message($response); 					//notify all users about new connection		
		
		$found_socket = array_search($socket, $changed);	//make room for new socket
		unset($changed[$found_socket]);
	}
	
	foreach($changed as $changed_socket) //loop through all connected sockets
	{			
		while(socket_recv($changed_socket, $buf, 10240, 0) >= 1)	//check for any incomming data. 1024 limit size of data
		{
			$received_text = unmask($buf);
			$j = json_decode($received_text, true); 
			$ftr_ = $j['ftr'];	
			$user_data = $j['data'];			
			//prepare data to be sent to client
			$response_text = mask(json_encode(array('type'=>$ftr_, 'data'=>$user_data)));
			send_message($response_text); 						//send data
			break 2; 											//exist this loop
		}
		
		$buf = @socket_read($changed_socket, 1024, PHP_NORMAL_READ);
		if ($buf === false) // check disconnected client
		{ 			
			$found_socket = array_search($changed_socket, $clients);	// remove client for $clients array
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);			
			
			$response = mask(json_encode(array('type'=>'system', 'data'=>$ip.' disconnected')));	//notify all users about disconnected connection
			send_message($response);

			/*
			$found_socket = array_search($changed_socket, $clients);	// remove client for $clients array
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);			
			
			$response = mask(json_encode(array('type'=>'system', 'data'=>$ip.' disconnected')));	//notify all users about disconnected connection
			send_message($response);*/
		}
	}
}

socket_close($socket);	// close the listening socket

function send_message($msg)
{
	global $clients;
	foreach($clients as $changed_socket){	@socket_write($changed_socket,$msg,strlen($msg));	}
	return true;
}

//Unmask incoming framed message
function unmask($text) 
{
	$length = ord($text[1]) & 127;
	if($length == 126)		{	$masks = substr($text, 4, 4); $data = substr($text, 8);	}
	elseif($length == 127)	{	$masks = substr($text, 10, 4); $data = substr($text, 14);	}
	else{$masks = substr($text, 2, 4); $data = substr($text, 6);	}
	
	$text = "";
	for($i = 0; $i < strlen($data); ++$i){	$text .= $data[$i] ^ $masks[$i%4];	}
	return $text;
}

//Encode message for transfer to client.
function mask($text)
{
	$b1 = 0x80 | (0x1 & 0x0f);
	$length = strlen($text);
	
	if($length <= 125)	{ $header = pack('CC', $b1, $length); }
	elseif($length > 125 && $length < 65536){	$header = pack('CCn', $b1, 126, $length);	}
	elseif($length >= 65536)	{	$header = pack('CCNN', $b1, 127, $length);	}
		
	return $header.$text;
}

//handshake new client.
function perform_handshaking($receved_header,$client_conn, $host, $port)
{
	$headers = array();
	$lines = preg_split("/\r\n/", $receved_header);
	foreach($lines as $line)
	{
		$line = chop($line);
		if(preg_match('/\A(\S+): (.*)\z/', $line, $matches)){	$headers[$matches[1]] = $matches[2];	}
	}

	$secKey = $headers['Sec-WebSocket-Key'];
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	//hand shaking header
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
	"Upgrade: websocket\r\n" .
	"Connection: Upgrade\r\n" .
	"WebSocket-Origin: $host\r\n" .
	"WebSocket-Location: ws://$host:$port/demo/shout.php\r\n".
	"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn,$upgrade,strlen($upgrade));
}









