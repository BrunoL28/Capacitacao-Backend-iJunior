class InvalidRouteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidRouteError'; 
    }
}

export default InvalidRouteError;