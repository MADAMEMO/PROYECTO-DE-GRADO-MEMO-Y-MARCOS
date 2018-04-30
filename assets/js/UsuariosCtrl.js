var app = angular.module('TaxisFast');

app.controller('UsuariosCtrl', function($scope, $http, $filter, ConexionServ){

ConexionServ.createTables();

$scope.ver = false;
$scope.ver2 = false;

	$scope.CREARUSUARIO = function(usuario_nuevo){
			if (usuario_nuevo.nombres == undefined) {
			alert('Debe poner nombres');
			return;
		}

		if (usuario_nuevo.apellidos == undefined) {
			alert('Debe poner apellidos');
			return;
		}
		if (usuario_nuevo.sexo == undefined) {
			alert('Debe poner sexo');
			return;
		}
		if (usuario_nuevo.documento == undefined) {
			alert('Debe poner documento');
			return;
		}
		if (usuario_nuevo.usuario == undefined) {
			alert('Debe poner usuario');
			return;
		}
			if (usuario_nuevo.password == undefined) {
			alert('Debe poner password');
			return;
		}


		if (usuario_nuevo.password != usuario_nuevo.password2 && usuario_nuevo.password==undefined) {
			alert('Rectifique contraseña');
			return;
		}

		

		fecha_nac = '' + usuario_nuevo.fecha_nac.getFullYear() + '-' + usuario_nuevo.fecha_nac.getMonth() + '-' + usuario_nuevo.fecha_nac.getDate();

		consulta = 'INSERT INTO users (nombres, apellidos, sexo, documento, celular, fecha_nac, usuario, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'
		ConexionServ.query(consulta, [usuario_nuevo.nombres, usuario_nuevo.apellidos, usuario_nuevo.sexo, usuario_nuevo.documento, usuario_nuevo.celular, fecha_nac, usuario_nuevo.usuario, usuario_nuevo.password]).then(function(result){
			console.log('se cargo el usuario', result);
				$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);

		});
		$scope.ver2 = false;
	}
  $scope.mostrartabla = function(taxista){
   
   if ($scope.ver2 == false) {
   	$scope.ver2 = true;
   } else{$scope.ver2 = false;}; 
 
  }
  $scope.traer_datos = function(){
	consulta = 'SELECT nombres, apellidos, sexo, documento, celular, fecha_nac, usuario, password, rowid from users'
	ConexionServ.query(consulta, []).then(function(result){
		$scope.usuarios = result;
		for (var i = 0; i < $scope.usuarios.length; i++) {
				$scope.usuarios[i].fecha_nac = new Date($scope.usuarios[i].fecha_nac);
				
			}
		console.log('se subio el usuario', result);

	}, function(tx){
		console.log('error', tx);
	})
}
	$scope.traer_datos()

	$scope.eliminar = function(rowid){
		consulta = 'DELETE FROM users Where rowid=?'
		ConexionServ.query(consulta, [rowid]).then(function(result){
			console.log('se elimino el usuario', result);
				$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);
		});
	}



	$scope.mostrareditar = function(){
		$scope.tablaeditar = true;

	}


 
  $scope.editar = function(usuario){
   
   	$scope.ver = true;
   	usuario.fecha_nac = new Date(usuario.fecha_nac);
   	$scope.usuario_Editar = usuario;
	
  }
    
  $scope.cancelar = function(){

   	$scope.ver2 = false;
   	$scope.ver = false;
	
  }
    

	$scope.GUARDARUSUARIO = function(usuario_Editar){
				if (usuario_Editar.password != usuario_Editar.password2 && usuario_Editar.password==undefined) {
			alert('Rectifique contraseña');
			return;
		}


		consulta = 'UPDATE users SET  nombres=?, apellidos=?, sexo=?, documento=?, celular=?, fecha_nac=?, usuario=?, password=? where rowid=? '
		ConexionServ.query(consulta, [usuario_Editar.nombres, usuario_Editar.apellidos, usuario_Editar.sexo, usuario_Editar.documento, usuario_Editar.celular, usuario_Editar.fecha_nac, usuario_Editar.usuario, usuario_Editar.password, usuario_Editar.rowid]).then(function(result){
			console.log('se cargo el usuario', result);
				$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);
		});
		$scope.ver = false;
	}	




});