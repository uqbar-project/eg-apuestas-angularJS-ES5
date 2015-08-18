var apuestasApp = angular.module('apuestasApp', ['ui.bootstrap']);

apuestasApp.controller('ApuestasController', [function () {
  this.apuesta = apuesta();

  this.tiposApuesta = [new pleno(), new docena()];

  this.open = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.opened = true;
  };

  this.minDateFechaApuesta = new Date();

  this.apostar = function () {
    try {
      this.apuesta.apostar();
    } catch (exception) {
      console.log(exception);
      var form = this.apuestasForm;
      form.$invalid = true;
      form.tipoApuesta.$error.message = exception;
    }
  };

}]);

