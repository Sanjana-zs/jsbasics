import { bookData, userData } from "../Constants/data";
import { AuthError, MandatoryError, NotFoundError } from "../Error/error";
import { IBook, IUser } from "../Constants/interface";
import joi from 'joi';
import { Context } from "koa";

// ----------------------JOI SCHEMA------------------------------------
const joiUserObject = joi.object({
    userName: joi.string().regex(/[A-Za-z0-9_-]+/).min(4).max(15).required(),
    fullName: joi.string().regex(/^[A-Za-z ]+$/).min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(16).required()
});

const joiBookObject = joi.object({
    title: joi.string().min(5).max(15).required(),
    description: joi.string().min(10).max(50).optional()
});

const joiReviewObject = joi.object({
    description: joi.string().min(8).max(50).required(),
    bookId: joi.string().required(),
});

const joiLoginObject = joi.object({
    email: joi.string().email().min(8).max(30).required(),
    password: joi.string().min(8).max(16).required()
})

// -----------------------VALIDATIONS----------------------
const userValidation = (ctx: Context) => {
    const { body } = ctx.request;
    const validUser = joiUserObject.validate(body);
    if (validUser.error) {
        throw new MandatoryError(validUser.error.message);
    }
}

const bookValidation = (body: any, userId: string) => {
    const validBook = joiBookObject.validate(body);
    if (validBook.error) {
        throw new MandatoryError(validBook.error.message);
    }
    // check user exists or not
    const index = userData.findIndex((e: IUser) => e.userId === userId);
    if (index === -1) {
        throw new AuthError("User doesn't exist");
    }
}

const reviewValidation = (body: any, userId: string) => {
    const validReview = joiReviewObject.validate(body);
    if (validReview.error) {
        throw new MandatoryError(validReview.error.message);
    }

    const userIndex = userData.findIndex((e: IUser) => e.userId === userId);
    if (userIndex === -1) {
        throw new AuthError("User doesn't exist");
    }

    const book: IBook | undefined = bookData.find((e: IBook) => e.bookId === body.bookId);
    if (!book) {
        throw new NotFoundError("Book doesn't exist");
    }
    if (book.postedBy === body.userId) {
        throw new AuthError("Unauthorized");
    }
}

const loginValidation = (body: { email:string, password: string }) => {
    const validUser = joiLoginObject.validate(body);
    if (validUser.error) {
        throw new MandatoryError(validUser.error.message);
    }
}

export { userValidation, bookValidation, reviewValidation, loginValidation };