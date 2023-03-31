<?php


class email
{
	public function __construct(){	 }				
	public function mailer($to, $subject, $body, $header)
	{
		require_once('mailer/PHPMailerAutoload.php');
		$mail = new PHPMailer;

		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'emailsystem.ino@gmail.com';
		$mail->Password = 'lgsszmvqgzjdosfx';
		//$mail->Password = 'zmdscflaehfiolog';
		$mail->SMTPSecure = 'tls';
		$mail->Port = 587;

		$mail->setFrom('jericcelevante.se@gmail.com', 'SILANG PROJECT');		//$mail->setFrom('QRT Legazpi');
		$mail->addAddress($to);
		$mail->isHTML(true);
		$mail->Subject	= $subject;
		$mail->Body		= $body;
		$mail->Header	= $header;

		$result = "1";
		if(!$mail->send()){		$result =  $mail->ErrorInfo;	} 
		
		return $result;				
	}
}

/*
//'patternsystem27@gmail.com'
//emailsystem.ino@gmail.com
$mail->Username = 'emailsystem.ino@gmail.com';
$mail->Password = '$jeric27#123';
*/

?>