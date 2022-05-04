import { Context, Next } from "koa";

const fetchToken = (ctx:Context, next:Next) => {
    const { authorization = '' } = ctx.headers;
    ctx.state.Header = {
        authorization
    }
    return new Promise((resolve, reject) => {
        next().then(resolve).catch(reject);
    });
}

export { fetchToken };