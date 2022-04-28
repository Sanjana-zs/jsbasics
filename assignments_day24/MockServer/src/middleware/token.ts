import { Context, Next } from "koa";

const fetchToken = (ctx:Context, next:Next) => {
    const { authorization = '' } = ctx.headers;
    const token = authorization.split(' ')[1];
    ctx.state.Header = {
        Authorization: `Bearer ${token}`
    }
    return new Promise((resolve, reject) => {
        next().then(resolve).catch(reject);
    });
}

export { fetchToken };