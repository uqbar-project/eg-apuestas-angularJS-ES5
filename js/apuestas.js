/**
  * Agregamos funcion between para Numbers 
  */
Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
};

/**
  * Un constructor de lista copado
  */
function list(start, end) {
	anArray = [];
	for (var i = start; i <= end; i += 1) {
      anArray.push(i);
    }
    return anArray;
}

/** 
  * Objeto de dominio Apuesta
  */
function apuesta() {
	return { 
		fecha: new Date(),
		monto: 0,
		tipo: null,
		valorApostado: null,
		resultado: null,
		validarApuesta: function() {
			var now = new Date()
			now.setHours(0,0,0,0);
			if (now.getTime() > this.fecha.getTime()) {
				throw "Debe ingresar una fecha actual o posterior al día de hoy"	
			}
			if (this.monto < 0) {
				throw "El monto a apostar debe ser positivo"
			}
			if (this.tipo == null) {
				throw "Debe ingresar tipo de apuesta";
			}
			this.tipo.validar(this);
		},
		apostar: function() {
			this.validarApuesta();
			var numeroGanador = Math.floor( Math.random() * 37 );
			if (this.tipo.esGanador(numeroGanador, this.valorApostado)) {
				this.resultado = new Ganador(numeroGanador, this.monto * this.tipo.ganancia);
			} else {
				this.resultado = new Perdedor(numeroGanador);
			}
		} 
	}	
}

function pleno() {
	return {
		ganancia: 35,
		descripcion: 'Pleno',
		valoresAApostar: list(1, 36),
		validar: function(apuesta) {
			if (apuesta.monto < 10) {
				throw "Debe apostar más de 10 $";
			}
		},
		esGanador: function(numeroGanador, valorApostado) {
			return numeroGanador === valorApostado;
		}
	}
}

function docena() {
	return {
		ganancia: 11,
		descripcion: 'Docena',
		valoresAApostar: [ "Primera", "Segunda", "Tercera" ],
		validar: function(apuesta) {
			if (apuesta.monto < 50) {
				throw "Debe apostar más de 50 $";
			}
		},
		esGanador: function(numeroGanador, valorApostado) {
			var docena = this.valoresAApostar.indexOf(valorApostado);
			var min = docena * 12 + 1;
			var max = (docena + 1) * 12;
			return numeroGanador.between(min, max);
		}
	}
}