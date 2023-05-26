const statusHTTP = require('../../constants/statusHTTP');
const ErroDeConsulta = require('../../errors/ErroDeConsulta');
const ErroDeParametro = require('../../errors/ErroDeParametro');
const ErroDePermissao = require('../../errors/ErroDePermissao');

function errorHandler(error, request, response, next) {
    let message = error.message;
    let status = statusHTTP.internal_server_error;

    if (Error instanceof ErroDeConsulta){
        status = statusHTTP.bad_request;
    }

    if (Error instanceof ErroDeParametro){
        status = statusHTTP.bad_request;
    }

    if (Error instanceof ErroDePermissao){
        status = statusHTTP.unauthorized;
    }

    console.log(error);
    response.status(status).json(message);
}

module.exports = errorHandler;