const appError = require('./appError');

class ErroDeParametro extends appError {
    constructor(message, paramName){
        super(message, 400, { paramName });
    }
}

module.exports = ErroDeParametro;