<?php 


	
$id=0;
$clients[] = array('id'=>($id), 'src'=>"A #1");
$clients[] = array('id'=>($id+=1), 'src'=>"B #2"); 

$changed = $clients;	

global $clients;
for($i=0; $i<count($clients);$i++) 
{
	echo $clients[$i]['src'];
}

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

