"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const InvalidParamError_1 = require("../../errors/InvalidParamError");
const NotAuthorizedError_1 = require("../../errors/NotAuthorizedError");
const PermissionError_1 = require("../../errors/PermissionError");
const QueryError_1 = require("../../errors/QueryError");
const TokenError_1 = require("../../errors/TokenError");
const statusHTTP_1 = require("../../utils/constants/statusHTTP");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error, _request, response, _next) {
    // eslint-disable-next-line prefer-const
    let message = error.message;
    let status = statusHTTP_1.statusHTTP.internal_server_error;
    if (Error instanceof InvalidParamError_1.InvalidParamError) {
        status = statusHTTP_1.statusHTTP.bad_request;
    }
    if (Error instanceof NotAuthorizedError_1.NotAuthorizedError) {
        status = statusHTTP_1.statusHTTP.forbidden;
    }
    if (Error instanceof PermissionError_1.PermissionError) {
        status = statusHTTP_1.statusHTTP.unauthorized;
    }
    if (Error instanceof QueryError_1.QueryError) {
        status = statusHTTP_1.statusHTTP.bad_request;
    }
    if (Error instanceof TokenError_1.TokenError) {
        status = statusHTTP_1.statusHTTP.not_found;
    }
    if (Error instanceof jsonwebtoken_1.JsonWebTokenError) {
        status = statusHTTP_1.statusHTTP.forbidden;
    }
    console.log(error);
    response.status(status).json(message);
}
exports.errorHandler = errorHandler;
