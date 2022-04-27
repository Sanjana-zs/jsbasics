import { Context } from "koa";
import { loginValidation, userValidation } from "../Validations/userValidation";
import { createUser, deleteRespectiveUser, getById, handleUserQuery, makeLogin, updateUser, getUserInfo } from "../Services/userService";
import { userData } from "../Constants/data";
import { IUser } from "../Constants/interface";

const deleteUser = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const data = deleteRespectiveUser(userId);
        ctx.status = 200;
        ctx.body = { data };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const fetchAllUsers = (ctx: Context): void => {
    try {
        const { query = [] } = ctx.request.query;
        const userInfo = getUserInfo(query);
        ctx.status = 200;
        ctx.body = { data: userInfo }
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const getUserById = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const userInfo = getById(userId);
        ctx.status = 200; // success
        ctx.body = { data: userInfo };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const handleQuery = (ctx: Context): void => {
    try {
        const { query = '' } = ctx.request.query;
        const data = handleUserQuery(query);
        ctx.status = 200; // success
        ctx.body = { data };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const loginUser = (ctx: Context): void => {
    try {
        const { body } = ctx.request;
        loginValidation(body);
        const token = makeLogin(body);
        ctx.status = 200;
        ctx.body = { data: { token } };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const postUser = (ctx: Context): void => {
    try {
        const { body } = ctx.request;
        userValidation(body);
        const id = createUser(body);
        ctx.status = 201; // new resource is created
        ctx.body = { data: { id } };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const update = (ctx: Context): void => {
    try {
        const { body } = ctx.request;
        const { userId } = ctx.state.userPayload;
        userValidation(body);
        updateUser(body, userId);
        ctx.status = 201; // updated
        ctx.body = { data: userId };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

export { getUserById, postUser, update, deleteUser, handleQuery, loginUser, fetchAllUsers };