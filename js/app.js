var apuestasApp = angular.module('apuestasApp', ['ui.bootstrap']);

apuestasApp.controller('apuestasCtrl', ['$scope', function($scope) {
	$scope.apuesta = apuesta();
	$scope.tiposApuesta = [ new pleno(), new docena() ];
	$scope.open = function($event) {
    	$event.preventDefault();
    	$event.stopPropagation();
	    $scope.opened = true;
  	};
  	$scope.minDateFechaApuesta = new Date();
	$scope.apostar = function() {
		try {
			$scope.apuesta.apostar();
		} catch (exception) {
			console.log(exception);
			var form = $scope.apuestasForm;
			form.$invalid = true;
			form.tipoApuesta.$error.message = exception;
		}
	};
}]);

