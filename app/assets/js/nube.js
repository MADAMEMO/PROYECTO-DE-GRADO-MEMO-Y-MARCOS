var app = angular.module('TaxisFast');

app.controller('nubeCtrl', function($scope, $http, $filter, ConexionServ, toastr, rutaServidor){


	$scope.mostrardatos = false;
	$scope.botonmostrar = true;
    $scope.boton_cerrar = false;
	$scope.mostradita = function(){

			$scope.mostrardatos = !$scope.mostrardatos;
			$scope.botonmostrar = !$scope.botonmostrar;
		$scope.boton_cerrar = !$scope.boton_cerrar;
	}


	$scope.descargar_datos = function (){
		$http.get(rutaServidor.ruta + 'taxis/all').then (function(result){
			taxis = result.data.taxis;
			taxistas = result.data.taxistas;
			usuarios = result.data.usuarios;
			carreras = result.data.carreras;

			for (var i = 0; i < taxis.length; i++) {
			 	taxis[i] 

			 
				consulta = 'INSERT INTO taxis ( id, rowid, numero, placa, taxista_id, propietario) VALUES( ?, ?, ?, ?, ?, ?)'
					ConexionServ.query(consulta, [taxis[i].id, taxis[i].id, taxis[i].numero, taxis[i].placa, taxis[i].taxista_id, taxis[i].propietario]).then(function(result){
						console.log('se cargo el taxi', result);
					
					}, function(tx){
						console.log('error', tx);
					});
			 } 
			 	for (var i = 0; i < taxistas.length; i++) {
			 	taxistas[i] 

			 
				consulta = 'INSERT INTO taxistas (id, rowid, nombres, apellidos, sexo, documento, celular, usuario, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
		ConexionServ.query(consulta, [taxistas[i].id, taxistas[i].id, taxistas[i].nombres, taxistas[i].apellidos, taxistas[i].sexo, taxistas[i].documento, taxistas[i].celular,taxistas[i].usuario, taxistas[i].password]).then(function(result){
			console.log('se cargo el taxista', result);
	
					}, function(tx){
						console.log('error', tx);
					});
			 } 
			
			 	for (var i = 0; i < carreras.length; i++) {
			 	carreras[i] 

			 
					consulta = 'INSERT INTO carreras (id, rowid, taxi_id, taxista_id, zona, fecha_ini, lugar_inicio, lugar_fin, fecha_fin, estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
		ConexionServ.query(consulta, [carreras[i].id, carreras[i].id, carreras[i].taxi_id, carreras[i].taxista_id, carreras[i].zona, carreras[i].fecha_ini, carreras[i].lugar_ini, carreras[i].lugar_fin, carreras[i].fecha_fin, carreras[i].estado]).then(function(result){
			console.log('se guardo la carrera papi', result);
					
		
				}, function(tx){
					console.log('error', tx);
				});
			 } 



		}), function(){
			console.log('error db')
		}

	}

	$scope.basededatos = function (){

		datos = {
			taxis: $scope.taxis,
			taxistas: $scope.taxistas,
			carreras: $scope.carreras,
			usuarios: $scope.usuarios
		}

		$http.put(rutaServidor.ruta + 'taxis/subir-datos', datos).then(function(result){
			console.log(result);


			consulta = 'DELETE FROM taxis Where id is null'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el taxi en la compu', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});
			consulta = 'DELETE FROM users Where id is null'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el usuario', result);
					$scope.traer_datos()
					toastr.success('Usuario Eliminado');
			}, function(tx){
				console.log('error', tx);
			});
				consulta = 'DELETE FROM taxistas Where id is null'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el taxista en la compu', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});

				consulta = 'DELETE FROM carreras Where id is null'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el carrera en la compu', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});

			consulta = 'UPDATE taxistas SET eliminado ="0", modificado="0"'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el taxistas en la nube', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});
			consulta = 'UPDATE taxis SET eliminado ="0", modificado="0"'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el SET en la nube', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});
			consulta = 'UPDATE carreras SET eliminado ="0", modificado="0"'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el carreras en la nube', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});
			consulta = 'UPDATE users SET eliminado ="0", modificado="0"'
			ConexionServ.query(consulta, []).then(function(result){
				console.log('se elimino el users en la nube', result);
					$scope.traer_datos()
			}, function(tx){
				console.log('error', tx);
			});

				$scope.traer_datos()
				$scope.traer_datos2()
				$scope.traer_datos3()
				$scope.traer_datos4()
				$scope.mostrardatos = false;

		}, function(error){
			console.log('error db', error)
		})
		
	}


	$scope.traer_datos = function(){
		consulta = 'SELECT *, rowid from users WHERE eliminado = "1" or modificado ="1" or id is null and id !=1'
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

	$scope.traer_datos2();

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
	$scope.traer_datos3();

	$scope.traer_datos4 = function(){ 

		consulta = 'SELECT t.*, t.rowid, c.nombres, c.apellidos 	from taxis t INNER JOIN taxistas c ON t.taxista_id = c.rowid where t.eliminado ="1" or t.modificado="1" or t.id is null'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.taxis = result;
			console.log('se subio el taxi', result);

		}, function(tx){
			console.log('error', tx);

		});

	}

	$scope.traer_datos4();

});