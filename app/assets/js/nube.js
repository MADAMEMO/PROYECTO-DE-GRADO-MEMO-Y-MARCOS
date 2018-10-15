var app = angular.module('TaxisFast');

app.controller('nubeCtrl', function($scope, $http, $filter, ConexionServ){


	$scope.mostrardatos = false;
	$scope.botonmostrar = true;
    $scope.boton_cerrar = false;
	$scope.mostradita = function(){

			$scope.mostrardatos = !$scope.mostrardatos;
			$scope.botonmostrar = !$scope.botonmostrar;
		$scope.boton_cerrar = !$scope.boton_cerrar;
	}


  $scope.traer_datos = function(){
	consulta = 'SELECT *, rowid from users WHERE eliminado = "1" or modificado ="1" or id is null'
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


  $scope.traer_datos2 = function(){ 

	consulta = 'SELECT c.*, c.rowid, t.nombres, t.apellidos, tx.numero from carreras c ' + 
				'INNER JOIN taxistas t ON c.taxista_id = t.rowid ' + 
				'INNER JOIN taxis tx ON c.taxi_id = tx.rowid WHERE c.eliminado = "1" or c.modificado="1" or c.id is null ' +
				'order by c.rowid desc' ;
	ConexionServ.query(consulta, []).then(function(result){
		$scope.carreras = result;
			for (var i = 0; i < $scope.carreras.length; i++) {
				$scope.carreras[i].fecha_ini = new Date($scope.carreras[i].fecha_ini);
				$scope.carreras[i].fecha_fin = new Date($scope.carreras[i].fecha_fin);
			}

			console.log('se trajeron las carreras',result);

		}, function(tx){
			console.log('error', tx);

		});

	}

	$scope.traer_datos2()

 $scope.traer_datos3 = function(){
	consulta = 'SELECT *, rowid from taxistas where eliminado ="1" or modificado="1" or id is null '
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
$scope.traer_datos3()

$scope.traer_datos4 = function(){ 

	consulta = 'SELECT t.*, t.rowid, c.nombres, c.apellidos 	from taxis t INNER JOIN taxistas c ON t.taxista_id = c.rowid where t.eliminado ="1" or t.modificado="1" or t.id is null'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxis = result;
			console.log('se subio el taxi', result);

		}, function(tx){
			console.log('error', tx);

		});

	}

	$scope.traer_datos4()

});