angular.module('TaxisFast', [
	'ngSanitize', 
	'ngTouch',
	'ngAnimate',
	'ui.router', 
	'ui.bootstrap',
	'ui.select',
	'ui.grid',
	'ui.grid.edit',
	'ui.grid.resizeColumns',
	'ui.grid.exporter',
	'ui.grid.selection',
	'ui.grid.cellNav',
	'ui.grid.autoResize',
	'ui.grid.pinning',
	'ui.grid.expandable',
	'ui.grid.moveColumns',
	'toastr'
])


.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider ){


	$stateProvider
		.state('panel',{
			name: 'panel',
			url: '/panel',
			controller: 'PanelCtrl',
			templateUrl: 'templates/panel.html',
			resolve: {
				USER: ['AuthServ', '$state', function(AuthServ, $state){
					return AuthServ.verificar_user_logueado().then(function(u){
						return u;
					}, function(){
						$state.go('login');
					});
			}]
		}

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

		    .state('panel.informes',{
			name: 'informes',
			url: '/informes',
			controller: 'InformesCtrl',
			templateUrl: 'templates/informes.html'

			})
  
	     .state('panel.perfil',{
			name: 'perfil',
			url: '/perfil',
			controller: 'perfilCtrl',
			templateUrl: 'templates/perfil.html'

		})
			.state('login',{
					name: 'login',
					url: '/login',
					controller: 'LoginCtrl',
					templateUrl: 'templates/login.html'

				})

	   $urlRouterProvider.otherwise('/login');	

}])