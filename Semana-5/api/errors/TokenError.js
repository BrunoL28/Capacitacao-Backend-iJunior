class TokenError extends Error{
    constructor(message){
        super(message);
        this.name = 'TokenError';
    }
}

module.exports = TokenError;