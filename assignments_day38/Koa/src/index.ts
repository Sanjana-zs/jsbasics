import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import json from "koa-json";
import dotenv from 'dotenv';
import getTodoWithId from './utils/operations/getTodoWithId';
import deleteTodo from './utils/operations/deleteTodo';
import queryTodo from './utils/operations/queryTodo';
import addTodo from './utils/operations/addTodo';
import updateTodo from './utils/operations/updateTodo';
dotenv.config();

const port = process.env.PORT || 3000;
const app = new Koa();
app.use(json());
const todoRouter = new Router();

app.context.logger = console.log; // adds logger function to context

app.use(async (ctx, next) => {
    const start = Date.now();
    ctx.logger('received request for', ctx.method, ctx.url);
    await next();
    const ms = Date.now() - start;
    ctx.logger('responded to request, Took', ms, 'ms', { url: ctx.url, params: ctx.params, body: ctx.request.body });
});

todoRouter.prefix('/todo');

// get todo with id
todoRouter.get('/:id', getTodoWithId);

// query on todo
todoRouter.get('/', queryTodo);

// add todo
todoRouter.post('/', bodyParser(), addTodo);

// put request
todoRouter.put('/:id', bodyParser(), updateTodo);

// delete todo
todoRouter.del('/:id', deleteTodo);

app.on('error', err => {
    console.log('Server Error', err);
});

app
    .use(todoRouter.routes())
    .use(todoRouter.allowedMethods({
        notImplemented: () => "Route not found!", methodNotAllowed: () => "Method not found!"
    }))
    .listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });