const appError = require('./appError');

class ErroDeConsulta extends appError{
    constructor(message, consulta){
        super(message, { consulta });
    }
}

module.exports = ErroDeConsulta;