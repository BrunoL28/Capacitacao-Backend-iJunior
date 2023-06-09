import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import statusHTTP from '../../constants/statusHTTP';
import InvalidParameterError from '../../errors/InvalidParamError';
import NotAuthorizedError from '../../errors/NotAuthorizedError';
import PermissionError from '../../errors/PermissionError';
import QueryError from '../../errors/QueryError';
import TokenError from '../../errors/TokenError';

function errorHandler (error: Error, request: Request, response: Response, next: NextFunction) {
    // eslint-disable-next-line prefer-const
    let message = error.message;
    let status = statusHTTP.internal_server_error;

    if (Error instanceof InvalidParameterError) {
        status = statusHTTP.bad_request;
    }

    if (Error instanceof NotAuthorizedError) {
        status = statusHTTP.forbidden;
    }

    if (Error instanceof PermissionError) {
        status = statusHTTP.unauthorized;
    }

    if (Error instanceof QueryError) {
        status = statusHTTP.bad_request;
    }

    if (Error instanceof TokenError) {
        status = statusHTTP.not_found;
    }

    if (Error instanceof JsonWebTokenError) {
        status = statusHTTP.forbidden;
    }

    console.log(error);
    response.status(status).json(message);
}

export default errorHandler;
