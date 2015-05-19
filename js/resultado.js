function Resultado(numeroGanador) {
	this.numeroGanador = numeroGanador;
}

/** Subclase de Ganador **/
Ganador.prototype = new Resultado();
Ganador.prototype.constructor = Ganador;
function Ganador(numeroGanador, montoAGanar) {
	Resultado.call(this, numeroGanador);
	this.montoAGanar = montoAGanar;
}
Ganador.prototype.valor = function(){ 
	return '¡¡ Ganaste $' + this.montoAGanar + " !!";
}

/** Subclase de Perdedor **/
Perdedor.prototype = new Resultado();
Perdedor.prototype.constructor = Perdedor;
function Perdedor(numeroGanador) {
	Resultado.call(this, numeroGanador);
}
Perdedor.prototype.valor = function(){ 
	return '¡¡Perdiste!! Salió el ' + this.numeroGanador;
}
