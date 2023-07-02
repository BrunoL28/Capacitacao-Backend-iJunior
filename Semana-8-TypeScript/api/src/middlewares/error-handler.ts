import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { PermissionError } from "../../errors/PermissionError";
import { QueryError } from "../../errors/QueryError";
import { TokenError } from "../../errors/TokenError";
import { statusHTTP } from "../../utils/constants/statusHTTP";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler (error: Error, _request: Request, response: Response, _next: NextFunction) {
    // eslint-disable-next-line prefer-const
    let message = error.message;
    let status = statusHTTP.internal_server_error;

    if (Error instanceof InvalidParamError) {
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