import Router from "koa-router";
import bodyParser from 'koa-bodyparser';
import { getBookById, postBook, updateBook, handleQuery, deleteBook, getBooksByAuthId, showBooks } from "../Controllers/bookController";
import { tokenHandler } from "../Middleware/token";

const bookRouter = new Router();

bookRouter.prefix('/book');

bookRouter.get('/list', tokenHandler, showBooks);

bookRouter.get('/', tokenHandler, handleQuery);

bookRouter.get('/user', tokenHandler, getBooksByAuthId);

bookRouter.get('/:id', tokenHandler, getBookById);

bookRouter.post('/', bodyParser(), tokenHandler, postBook);

bookRouter.put('/:id', bodyParser(), tokenHandler, updateBook);

bookRouter.del('/:id', tokenHandler, deleteBook);

export default bookRouter;