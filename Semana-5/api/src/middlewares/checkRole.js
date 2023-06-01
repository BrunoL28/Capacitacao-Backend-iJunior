const PermissionError = require('../../errors/PermissionError');

const checkRole = (roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) {
            throw new PermissionError('Você não tem permissão para executar essa ação');
        } else {
            next();
        }
    };
};

module.exports = checkRole;