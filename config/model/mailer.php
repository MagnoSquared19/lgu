<?php

function send_mail($to_arg, $subject_arg, $body_arg)
{
	$headers[] = 'MIME-Version: 1.0';
	$headers[] = 'Content-type: text/html; charset=iso-8859-1';	
		
	$email = new email();
	return $email->mailer($to_arg, $subject_arg, $body_arg, $headers);
	//return $email->mailer($to_arg, $subject_arg, $template, "From: jericcelevante.se@gmail.com");
}	
	

	
	
?>