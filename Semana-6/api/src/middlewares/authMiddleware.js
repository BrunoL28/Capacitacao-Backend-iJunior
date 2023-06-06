require('dotenv').config();
const PermissionError = require('../../errors/PermissionError');
const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../domains/usuarios/models/Usuario');
const statusHTTP = require('../../constants/statusHTTP');

const generateJWT = (usuario, response) => {
    const body = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
    };

    const token = jwt.sign({ usuario: body }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION
    });

    const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV !== 'development', };

    response.cookie('jwt', token, cookieOptions);
};

const cookieExtractor = (request) => {
    let token = null;

    if (request && request.cookies) {
        token = request.cookies['jwt'];
    }

    return token;
};

const verifyJWT = (request, response, next) => {
    try {
        const { cookies } = response;
        const token = cookieExtractor({ cookies });

        if (token) {
            const { usuario: decodedUser } = jwt.verify(token, process.env.SECRET_KEY);
            request.usuario = decodedUser;
            request.token = token;
        }

        if (!request.usuario) {
            throw new NotAuthorizedError('Você não está logado');
        }

        next();
    } catch (error) {
        next(error);
    }
};  

const loginMiddleware = async(request, response, next) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: request.body.email }});
        if (!usuario) {
            throw new NotAuthorizedError('E-mail ou senha incorretos');
        } else {
            const check = await bcrypt.compare(request.body.senha, usuario.senha);
            if (!check) {
                throw new NotAuthorizedError('E-mail ou senha incorretos');
            }
        }
        generateJWT(usuario, response);
        response.status(statusHTTP.success).send('Login realizado com sucesso');
    } catch (error) {
        next(error);
    }
};

const checkRole = (roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) {
            throw new PermissionError('Você não tem permissão para executar essa ação');
        } else {
            next();
        }
    };
};

const notLoggedIn = async(request, response, next) => {
    try {
        const token = cookieExtractor(request);

        if (token) {
            const checked = await jwt.verify(token, process.env.SECRET_KEY);
            if (checked) {
                throw new PermissionError('Você já está logado');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { loginMiddleware, notLoggedIn, verifyJWT, checkRole };