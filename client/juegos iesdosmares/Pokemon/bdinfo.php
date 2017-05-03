		<?php
		/*** mysql hostname ***/
		$hostname = 'db679008980.db.1and1.com';
		/*** mysql username ***/
		$username = 'dbo679008980';
		/*** mysql password ***/
		$password = 'admin1234';
		/*** mysql password ***/
		$dbname = 'db679008980';

		try {
		    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
		    }
		catch(PDOException $e)
		    {
		    echo $e->getMessage();
		    }
		?>