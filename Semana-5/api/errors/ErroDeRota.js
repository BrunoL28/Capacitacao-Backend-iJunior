const appError = require('./appError');

class ErroDeRota extends appError {
    constructor(message, route){
        super(message, 404, { route });
    }
}

module.exports = ErroDeRota;