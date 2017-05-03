<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>Introduce la Puntuación</title>
		<script src="js/jquery-3.1.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="css/bootstrap.min.css">

		<link rel="stylesheet" type="text/css" href="css/estilo.css">
	</head>
	<body>
		<?php require('bdinfo.php') ?>
		<div class="container">
		<br>
			<div class="text-center">
				<img src="images/logo.png" class="image_pie">	
			</div>
			<h2>Registro Puntuación</h2>
			<form name="puntuacion" class="form-horizontal" method="post" action="regpuntos.php">
				<div class="form-group">
					<label class="control-label col-xs-2">Nombre: </label>
					<div class="col-xs-10">
						<input type="text" name="nombre" class="form-control" placeholder="Nombre del grupo" required maxlength="25" minlength="2">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-xs-2">Puntos: </label>
					<div class="col-xs-10">
						<input type="text" readonly class="form-control" name="puntos" id="puntos" value="<?php echo $_GET['puntos'] ?>">
					</div>
					<br><br><br>
				<div class="form-group"> 
					<div class="col-xs-offset-4 col-xs-8">
						<input type="submit" class="btn btn-default" name="enviar" value="Enviar">
					</div>
				</div>
			</form>			
		</div>

	</body>
</html>