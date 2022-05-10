import Koa from 'koa';
import Router from 'koa-router';
import { showFeeds } from './Controller/feed';
import { fetchToken } from './middleware/token';

const app = new Koa();
const router = new Router();

router.prefix('/feeds');

router.get('/', fetchToken, showFeeds);

app.use(router.routes()).use(router.allowedMethods());

export default app;