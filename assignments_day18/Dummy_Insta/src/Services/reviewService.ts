import { bookData, reviewData, userData } from "../Constants/data";
import { IBook, IReview } from "../Constants/interface";
import { NotFoundError } from "../Error/error";
import { v4 as uuidv4 } from 'uuid';

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

const deleteRespectiveReview = (reviewId: string, userId: string): IReview[] => {
    const reviewIndex = reviewData.findIndex((e: IReview) => e.id === reviewId && e.authId === userId);
    if (reviewIndex === -1) {
        throw new NotFoundError("Review doesn't exist");
    }
    reviewData.splice(reviewIndex, 1);
    return reviewData;
}

const fetchBookReviews = (bookId: string): IReview[] | NotFoundError => {
    const bookIndex = bookData.findIndex((e: IBook) => e.id === bookId);
    if (bookIndex === -1) {
        throw new NotFoundError("Book doesn't exist");
    }
    let review: IReview[] = reviewData.filter((e: IReview) => e.bookId === bookId);
    return review;
}

const fetchAllReviews = (bookId: string[], limit: number): Record<string, IReview[]> => {
    const mappedReviews = new Map();
    bookId.forEach(element => mappedReviews.set(element, []));
    reviewData.forEach((e: IReview) => {
        if (mappedReviews.get(e.bookId) && mappedReviews.get(e.bookId).length < limit) {
            const review = mappedReviews.get(e.bookId);
            review.push(e);
            mappedReviews.set(e.bookId, review);
        }
    });
    const obj = Object.fromEntries(mappedReviews);;
    console.log(obj);
    return obj;
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

export { fetchBookReviews, createReview, updateRespectivereview, deleteRespectiveReview, fetchAllReviews };