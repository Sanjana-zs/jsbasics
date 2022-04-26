import { bookData, reviewData, userData } from "../Constants/data";
import { IBook, IReview } from "../Constants/interface";
import { NotFoundError } from "../Error/error";
import { v4 as uuidv4 } from 'uuid';

const fetchBookReviews = (bookId: string): IReview[] | NotFoundError => {
    const bookIndex = bookData.findIndex((e: IBook) => e.id === bookId);
    if (bookIndex === -1) {
        throw new NotFoundError("Book doesn't exist");
    }
    const review: IReview[] = reviewData.filter((e: IReview) => e.bookId === bookId);
    return review;
}

const createReview = (body: IReview, userId: string): string => {
    const { bookId, review } = body;
    const newReview: IReview = {
        id: uuidv4(),
        authId: userId,
        bookId, review,
        createdAt: new Date()
    }
    reviewData.push(newReview);
    return newReview.id;
}

const updateRespectivereview = (reviewId: string, body: IReview, userId: string): void => {
    const { review } = body;
    const index = reviewData.findIndex((e: IReview) => e.id === reviewId && e.authId === userId);
    if (index === -1) {
        throw new NotFoundError("Review doesn't exist");
    }
    for (const element of reviewData) {
        if (element.id === reviewId) {
            element.review = review || element.review;
            break;
        }
    }
}

const deleteRespectiveReview = (reviewId: string, userId: string): IReview[] => {
    const reviewIndex = reviewData.findIndex((e: IReview) => e.id === reviewId && e.authId === userId);
    if (reviewIndex === -1) {
        throw new NotFoundError("Review doesn't exist");
    }
    reviewData.splice(reviewIndex, 1);
    return reviewData;
}

export { fetchBookReviews, createReview, updateRespectivereview, deleteRespectiveReview };