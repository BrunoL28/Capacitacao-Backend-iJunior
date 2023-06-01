class NotAuthorizedError extends Error {
    constructor(message){
        super(message);
        this.name = 'NotAuthorizedError';
    }
}

module.exports = NotAuthorizedError;