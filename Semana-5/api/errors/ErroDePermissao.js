const appError = require('./appError');

class ErroDePermissao extends appError {
    constructor(message, cargo){
        super(message, { cargo });
    }
}

module.exports = ErroDePermissao;