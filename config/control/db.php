<?php
class db 
{
	private $_connection;
	private static $_instance; 
	private $_host = "localhost";
	private $_username = "root";
	private $_password = "sa";
	private $_database = "lgu_silang";
	
	public $db_Conn;
	public $errorVal;
	public $hasError;
	public $errorCode;
	public $errorList;
	
	public static function getInstance() 
	{
		if(!self::$_instance){ self::$_instance= new self(); }	// If no instance then make one
		return self::$_instance;
	}
	private function __construct() 
	{
		$this->_connection = new mysqli($this->_host, $this->_username, $this->_password, $this->_database);
		if ($this->_connection->connect_error) 
		{
		    die("Connection failed: " . mysqli_connect_error());		
		    //trigger_error("Failed to conencto to MySQL: " . mysqli_connect_error(), E_USER_ERROR);
		}
		$this->_connection -> set_charset("utf8");
	}
	private function __clone() { }
	public function getConnection(){ return $this->_connection; }	
	
	protected function db_Builder($query_arg)
	{
		$db= db::getInstance();		
		$this->db_Conn= $db->getConnection();		
		$queryResult= $this->db_Conn->query($query_arg);
		
		if(!$queryResult)
		{
			//$this->errorVal=  mysqli_error($this->db_Conn);
			$this->hasError = true;			
			$this->errorVal = $this->db_Conn->error;			
			$this->errorCode= $this->db_Conn->errno;
			$this->errorList= $this->db_Conn->error_list;

			return mysqli_error($this->db_Conn);
		}
		return $queryResult;	exit();
	}
	protected function db_Builder_Insert($query_arg)
	{
		$id= "0";		
		$db= db::getInstance();		
		$this->db_Conn= $db->getConnection();		
		$queryResult = $this->db_Conn->query($query_arg);
		$id = $this->db_Conn->insert_id;
		
		if(!$queryResult)
		{
			$this->hasError = true;			
			$this->errorVal = $this->db_Conn->error;			
			$this->errorCode= $this->db_Conn->errno;			
			$this->errorList= $this->db_Conn->error_list;			
		}
		$queryResult= json_encode(array('id'=>"{$id}",'error'=>$this->errorVal,'has_error'=>$this->hasError,'error_code'=>$this->errorCode));
		
		return $queryResult; 	 //mysqli_close($this->db_Conn);		
	}
	protected function db_multiple($query_arg)
	{
		$db = db::getInstance();		
		$this->db_Conn = $db->getConnection();		
		$q = $this->db_Conn->multi_query($query_arg);
		//while($this->db_Conn->next_result());
		
		if(!$q)
		{
			$this->hasError = true;
			$this->errorVal = $this->db_Conn->error;
			$this->errorCode= $this->db_Conn->errno;
			$this->errorList= $this->db_Conn->error_list;
		}
		
		return ($q=="1")?$q:$this->errorVal;	exit(); // mysqli_close($this->db_Conn);	
	}
	public function db_conn()
	{
		$db = db::getInstance();
		$this->db_Conn = $db->getConnection(); 		
			
		return $this->db_Conn;
	}
	public function jdie(){ $this->db_Conn->close(); die(); }


	//Unused - please validate
	/*
	public function db_setConn()
	{
		$db = db::getInstance();
		$this->db_Conn = $db->getConnection(); 		
			
		return $this->db_Conn;
	}	
	protected function db13conn19gateway_8627_132214()
	{
		return array('host'=>$this->_host, 'un'=>$this->_username, 'pw'=>$this->_password, 'db'=>$this->_database );
	}
	*/
}
?>