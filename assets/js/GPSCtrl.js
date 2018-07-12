var app = angular.module('TaxisFast');

app.controller('GPSCtrl', function($scope, $http, $filter, ConexionServ, AuthServ, $state){

ConexionServ.createTables();


});