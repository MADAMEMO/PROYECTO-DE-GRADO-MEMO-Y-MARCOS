var app = angular.module('TaxisFast');

app.controller('taxisCtrl', function($scope, $http, $filter, ConexionServ){

ConexionServ.createTables();

$scope.ver = false;
$scope.ver2 = false;

	$scope.CREARTAXI = function(taxi_nuevo){
		console.log(taxi_nuevo);

		if (taxi_nuevo.modelos == undefined) {
			alert('Debe poner modelos');
			return;
		}

		if (taxi_nuevo.placas == undefined) {
			alert('Debe poner placas');
			return;
		}
		if (taxi_nuevo.taxista_id == undefined) {
			alert('Debe poner el taxista de ese carro');
			return;
		}
		if (taxi_nuevo.Soat == undefined) {
			alert('Debe poner Soat');
			return;
		}
		if (taxi_nuevo.Seguro == undefined) {
			alert('Debe poner Seguro');
			return;
		}
	

		consulta = 'INSERT INTO taxis (modelos, placas, taxista_id, Soat, Seguro) VALUES(?, ?, ?, ?, ?)'
		ConexionServ.query(consulta, [taxi_nuevo.modelos, taxi_nuevo.placas, taxi_nuevo.taxista_id, taxi_nuevo.Soat, taxi_nuevo.Seguro]).then(function(result){
			console.log('se cargo el taxi', result);
			$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);
		});
		$scope.taxi_nuevo = {}

		$scope.ver2 = false;
	}
  $scope.mostrartabla = function(taxi){
   
   if ($scope.ver2 == false) {
   	$scope.ver2 = true;
   } else{$scope.ver2 = false;}; 
 
  }

  $scope.traer_datos = function(){ 

	consulta = 'SELECT t.*, t.rowid, c.nombres, c.apellidos 	from taxis t INNER JOIN taxistas c ON t.taxista_id = c.rowid'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxis = result;
			console.log('se subio el taxi', result);

		}, function(tx){
			console.log('error', tx);

		});

	}

	$scope.traer_datos()

	consulta = 'SELECT *, rowid from taxistas'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxistas = result;
			console.log('se trajo el taxista', result);

		}, function(tx){
			console.log('error', tx);

		});

		$scope.eliminar = function(rowid){
		consulta = 'DELETE FROM taxis Where rowid=?'
		ConexionServ.query(consulta, [rowid]).then(function(result){
			console.log('se elimino el taxi', result);
			
			$scope.traer_datos()

		}, function(tx){
			console.log('error', tx);
		});
	}



	$scope.mostrareditar = function(){
		$scope.tablaeditar = true;

	}


 
  $scope.editar = function(taxi){
   
   	$scope.ver = true;
   $scope.taxi_Editar = taxi;
	
  }
    
  $scope.cancelar = function(){
	$scope.ver2 = false;
   	$scope.ver = false;
	
  }
    

	$scope.guardartaxi = function(taxi_Editar){

		
		consulta = 'UPDATE taxis SET modelos=?, placas=?, taxista_id=?, Soat=?, Seguro=? where rowid=? '
		ConexionServ.query(consulta, [taxi_Editar.modelos, taxi_Editar.placas, taxi_Editar.taxista_id, taxi_Editar.Soat, taxi_Editar.Seguro, taxi_Editar.rowid]).then(function(result){
			console.log('se cargo el taxi', result);

		}, function(tx){
			console.log('error', tx);
		});
			$scope.ver = false;
	}	

});