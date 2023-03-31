<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="shortcut icon" type="image/x-icon" href="../img/icon.ico"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />
	<title>Chat System ver. 1.0</title>
	<link rel="stylesheet" type="text/css" href="style/structure.chat.1.0.css"/>	
	<script type="text/javascript" src="js/jquery.js" 	></script>	
	<script type="text/javascript" src="js/jquery.ui.js" ></script>	
		
</head>

<body>

<script type="text/javascript">
$(document).ready(function(e)
{
	$(".ChatForm").submit(function(e){	e.preventDefault();		})
});


</script>


<div class="chat-panel">
	<div class="chat-body">
		<audio id="imTyping_aud" loop >	<source type="audio/mpeg" src="audio/typing.mp3">	</audio>
		<audio id="msgSent_aud" >		<source type="audio/mpeg" src="audio/sent.mp3" >	</audio>
		<div class="chat-area"><div class="msgArea chat-area-in">
		</div></div>
		<div class="ChatForm chat-fter">
			<div class="nme-ipt"><input type="text" autocomplete="false" class="Name_ipt" id="name" placeholder="Your Name" maxlength="15" autofocus /></div>
			<div class="msg-ipt"><input type="text" autocomplete="false" class="Msg_ipt"  id="message" placeholder="Type your message here..." /></div>
			<span>
				<b class="Conn_inf">Connecting...</b>
				<button class="Send_btn">Send</button>
			</span>
		</div>
	</div>
</div>


<script type="text/javascript" src="js/ws.js" ></script> 


</body>
</html>
