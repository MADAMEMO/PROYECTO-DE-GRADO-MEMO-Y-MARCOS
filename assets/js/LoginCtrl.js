var app = angular.module('TaxisFast');

app.controller('LoginCtrl', function($scope, $http, $filter, ConexionServ, AuthServ, $state){

ConexionServ.createTables();

	$scope.usu = { username: '', password: '' }

  $scope.entrar = function(usu){
	
		AuthServ.loguear(usu).then(function(){
			$state.go('panel');
		}, function(err){
			alert('Datos inválidados');
		});
	}




    
	
    $scope.insertar_datos_iniciales = function() {
		
    	consulta = "SELECT * from users ";
   		ConexionServ.query(consulta, []).then(function(result) {
			if (result.length == 0) {
				
				consulta = "INSERT INTO users(nombres, apellidos, usuario, password, tipo, sexo) VALUES(?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['JORGE', 'CELEDON', 'jorge',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['JUAN CAMILO', 'MANRRIQUE', 'juan',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', 'daniel',  '123', 'Operador', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', 'edilson',  '123', 'Operador', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['FELIX', 'DÍAZ', 'felix',  '123', 'Operador', 'M']).then(function(result) {
		 		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				
				// Taxis
				
				consulta = "INSERT INTO taxis(modelo, placa, taxista_id) VALUES(?,?,?) ";
				ConexionServ.query(consulta, ['MAZDA 2016', 'YAU-322', 1]).then(function(result) {
				
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['Yamazuki', 'piolin', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				

				// Taxistas
				
				consulta = "INSERT INTO taxistas(nombres, apellidos, sexo, usuario) VALUES(?,?,?,?) ";
				ConexionServ.query(consulta, ['JUAN', 'VEGA', 'M', 'juan']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['ALFOUS', 'HUXLEY', 'M', 'alfous']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['CARLOS ANDRÉS', 'MORENO', 'M', 'carlos']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				
				
			}
			
        }, function(tx) {
          console.log("", tx);
		});
		
	};
	
	$scope.insertar_datos_iniciales();
	
	

});