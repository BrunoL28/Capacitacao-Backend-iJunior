class appError extends Error {
    constructor(message, statusHTTP, additionalProperties = {}) {
        super(message);
        this.name = this.constructor.name;
        this.statusHTTP = statusHTTP || 500;
        Object.assign(this, additionalProperties);
    }
}

module.exports = appError;