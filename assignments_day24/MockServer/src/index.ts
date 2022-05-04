import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import { showFeeds } from './Controller/feed';
import { fetchToken } from './middleware/token';
dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3001;

router.prefix('/feeds');

router.get('/', fetchToken, showFeeds);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is runnig at port ${port}`);
})