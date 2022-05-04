import { types } from "@babel/core";
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

const getAllUsers = (bookData: IBook[], reviews: Record<string,IFetchReview[]>): string[] => {
    const bookUsers: string[] = getUniqueUsers(bookData);
    const reviewUser: string[] = [];
    const someKey:string = "Key";
    Object.values(reviews).forEach((review: IFetchReview[]) => {
        const users = getUniqueUsers(review);
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

const getBookReviews = async (Headers: {}, bookData: IBook[]): Promise<Record<string,IFetchReview[]>> => {
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

const mapDataIntoFeed = (books: IBook[], reviewData:Record<string,IFetchReview[]>, users: IUser[]): IFeed[] => {
    let feeds: IFeed[] = [];

    const userMap: Map<string, IUser> = new Map();
    users.forEach((user: IUser) => {
        user = { ...user, ...{ password: undefined } };
        userMap.set(user.id, user);
    });

    books.forEach((book: IBook) => {
        const userInfo: IUser = userMap.get(book.authId)!;
        const reviewsArr: IFetchReview[] = reviewData[book.id];
        const reviews: IReview[] = reviewsArr.map((review:IFetchReview) => {
            let modifiedReview:IReview = { ...review, reviewerInfo: userMap.get(review.authId)! };
            return modifiedReview;
        })
        feeds.push({ 
            userInfo, 
            bookInfo: book, 
            reviews
        });
    })
    return feeds;
}

export { getBooks, getUniqueUsers, getUserInfo, getBookReviews, getAllUsers, mapDataIntoFeed };