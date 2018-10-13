var app = angular.module('TaxisFast');

app.controller('TaxistasCtrl', function($scope, $http, $filter, ConexionServ){

ConexionServ.createTables();

$scope.ver = false;
$scope.ver2 = false;

	$scope.CREARTAXISTA = function(taxista_nuevo){
		if (taxista_nuevo.nombres == undefined) {
			alert('Debe poner nombres');
			return;
		}

		if (taxista_nuevo.apellidos == undefined) {
			alert('Debe poner apellidos');
			return;
		}
		if (taxista_nuevo.sexo == undefined) {
			alert('Debe poner sexo');
			return;
		}
		if (taxista_nuevo.documento == undefined) {
			alert('Debe poner documento');
			return;
		}
		if (taxista_nuevo.usuario == undefined) {
			alert('Debe poner usuario');
			return;
		}
		if (taxista_nuevo.password == undefined) {
			alert('Debe poner password');
			return;
		}

		if (taxista_nuevo.password.length < 4) {
			alert('Contraseña con mayor caracteres');
			return;
		}

			if (taxista_nuevo.password == undefined) {
			alert('Debe poner contraseña');
			return;
		}

		console.log(taxista_nuevo);
		if (taxista_nuevo.password != taxista_nuevo.password2) {
			alert('iguaesl contraseña');
			return;
		}


		fecha_nac = '' + taxista_nuevo.fecha_nac.getFullYear() + '-' + (taxista_nuevo.fecha_nac.getMonth() + 1) + '-' + (taxista_nuevo.fecha_nac.getDate() + 1);	

		consulta = 'INSERT INTO taxistas (nombres, apellidos, sexo, documento, celular, fecha_nac, usuario, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'
		ConexionServ.query(consulta, [taxista_nuevo.nombres, taxista_nuevo.apellidos, taxista_nuevo.sexo, taxista_nuevo.documento, taxista_nuevo.celular, fecha_nac, taxista_nuevo.usuario, taxista_nuevo.password]).then(function(result){
			console.log('se cargo el taxista', result);
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
	consulta = 'SELECT nombres, apellidos, sexo, documento, celular, fecha_nac, usuario, password, rowid from taxistas where eliminado ="0"'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxistas = result;
			for (var i = 0; i < $scope.taxistas.length; i++) {
				$scope.taxistas[i].fecha_nac = new Date($scope.taxistas[i].fecha_nac);
				
			}
			console.log('se subio el taxista', result);

		}, function(tx){
			console.log('error', tx);
 
		});
	}
$scope.traer_datos()
	$scope.eliminar = function(rowid){
		consulta = 'UPDATE taxistas SET eliminado ="1"  Where rowid=?'
		ConexionServ.query(consulta, [rowid]).then(function(result){
			console.log('se elimino el taxista', result);
				$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);
		});
	}



	$scope.mostrareditar = function(){
		$scope.tablaeditar = true;

	}


 
  $scope.editar = function(taxista){
   
   	$scope.ver = true;
   taxista.fecha_nac = new Date(taxista.fecha_nac);
   $scope.taxista_Editar = taxista;
	
  }
    
  $scope.cancelar = function(){
   
	$scope.ver2 = false;
   	$scope.ver = false;
  }
    
	$scope.guardartaxista = function(taxista_Editar){

		
		fecha_nac = '' + taxista_Editar.fecha_nac.getFullYear() + '-' + (taxista_Editar.fecha_nac.getMonth() + 1) + '-' + taxista_Editar.fecha_nac.getDate() ;	


		consulta = 'UPDATE taxistas SET  nombres=?, apellidos=?, sexo=?, documento=?, celular=?, fecha_nac=?, usuario=?, password=? where rowid=? '
		ConexionServ.query(consulta, [taxista_Editar.nombres, taxista_Editar.apellidos, taxista_Editar.sexo, taxista_Editar.documento, taxista_Editar.celular, fecha_nac, taxista_Editar.usuario, taxista_Editar.password, taxista_Editar.rowid]).then(function(result){
			console.log('se cargo el taxista', result);
			$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);
		});
	
$scope.ver = false;


	}	


});