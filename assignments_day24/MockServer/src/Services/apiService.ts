import axios from "axios";
import { IFetchReview, IReview, IUser, IBook, IFeed } from "../constants/interface";
import { AxiosError } from "../Error/error";

const getBooks = async (Headers: {}, limit: string): Promise<IBook[]> => {
    const promise = axios.get(`http://localhost:3000/book/list?limit=${limit}`, { headers: Headers });
    const result = promise.then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    });
    return result;
}

const getAllUsers = (bookData: IBook[], reviews: IFetchReview[][]): string[] => {
    const bookUsers: string[] = getUniqueUsers(bookData);
    const reviewUser: string[] = [];
    reviews.forEach((e: IFetchReview[]) => {
        const users = getUniqueUsers(e);
        reviewUser.concat(users);
    });
    const allUsers = bookUsers.concat(reviewUser);
    const uniqueUsers = new Set(allUsers);
    return Array.from(uniqueUsers);
}

const getUniqueUsers = (data: IBook[] | IFetchReview[]): string[] => {
    const users: string[] = data.map(e => e.authId);
    const uniqueUsers: Set<string> = new Set(users);
    return Array.from(uniqueUsers);
}

const getUserInfo = async (Headers: {}, users: string[]): Promise<IUser[]> => {
    return axios({
        method: "post",
        url: "http://localhost:3000/user/list",
        headers: Headers,
        data: {
            id: users
        }
    }).then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    });
}

const getBookReviews = async (Headers: {}, bookData: IBook[]): Promise<IFetchReview[][]> => {
    const bookIds: string[] = bookData.map((e: IBook) => e.id);
    return axios({
        method: "post",
        url: "http://localhost:3000/review/books/list",
        headers: Headers,
        data: {
            id: bookIds,
            limit: 2
        }
    }).then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    });;
}

const filterUser = (data: IUser[], userId: string): IUser => {
    const index = data.findIndex((e: IUser) => e.id === userId);
    if (index == -1) throw new AxiosError("User doesn't exist", 401);
    return data[index];
}

const filterBookReviews = (reviews: IFetchReview[][], bookId: string): IFetchReview[] => {
    let filteredReview: IFetchReview[] = [];
    for (const review of reviews) {
        if (review.length && review[0].bookId === bookId) {
            filteredReview = filteredReview.concat(review);
            break;
        }
    }
    return filteredReview;
}

const filterReviewerInfo = (review: IFetchReview[], userData: IUser[]): IReview[] => {
    const formattedReview: IReview[] = review.map((e: IFetchReview) => {
        const reviewerInfo: IUser = filterUser(userData, e.authId);
        let obj: IReview = {
            id: e.id,
            review: e.review,
            bookId: e.bookId,
            createdAt: e.createdAt,
            reviewerInfo
        }
        return obj;
    })
    return formattedReview;
}

const mapDataIntoFeed = (books: IBook[], reviewData: IFetchReview[][], users: IUser[]): IFeed[] => {
    let feeds: IFeed[] = [];
    books.forEach((e: IBook) => {
        let obj: IFeed;
        const userInfo: IUser = filterUser(users, e.authId);
        const review: IFetchReview[] = filterBookReviews(reviewData, e.id);
        const reviews: IReview[] = filterReviewerInfo(review, users);
        obj = {
            userInfo,
            bookInfo: e,
            reviews
        }
        feeds.push(obj);
    })
    return feeds;
}

export { getBooks, getUniqueUsers, getUserInfo, getBookReviews, getAllUsers, mapDataIntoFeed };