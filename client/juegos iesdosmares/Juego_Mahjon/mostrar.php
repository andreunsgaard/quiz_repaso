<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="refresh" content="1">
		<title>Puntuaciones</title>
		<script src="js/jquery-3.1.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/bootstrap.min.css">

		<link rel="stylesheet" type="text/css" href="css/estilo.css">
	</head>
	<body>
		<div class="text-center">
				<img src="images/logo.png" class="image_muestra">	
		</div>
		<?php require('bdinfo.php') ?>
		<div class="container">
			<h2>Puntuaciones:</h2>
			<table class="table table-hover tabla">
				<tr><th>Nombre</th><th>Puntos</th></tr>
				<?php 
					$sql = "SELECT `nombre`,`puntos` FROM `puntuacionesmario` ORDER BY `puntos` DESC;";

					foreach ($dbh->query($sql) as $row){
				?>
					<tr><td>
						<?php echo $row['nombre'];?>
					</td><td>	
						<?php echo $row['puntos']?>
				<?php
					}
				?>
			</table>
		</div>
	</body>
</html>