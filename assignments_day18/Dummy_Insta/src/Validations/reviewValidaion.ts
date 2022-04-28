import joi from 'joi';
import { bookData, userData } from '../Constants/data';
import { IBook, IReview, IUser } from '../Constants/interface';
import { AuthError, ForbiddenError, MandatoryError, NotFoundError } from '../Error/error';

const reviewValidation = (body: IReview, userId: string): void => {
    const joiReviewObject = joi.object({
        review: joi.string().min(8).max(50).required(),
        bookId: joi.string().required(),
    });
    const validReview = joiReviewObject.validate(body);
    if (validReview.error) {
        throw new MandatoryError(validReview.error.message);
    }

    const userIndex = userData.findIndex((e: IUser) => e.id === userId);
    if (userIndex === -1) {
        throw new AuthError("User doesn't exist");
    }

    const book: IBook | undefined = bookData.find((e: IBook) => e.id === body.bookId);
    if (!book) {
        throw new NotFoundError("Book doesn't exist");
    }

    if (book.authId === body.authId) {
        throw new ForbiddenError("Not Allowed");
    }
}

export { reviewValidation };