import { Context, Next } from "koa";
import { AxiosError } from "../Error/error";

const fetchToken = (ctx: Context, next: Next) => {
    try {
        const { authorization = '' } = ctx.headers;
        const token = authorization.split(' ')[1];
        if (!token) {
            throw new AxiosError("Unauthorized", 401);
        }
        ctx.state.Header = {
            Authorization: authorization
        }
        return new Promise((resolve, reject) => {
            next().then(resolve).catch(reject);
        });
    } catch (error: any) {
        ctx.status = error.status || 500;
        ctx.body = { error: error.message };
    }
}

export { fetchToken };