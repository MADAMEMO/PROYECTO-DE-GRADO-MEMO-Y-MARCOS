var app = angular.module('TaxisFast');

app.controller('InformesCtrl', function($scope, $http, $filter, ConexionServ, AuthServ, $state){

ConexionServ.createTables();

  
$scope.ver = false;
  
$scope.ver2 = false;
 

$scope.ver3 = false;
 

$scope.ver4 = false;



 

	consulta = 'SELECT *, rowid from users'
	ConexionServ.query(consulta, []).then(function(result){
		$scope.usuarios = result;
	
		console.log('se trajeron los usuarios', result);

	}, function(tx){
		console.log('error', tx);
	})


	consulta = 'SELECT *, rowid from taxistas'
	ConexionServ.query(consulta, []).then(function(result){
		$scope.taxistas = result;
	
		console.log('se trajeron los taxistas', result);

	}, function(tx){
		console.log('error', tx);
	})


	consulta = 'SELECT *, rowid from taxis'
	ConexionServ.query(consulta, []).then(function(result){
		$scope.taxis = result;
	
		console.log('se trajeron los taxis', result);

	}, function(tx){
		console.log('error', tx);
	})


	consulta = 'SELECT *, rowid from carreras'
	ConexionServ.query(consulta, []).then(function(result){
		$scope.carreras = result;
	
		console.log('se trajeron los carreras', result);

	}, function(tx){
		console.log('error', tx);
	})


	$scope.mostrartabla = function(){
	$scope.ver = !$scope.ver;
	$scope.ver2 = false;
	$scope.ver4 = false;
	$scope.ver3 = false;

	}
		$scope.mostrartabla2 = function(){
	$scope.ver2= !$scope.ver2;
		$scope.ver = false;
	$scope.ver4 = false;
	$scope.ver3 = false;	

	}
		$scope.mostrartabla3 = function(){
	$scope.ver3= !$scope.ver3;
	$scope.ver2 = false;
	$scope.ver4 = false;
	$scope.ver = false;


	}
		$scope.mostrartabla4 = function(){
		$scope.ver4= !$scope.ver4;
	$scope.ver2 = false;
	$scope.ver = false;
	$scope.ver3 = false;
	}

 

	

});