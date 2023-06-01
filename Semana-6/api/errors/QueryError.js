class QueryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryError';
    }
}

module.exports = QueryError;