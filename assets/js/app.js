angular.module('TaxisFast', ['ui.router'])


.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider ){


	$stateProvider
		.state('panel',{
			name: 'panel',
			url: '/panel',
			controller: 'PanelCtrl',
			templateUrl: 'templates/panel.html'

		})
		.state('panel.taxistas',{
			name: 'taxistas',
			url: '/taxistas',
			controller: 'TaxistasCtrl',
			templateUrl: 'templates/taxistas.html'

		})
	   
	   .state('panel.usuarios',{
			name: 'usuarios',
			url: '/usuarios',
			controller: 'UsuariosCtrl',
			templateUrl: 'templates/usuarios.html'

		})
	   .state('panel.taxis',{
			name: 'taxis',
			url: '/taxis',
			controller: 'taxisCtrl',
			templateUrl: 'templates/taxis.html'

		})

	      .state('panel.carreras',{
			name: 'carreras',
			url: '/carreras',
			controller: 'CarrerasCtrl',
			templateUrl: 'templates/carreras.html'

		})
			.state('login',{
					name: 'login',
					url: '/login',
					controller: 'LoginCtrl',
					templateUrl: 'templates/login.html'

				})

	   $urlRouterProvider.otherwise('/login');	

}])