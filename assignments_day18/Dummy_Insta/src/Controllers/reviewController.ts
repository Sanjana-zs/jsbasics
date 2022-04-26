import { Context } from "koa";
import { reviewValidation } from "../Validations/reviewValidaion";
import { createReview, deleteRespectiveReview, fetchBookReviews, updateRespectivereview } from "../Services/reviewService";

const getBookReviews = (ctx: Context): void => {
    try {
        const { bookId } = ctx.params;
        const reviews = fetchBookReviews(bookId);
        ctx.status = 200; // success
        ctx.body = { data: reviews };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const postReview = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const { body } = ctx.request;
        reviewValidation(body, userId);
        const reviewId = createReview(body, userId);
        ctx.status = 201; // resource created
        ctx.body = { data: { reviewId } };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const updateReview = (ctx: Context): void => {
    try {
        const { userId } = ctx.state.userPayload;
        const { body } = ctx.request;
        const { id } = ctx.params;
        reviewValidation(body, userId);
        updateRespectivereview(id, body, userId);
        ctx.status = 201; // updated
        ctx.body = { data: { id } };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

const deleteReview = (ctx: Context): void => {
    try {
        const { id } = ctx.params;
        const { userId } = ctx.state.userPayload;
        const data = deleteRespectiveReview(id, userId);
        ctx.status = 200; // success
        ctx.body = { data };
    } catch (error: any) {
        ctx.status = error.errCode || 500;
        ctx.body = { error: error.message };
    }
}

export { postReview, deleteReview, updateReview, getBookReviews };