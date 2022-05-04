import { Context } from "koa";
import { bookValidation } from "../Validations/bookValidation";
import { createBook, deleteRespectiveBook, getRespectiveBooksByAuth, fetchBookById, handleBookQuery, updateRespectiveBook, fetchBooks, getRespectivePageBooks } from "../Services/bookService";

const deleteBook = (ctx: Context): void => {
    try {
        const { id } = ctx.params;
        const { userId } = ctx.state.userPayload;
        const data = deleteRespectiveBook(id, userId);
        ctx.status = 200; // success
        ctx.body = { data };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const getBooksByAuthId = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const books = getRespectiveBooksByAuth(userId);
        ctx.status = 200; // success;
        ctx.body = { data: books };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const getBookById = (ctx: Context): void => {
    try {
        const { id } = ctx.params;
        const bookInfo = fetchBookById(id);
        ctx.status = 200; // success
        ctx.body = { data: bookInfo };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const handleQuery = (ctx: Context): void => {
    try {
        const { query = '' } = ctx.request.query;
        const data = handleBookQuery(query);
        ctx.status = 200; // success
        ctx.body = { data };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const postBook = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const { body } = ctx.request;
        bookValidation(body, userId);
        const bookId = createBook(body, userId);
        ctx.status = 201; // new resource created
        ctx.body = { data: { bookId } };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

const showBooks = (ctx: Context): void => {
    try {
        const { limit = "10" } = ctx.request.query;
        const booksCt = Array.isArray(limit) ? parseInt(limit[0]) : parseInt(limit);
        const bookData = fetchBooks(booksCt);
        ctx.status = 200;
        ctx.body = { data: bookData };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const showPages = (ctx:Context): void => {
    try {
        const { page = "1", limit = "1" } = ctx.request.query;
        const pageNo = Array.isArray(page) ? parseInt(page[0]): parseInt(page);
        const delim = Array.isArray(limit) ? parseInt(limit[0]): parseInt(limit);
        const books = getRespectivePageBooks(pageNo,delim);
        ctx.status = 200;
        ctx.body = { data: books }
    } catch (error:any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const updateBook = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const { id } = ctx.params;
        const { body } = ctx.request;
        bookValidation(body, userId);
        updateRespectiveBook(body, id, userId);
        ctx.status = 201; // updated
        ctx.body = { data: { userId } };
    } catch (err: any) {
        ctx.status = err.errCode || 500;
        ctx.body = { error: err.message };
    }
}

export { getBookById, handleQuery, postBook, updateBook, deleteBook, getBooksByAuthId, showBooks, showPages };