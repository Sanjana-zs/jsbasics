import Router from "koa-router";
import bodyParser from 'koa-bodyparser';
import { deleteReview, getBookReviews, postReview, updateReview } from "../Controllers/reviewController";
import { tokenHandler } from "../Middleware/token";

const reviewRouter = new Router();

reviewRouter.prefix('/review');

reviewRouter.get('/books/:bookId', tokenHandler, getBookReviews);

reviewRouter.post('/', bodyParser(), tokenHandler, postReview);

reviewRouter.put('/:id', bodyParser(), tokenHandler, updateReview);

reviewRouter.del('/:id', tokenHandler, deleteReview);

export default reviewRouter;