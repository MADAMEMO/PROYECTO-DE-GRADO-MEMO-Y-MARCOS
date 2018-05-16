var app = angular.module('TaxisFast');

app.controller('PanelCtrl', function($scope, AuthServ, $state, USER){
 
	$scope.USER = USER;

	console.log(USER)

	$scope.cerrar_sesion = function(){
		AuthServ.cerrar_sesion();
	}

});