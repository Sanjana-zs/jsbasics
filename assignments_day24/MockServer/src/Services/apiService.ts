import axios from "axios";
import data from "../constants/data";
import { IFetchReview, IReview, IUser, IBook, IFeed } from "../constants/interface";
import { AxiosError } from "../Error/error";

const getAllBooks = async (token: string): Promise<IBook[]> => {
    const Headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const promise = axios.get('http://localhost:3000/book', Headers);
    const result = promise.then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    });
    return result;
}

const pushBookToData = async (token: string, books: IBook[]) => {
    await Promise.all(books.map(async e => {
        let obj: IFeed;
        const userInfo: IUser = await getUserInfo(token, e.authId);
        const bookReviews: IFetchReview[] = await getAllBookReviews(token, e.id);
        const reviews: IReview[] = await mapReviewerInfo(token, bookReviews);
        obj = {
            userInfo,
            bookInfo: e,
            reviews: reviews
        }
        data.push(obj);
    }));
}

const getAllBookReviews = async (token: string, bookId: string): Promise<IFetchReview[]> => {
    const Headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.get(`http://localhost:3000/review/books/${bookId}`, Headers)
        .then(response => response.data.data).catch(error => {
            const { status, statusText } = error.response;
            throw new AxiosError(statusText, status);
        });
}

const mapReviewerInfo = async (token: string, reviews: IFetchReview[]): Promise<IReview[]> => {
    const mappedReviews: IReview[] = await Promise.all(reviews.map(async e => {
        let obj: IReview;
        const reviewerInfo: IUser = await getUserInfo(token, e.authId);
        obj = {
            id: e.id,
            review: e.review,
            bookId: e.bookId,
            createdAt: e.createdAt,
            reviewerInfo
        };
        return obj;
    }));
    return mappedReviews;
}

const getUserInfo = async (token: string, userId: string): Promise<IUser> => {
    const Headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.get(`http://localhost:3000/user/info/${userId}`, Headers)
        .then(response => response.data).catch(error => {
            const { status, statusText } = error.response;
            throw new AxiosError(statusText, status);
        });;
}

export { getAllBooks, pushBookToData };