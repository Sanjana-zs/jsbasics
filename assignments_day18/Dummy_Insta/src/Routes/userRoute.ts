import Router from "koa-router";
import bodyParser from 'koa-bodyparser';
import { deleteUser, getUserById, handleQuery, postUser, update, loginUser, fetchUserInfo } from "../Controllers/userController";
import { tokenHandler } from "../Middleware/token";

const userRouter = new Router();

userRouter.prefix('/user');

// userRouter.get('/info/:id', tokenHandler, fetchUserInfo);

userRouter.get('/id', tokenHandler, getUserById);

userRouter.get('/', tokenHandler, handleQuery);

userRouter.post('/', bodyParser(), postUser);

userRouter.put('/', bodyParser(), tokenHandler, update);

userRouter.del('/', tokenHandler, deleteUser);

userRouter.post('/login', bodyParser(), loginUser);

export default userRouter;