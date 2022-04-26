import { Context, Next } from "koa";
import jsonWebToken from 'jsonwebtoken';
import { AuthError } from "../Error/error";

const tokenHandler = (ctx: Context, next: Next): void => {
    try {
        const { authorization = '' } = ctx.header;
        const token = authorization?.split(' ')[1];
        const secret = process.env.SECRET_KEY || 'secret_key';
        jsonWebToken.verify(token, secret, (err: any, data: any) => {
            if (err) {
                throw new AuthError(err.message);
            } else {
                ctx.state.userPayload = data;
                next();
            }
        })
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

export { tokenHandler };