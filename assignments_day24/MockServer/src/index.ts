import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import { showBooks } from './Controller/apiController';
dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3001;
router.prefix('/feeds');

router.get('/book', showBooks);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is runnig at port ${port}`);
})