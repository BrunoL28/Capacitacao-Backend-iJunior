import { compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { NotAuthorizedError } from '../../errors/NotAuthorizedError';
import { PermissionError } from '../../errors/PermissionError';
import { statusHTTP } from '../../utils/constants/statusHTTP';
import { getEnv } from '../../utils/functions/get-env';
import { Usuario } from '../domains/usuarios/models/Usuario';
import { PayloadParams } from '../domains/usuarios/types/PayloadParams';

function generateJWT(usuario: PayloadParams, response: Response) {
    const body = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
    };

    const token = sign( { usuario: body }, getEnv('SECRET_KEY'), { expiresIn: getEnv('JWT_EXPIRATION') } );

    const cookieOption = { httpOnly: true, secure: getEnv('NODE_ENV') !== 'development'};

    response.cookie('jwt', token, cookieOption);
}

function cookieExtractor(request: Request) {
    let token = null;

    if (request && request.cookies) {
        token = request.cookies['jwt'];
    }

    return token;
}

export function verifyJWT(request: Request, response: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(request);
        if (token) {
            const decoded = verify(token, getEnv('SECRET_KEY')) as JwtPayload;
            request.usuario = decoded.usuario;
        }
        if (!request.usuario) {
            throw new PermissionError('Você não está logado!');
        }
        next();
    } catch (error) {
        next(error);
    }
}

export async function loginMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const usuario = await Usuario.findOne({ where: { email: request.body.email }});
        if (!usuario) {
            throw new NotAuthorizedError('E-mail ou senha incorretos');
        } else {
            const check = await compare(request.body.senha, usuario.senha);
            if (!check) {
                throw new NotAuthorizedError('E-mail ou senha incorretos');
            }
        }
        generateJWT(usuario, response);
        response.status(statusHTTP.no_content).end();
    } catch (error) {
        next(error);
    }
}

export function notLoggedIn(request: Request, response: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(request);

        if (token) {
            const checked = verify(token, getEnv('SECRET_KEY'));
            if (checked) {
                throw new PermissionError('Você já está logado');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

export const checkRole = (cargos: string[]) => {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ! cargos.includes(request.usuario!.cargo) ? response.json('Você não possui permissão para realizar essa ação!') : next();
        } catch (error) {
            next(error);
        }
    };
};