<?php 


$url = 'GET \/config\/chat\/server.php\/?type=a&level=b&smd=27&id=d HTTP\/1.1\r\nHost: localhost:10000\r\nConnection: Upgrade\r\nPragma: no-cache\r\nCache-Control: no-cache\r\nUpgrade: websocket\r\nOrigin: http:\/\/localhost\r\nSec-WebSocket-Version: 13\r\nUser-Agent: Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/74.0.3729.157 Safari\/537.36\r\nAccept-Encoding: gzip, deflate, br\r\nAccept-Language: en-US,en;q=0.9\r\nCookie: PHPSESSID=jiil11v9b1143afq7nog9k4t5v\r\nSec-WebSocket-Key: MXwXTes+BWMmmxKoG3slNQ==\r\nSec-WebSocket-Extensions: permessage-deflate; client_max_window_bits\r\n\r\n';

$tmpUrl = explode("id", $url);
$toUrl  = parse_url($tmpUrl[0]);
$decode = urldecode($toUrl["query"]);

$mParams = array();
$toArr  = explode('&',$decode);
foreach($toArr as $val)
{
	if($val!=null)
	{
		$tmp=explode('=',$val); 
		$mParams[$tmp[0]]=$tmp[1];
	}
}

echo $mParams['smd'];



/*
$asArr = explode( '|', $string );

foreach( $asArr as $val ){
  $tmp = explode( ',', $val );
  $finalArray[ $tmp[0] ] = $tmp[1];
}
*/
//$me = urldecode($me["query"]);
//$url = parse_url($me);
//print_r($me);


/*
$me = urldecode($me["query"]);

$url = parse_url($me);
parse_str($url['query'], $param);
*/

//print_r($param["id"]);

echo "<br/><br/>";

echo $abc ="/?goto=%2Fr%2Faccount%2Findex%2Ecfm%3Fsite_id%3D87211";
echo "<br/></br>";
$test = parse_url($abc);
$test = urldecode($test["query"]);
$url = parse_url($test); 
print_r($url);



   
parse_str($url['query'], $param);
//print_r($param["site_id"]);

/*parse_url($a);
echo $me['?id'];
*/

//echo $me;

/*
echo $abc ="/?goto=%2Fr%2Faccount%2Findex%2Ecfm%3Fsite_id%3D87211";
echo "<br/></br>";
$test = parse_url($abc);
$test = urldecode($test["query"]);

$url = parse_url($test);    
parse_str($url['query'], $param);
print_r($param["site_id"]);
*/


//print_r($test);


//print_r($param["id"]);



/*
$records = array(
    array('id' => 101, 'first_name' => 'Aries', 'last_name' => 'Jones', ),
    array('id' => 102, 'first_name' => 'Bryan', 'last_name' => 'Doe', ),
    array('id' => 103, 'first_name' => 'Carlo', 'last_name' => 'Smith', ),    
); 

echo $records[1]['id'];
*/

/*
$records = array(
    array('id' => 101, 'first_name' => 'Aries', 'last_name' => 'Jones', ),
    array('id' => 102, 'first_name' => 'Bryan', 'last_name' => 'Doe', ),
    array('id' => 103, 'first_name' => 'Carlo', 'last_name' => 'Smith', ),    
); 
$first_names = array_column($records, 'first_name');
var_dump($first_names);
echo "<br/>";
print_r($first_names);
*/




	
/*$id=0;
$clients[] = array('id'=>($id), 'src'=>"A #1");
$clients[] = array('id'=>($id+=1), 'src'=>"B #2"); 

$changed = $clients;	

global $clients;
for($i=0; $i<count($clients);$i++) 
{
	echo $clients[$i]['src'];
}*/

/*foreach($clients as $changed_socket)
{	
	echo $changed_socket['src'];
}*/
//$keys = array_keys($clients);



//echo $changed['src'];

//echo $socket."-".$changed['src'];

//echo in_array($socket, $changed);


//socket_select($changed, $null, $null, 0, 10);




//print_r($clients);



/*
$id=0;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
$clients = array($socket);

$socket_new = socket_accept($socket); 		//accept new socket
$clients[] = array('id'=>($id+=1), 'src'=>$socket_new); 


$socket_new = "a #1";

$socket_new = array('id'=>($id+=1),'rsc'=>"a #1"); 	//socket_accept($socket); 		//accept new socket
$clients[] = $socket_new; 

$socket_new = array('id'=>($id+=1),'rsc'=>"a #2");
$clients[] = $socket_new; 



//print_r($clients);
echo $clients[$id]['id'];

*/






?>

