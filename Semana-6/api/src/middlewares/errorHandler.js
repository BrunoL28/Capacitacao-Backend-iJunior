const statusHTTP = require('../../constants/statusHTTP');
const InvalidParamError = require('../../errors/InvalidParamError');
const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const PermissionError = require('../../errors/PermissionError');
const QueryError = require('../../errors/QueryError');
const TokenError = require('../../errors/TokenError');

function errorHandler(error, request, response, next) {
    let message = error.message;
    let status = statusHTTP.internal_server_error;

    if (Error instanceof InvalidParamError){
        status = statusHTTP.bad_request;
    }

    if (Error instanceof NotAuthorizedError){
        status = statusHTTP.forbidden;
    }

    if (Error instanceof PermissionError){
        status = statusHTTP.unauthorized;
    }

    if (Error instanceof QueryError) {
        status = statusHTTP.bad_request;
    }

    if (Error instanceof TokenError) {
        status = statusHTTP.not_found;
    }

    console.log(error);
    response.status(status).json(message);
}

module.exports = errorHandler;