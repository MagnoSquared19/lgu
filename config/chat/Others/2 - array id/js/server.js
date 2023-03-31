





(function(e){	startChat();	})();
function startChat()
{	
	var wsUri = "ws://"+window.location.hostname+":10000"; 		// var wsUri = "ws://192.168.1.169:10000/Chat/server.php";
	websocket = new WebSocket(wsUri);

	websocket.onopen = function(ev){	$(".Conn_inf").css("color","black").text("Connected");	$(".Connecting_msg").remove();	if($(".welcome_msg").length<=0){ $(".msgArea").append('<p class="welcome_msg">Welcome!</p>'); } 	 }
	websocket.onmessage = function(ev) 
	{	alert(ev.data);
		var res		= JSON.parse(ev.data);		
		var res_type= res.type; 
		var data_	= res.data;	

		if(res_type=="chat")
		{
			var v = JSON.parse(data_);	
			//alert(v.event+" : "+"name:"+v.name+" - "+v.message);
			//alert(v.event);
			if(v.event=="usermsg")		
			{	
				if(v.name)
				{	
					$(".msgArea").append('<div class="chat-row"><b>'+v.name+'</b> : '+v.message+'</div>');	rmTyping();		
					var sent_aud=document.getElementById("msgSent_aud");  sent_aud.play();
				}		
			}	
			else if(v.event=="typing"){	if(v.name!=$(".Name_ipt").val()){$(".msgArea").append('<div class="msg-kup Typing_fr"><b>'+v.name+'</b> <img src="img/icons/typing-animation-3x.gif" /></div>'); isTyping();}	}
			
			$(".msgArea")[0].scrollTop = $(".msgArea")[0].scrollHeight;
		}		
	};	
	websocket.onerror	= function(ev){ $(".Conn_inf").css("color","red").text("Error in : "+ev.data);					}; 
	websocket.onclose 	= function(ev){ $(".Conn_inf").css("color","red").text("Connection Closed.");	startServer();	}; 	
}
function startServer()
{	
	$.ajax({url:"server.php",type:"post", data:{token:"27"},success:function(data){}}); 
	if($(".Connecting_msg").length<=0){	$(".msgArea").append('<p class="Connecting_msg connecting-msg">Connecting, please wait...</p>');	}
	setTimeout(function(e){	startChat(); },3000);
}

$(".Send_btn").click(function(e){	send_message(), $(".Msg_ipt").val(''), $("Msg_ipt").focus();		});	
$(".Msg_ipt" ).on("keyup",function(event){	if($(this).val().length > 0){imTyping();}	});
$(".Msg_ipt" ).on("keydown",function(event)	
{	
	if(event.which==13){send_message(), $(".Msg_ipt").val(''), $("Msg_ipt").focus();}
});


var imTyping_b=true; 
var typing_aud=document.getElementById("imTyping_aud");  
function isTyping(){	typing_aud.play();	setTimeout(function(e){	rmTyping();	},3000);		}
function imTyping()
{
	if(imTyping_b)
	{
		imTyping_b=false, send_message("typing");
		setTimeout(function(e){	imTyping_b=true;	},3000);
	}
}
function rmTyping(){	$(".Typing_fr").remove();	imTyping_b=true;	typing_aud.pause();		}
	
function send_message(f)
{
	if($(".Name_ipt").val()=="")	{	alert("Name is required."), $(".Name_ipt").focus();		}
	else if($(".Msg_ipt").val()==""){	alert("Message is required."), $(".Msg_ipt").focus();	}
	else
	{
		var tmpData = {event:((f)?f:"usermsg"),name:$(".Name_ipt").val(),message:$(".Msg_ipt").val()};
		var msg = 
		{
			ftr:"chat",
			data: JSON.stringify(tmpData),
			name: $(".Name_ipt").val(),
			color : ''
		};	
		try{ websocket.send(JSON.stringify(msg)); }
		catch(err){ alert(err); }			
	}
}














/*var Server = require('ws').Server;
var port = process.env.PORT || 10000;
var ws = new Server({port: port});

var sockets = [];
ws.on('connection', function(w){
  
  var id = w.upgradeReq.headers['sec-websocket-key'];
  console.log('New Connection id :: ', id);
  w.send(id);
  w.on('message', function(msg){
    var id = w.upgradeReq.headers['sec-websocket-key'];
    var message = JSON.parse(msg);
    
    sockets[message.to].send(message.message);

    console.log('Message on :: ', id);
    console.log('On message :: ', msg);
  });
  
  w.on('close', function() {
    var id = w.upgradeReq.headers['sec-websocket-key'];
    console.log('Closing :: ', id);
  });

  sockets[id] = w;
});*/