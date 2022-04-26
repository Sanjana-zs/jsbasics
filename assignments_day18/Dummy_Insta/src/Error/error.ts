class AuthError extends Error {
    errCode: number;
    constructor(msg:string) {
        super(msg);
        this.errCode = 401;
        this.name = "AuthError";
    }
}

class NotFoundError extends Error {
    errCode: number;
    constructor(msg:string) {
        super(msg);
        this.errCode = 404;
        this.name = "NotFoundError";
    }
}

class MandatoryError extends Error {
    errCode: number;
    constructor(msg:string) {
        super(msg);
        this.errCode = 406;
        this.name = "MandatoryError";
    }
}

export { AuthError, NotFoundError, MandatoryError };