import { Context } from "koa";
import data from "../constants/data";
import { getAllBooks, pushBookToData } from "../Services/apiService";

const showBooks = async (ctx: Context) => {
    try {
        const { authorization = '' } = ctx.headers;
        const token = authorization.split(' ')[1];
        const bookData = await getAllBooks(token);
        await pushBookToData(token, bookData);
        ctx.status = 200;
        ctx.body = { data };
    } catch (error: any) {
        ctx.status = error.status || 500;
        ctx.body = { error: error.message };
    }
}

export { showBooks };