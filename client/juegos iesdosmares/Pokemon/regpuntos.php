<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>Puntuaciones</title>
		<script src="js/jquery-3.1.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/bootstrap.min.css">

		<link rel="stylesheet" type="text/css" href="css/estilo.css">
	</head>
	<body>
		<div class="text-center">
				<img src="images/logo.png" class="image_pie">	
		</div>
		<?php require('bdinfo.php') ?>
		<?php 
			$nombre=$_POST["nombre"];
			$puntos=$_POST["puntos"]; 
			$sql="INSERT INTO `puntuacionespokemon` (`id`, `nombre`, `puntos`) VALUES (NULL,'".$nombre."',".$puntos.");";
			$count = $dbh->exec($sql);
			if($count==1){
		?>
		<div class="container">
			<h2>Puntuaciones:</h2>
			<table class="table table-hover tabla">
				<tr><th>Nombre</th><th>Puntos</th></tr>
				<?php 
					$sql = "SELECT `nombre`,`puntos` FROM `puntuacionespokemon` ORDER BY `puntos` DESC;";

					foreach ($dbh->query($sql) as $row){
				?>
					<tr><td>
					<?php if($row['nombre']==$nombre){
						echo "<b><big>";
						}?>
					<?php echo $row['nombre'];?>
					<?php if($row['nombre']==$nombre){
						echo "</b></big>";
						}?>
					</td><td>	
					<?php if($row['nombre']==$nombre){
						echo "<b><big>";
						}?>
					<?php echo $row['puntos']?>
					<?php if($row['nombre']==$nombre){
						echo "</b></big>";
						}?>
				<?php
					}
				?>
			</table>
		</div>
		<?php 
		}else{ 
		?>
			<b>Error en la insercion con la BD</b>
		<?php 
			}
		?>
	</body>
</html>