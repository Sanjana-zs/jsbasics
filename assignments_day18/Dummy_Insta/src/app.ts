import Koa from 'koa';
import json from 'koa-json';
import userRouter from './Routes/userRoute';
import bookRouter from './Routes/bookRoute';
import reviewRouter from './Routes/reviewRoute';

const app = new Koa();
app.use(json());

app.context.logger = console.log; // adds logger function to context

// app.use(async (ctx, next) => {
//     const start = Date.now();
//     ctx.logger('received request for', ctx.method, ctx.url);
//     await next();
//     const ms = Date.now() - start;
//     ctx.logger('responded to request, Took', ms, 'ms', { url: ctx.url, params: ctx.params, body: ctx.request.body });
// });

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(bookRouter.routes()).use(bookRouter.allowedMethods());
app.use(reviewRouter.routes()).use(reviewRouter.allowedMethods());

export { app };