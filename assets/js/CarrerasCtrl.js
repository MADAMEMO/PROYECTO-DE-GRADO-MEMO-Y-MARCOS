var app = angular.module('TaxisFast');

app.controller('CarrerasCtrl', function($scope, $http, $filter, ConexionServ){

	ConexionServ.createTables();


	$scope.carrera_nuevo = {
		zona: 'Z1'
	};
	

	$scope.ver = false;
	$scope.ver2 = true;
	$scope.vercarreras = false;

		consulta = 'SELECT *, rowid FROM taxistas';
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxistas = result;
		}, function(tx){
			console.log('error', tx);
		});


		consulta = 'SELECT *, rowid  FROM taxis';
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxis = result;
		}, function(tx){
			console.log('error', tx);
		});
		


	$scope.guardarc = function(carrera_nuevo){


		 
		fecha_inicio = '' + carrera_nuevo.fecha_ini.getFullYear() + '-' + (carrera_nuevo.fecha_ini.getMonth() + 1 )    + '-' + carrera_nuevo.fecha_ini.getDate();
		fecha_fin = '' + carrera_nuevo.fecha_fin.getFullYear() + '-' +  (  carrera_nuevo.fecha_ini.getMonth()  +1 ) + '-' + carrera_nuevo.fecha_ini.getDate();
	
		hora_inicio = '' + carrera_nuevo.hora_ini.getHours() + ':' +    carrera_nuevo.hora_ini.getMinutes();   //+ (carrera_nuevo.hora_ini.getHours() >= 12 ? "PM" : "AM");
		hora_final = '' + carrera_nuevo.hora_fin.getHours() + ':' +    carrera_nuevo.hora_fin.getMinutes();   //+ (carrera_nuevo.hora_fin.getHours() >= 12 ? "PM" : "AM");
	
		fechayhora_inicio 	= fecha_inicio  + ' ' + hora_inicio;
		fechayhora_fin 		= fecha_fin 	+ ' ' + hora_final;

		consulta = 'INSERT INTO carreras (taxi_id, taxista_id, zona, fecha_ini, lugar_inicio, lugar_fin, fecha_fin, estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'
		ConexionServ.query(consulta, [carrera_nuevo.taxi.rowid,  carrera_nuevo.taxista.rowid, carrera_nuevo.zona, fechayhora_inicio, carrera_nuevo.lugar_inicio, carrera_nuevo.lugar_fin, fechayhora_fin, carrera_nuevo.estado]).then(function(result){
			console.log('se guardo la carrera papi', result);
					console.log(carrera_nuevo.taxi);
			$scope.traer_datos()
		}, function(tx){
			console.log('error', tx);
		});
	}



  $scope.mostrartabla = function(carrera){

  }
/*
$scope.traer_datos = function(){
	consulta = 'SELECT taxi_id, taxista_id, fecha_ini, lugar_inicio, lugar_fin, fecha_fin, estado, rowid from carreras'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.carreras = result;
			console.log('se subio la carrera', result);

		}, function(tx){
			console.log('error', tx);

		});
}

*/

  $scope.traer_datos = function(){ 

	consulta = 'SELECT c.*, c.rowid, t.nombres, t.apellidos, tx.numero from carreras c ' + 
				'INNER JOIN taxistas t ON c.taxista_id = t.rowid ' + 
				'INNER JOIN taxis tx ON c.taxi_id = tx.rowid ' +
				'order by c.rowid desc';
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

	$scope.traer_datos()


	$scope.eliminar = function(rowid){
		consulta = 'DELETE FROM carreras Where rowid=?'
		ConexionServ.query(consulta, [rowid]).then(function(result){
			console.log('se elimino la carrera', result);
			
			$scope.traer_datos()


		}, function(tx){
				console.log('error', tx);
		});
	}



	$scope.mostrareditar = function(){
		$scope.tablaeditar = true;

	}


 
  $scope.editar = function(carrera){
   
   	$scope.ver = true;
   $scope.carrera_Editar = carrera;
	
  }
    
  $scope.cancelar = function(){
 $scope.ver2 = false;
   	$scope.ver = false;
	
  }
    

	$scope.guardarcarrera = function(carrera_Editar){
		
		consulta = 'UPDATE carreras SET  taxi_id=?, taxista_id=?, zona=?, fecha_ini=?, lugar_inicio=?, lugar_fin=?, fecha_fin=?, estado=? where rowid=? '
		ConexionServ.query(consulta, [carrera_Editar.taxi, carrera_Editar.taxista, carrera_Editar.zona, carrera_Editar.fecha_ini, carrera_Editar.lugar_inicio, carrera_Editar.lugar_fin, carrera_Editar.fecha_fin, carrera_Editar.estado, carrera_Editar.rowid]).then(function(result){
			console.log('se cargo la carrera', result);

$scope.traer_datos()
 $scope.ver = false;
		}, function(tx){
			console.log('error', tx);
		});
	}	


$scope.modificarcarrera =function(carrera){
	
	for (var i = 0; i < $scope.carreras.length; i++) {
		$scope.carreras[i].seleccionada = false;
	}

	carrera.seleccionada = true;
	$scope.carrera_estado = carrera;

}



	$scope.en_curso = function(carrera_estado){

		consulta = 'UPDATE carreras SET estado=? where rowid=? '
		ConexionServ.query(consulta, ['En curso', carrera_estado.rowid]).then(function(result){
			console.log('se cargo la carrera', result);

			carrera_estado.estado = 'En curso';

		}, function(tx){
			console.log('error', tx);
		});

	}

$scope.finalizada = function(carrera_estado){

consulta = 'UPDATE carreras SET estado=? where rowid=? '
		ConexionServ.query(consulta, ['Finalizada', carrera_estado.rowid]).then(function(result){
			console.log('se cargo la carrera', result);
							carrera_estado.estado = 'Finalizada';

		}, function(tx){
			console.log('error', tx);
		});

}

$scope.cancelada = function(carrera_estado){

consulta = 'UPDATE carreras SET estado=? where rowid=? '
		ConexionServ.query(consulta, ['Cancelada', carrera_estado.rowid]).then(function(result){
			console.log('se cargo la carrera', result);
					carrera_estado.estado = 'Cancelada';

		}, function(tx){
			console.log('error', tx);
		});

}


});