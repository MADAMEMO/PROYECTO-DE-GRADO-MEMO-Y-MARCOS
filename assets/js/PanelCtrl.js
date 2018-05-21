var app = angular.module('TaxisFast');

app.controller('ApplicationCtrl', function($scope, AuthServ, $state){
	
	$scope.colapsado = 'false';
	
});
 
app.controller('PanelCtrl', function($scope, AuthServ, $state, USER, $firebaseArray){
 
	$scope.USER = USER;

	var url = 'https://taxy-100.firebaseio.com/taxistas';
	var fireRef = firebase.database().ref();
	
	var taxiNew = {
			nombres: 'JOSETH',
			apellidos: 'GUERRERO',
			documento: 123
		};
		
	var newPostKey = firebase.database().ref().child('taxistas').push().key;
	
	console.log(newPostKey);
	// Bind the todos to the firebase provider.
	//$scope.todos = $firebaseArray(fireRef);
	
	/*
	$scope.todos.$add({
		nombres: 'JOSETH',
		apellidos: 'GUERRERO',
		documento: 123
	});
	*/
	
	
	if (localStorage.calapsado) {
		$scope.$parent.colapsado = localStorage.colapsado;
	}


	$scope.cerrar_sesion = function(){
		AuthServ.cerrar_sesion();
	}

	$scope.calapsar_menu = function(){
		
		if ($scope.$parent.colapsado == 'false') {
			localStorage.colapsado 		= 'true';
			$scope.$parent.colapsado	= 'true';
		}else{
			localStorage.colapsado 		= 'false';
			$scope.$parent.colapsado	= 'false';
		}
	}

});