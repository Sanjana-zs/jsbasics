class AuthError extends Error {
    errCode: number;
    constructor(msg: string) {
        super(msg);
        this.errCode = 401;
        this.name = "AuthError";
    }
}

class ForbiddenError extends Error {
    errCode: number;
    constructor(msg: string) {
        super(msg);
        this.errCode = 403;
        this.name = "ForbiddenError";
    }
}

class MandatoryError extends Error {
    errCode: number;
    constructor(msg: string) {
        super(msg);
        this.errCode = 406;
        this.name = "MandatoryError";
    }
}

class NotFoundError extends Error {
    errCode: number;
    constructor(msg: string) {
        super(msg);
        this.errCode = 404;
        this.name = "NotFoundError";
    }
}

export { AuthError, NotFoundError, MandatoryError, ForbiddenError };