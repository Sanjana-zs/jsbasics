import axios from "axios";
import { IFetchReview, IReview, IUser, IBook, IFeed } from "../constants/interface";
import { AxiosError } from "../Error/error";

const extractBookIds = (books: IBook[]): string[] => {
    const bookIds: string[] = books.map((book: IBook) => book.id);
    return bookIds;
}

const getAllUsers = (bookData: IBook[], reviews: Record<string, IFetchReview[]>): string[] => {
    const bookUsers: string[] = getUniqueUsers(bookData);
    const reviewUser: string[] = [];
    const someKey: string = "Key";
    Object.values(reviews).forEach((review: IFetchReview[]) => {
        const users = getUniqueUsers(review);
        reviewUser.concat(users);
    });
    const allUsers = bookUsers.concat(reviewUser);
    const uniqueUsers = new Set(allUsers);
    return Array.from(uniqueUsers);
}

const getBooks = async (headers: {}, limit: string): Promise<IBook[]> => {
    const result: Promise<IBook[]> = await axios.get(`http://localhost:3000/book/list?limit=${limit}`, {
        headers
    }).then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    })
    return result;
}

const getBookReviews = async (headers: {}, bookData: IBook[]): Promise<Record<string, IFetchReview[]>> => {
    const bookIds: string[] = extractBookIds(bookData);
    const result: Promise<Record<string, IFetchReview[]>> = await axios.post("http://localhost:3000/review/books/list", {
        id: bookIds,
        limit: 2
    }, {
        headers
    }).then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    })
    return result;
}

const getUniqueUsers = (data: IBook[] | IFetchReview[]): string[] => {
    const users: string[] = data.map(e => e.authId);
    const uniqueUsers: Set<string> = new Set(users);
    return Array.from(uniqueUsers);
}

const getUserInfo = async (headers: {}, userIds: string[]): Promise<IUser[]> => {
    const result: Promise<IUser[]> = await axios.post("http://localhost:3000/user/list", {
        id: userIds
    }, {
        headers
    }).then(response => response.data.data).catch(error => {
        const { status, statusText } = error.response;
        throw new AxiosError(statusText, status);
    })
    return result;
}

const mapDataIntoFeed = (books: IBook[], reviewData: Record<string, IFetchReview[]>, users: IUser[]): IFeed[] => {
    let feeds: IFeed[] = [];

    const userMap: Map<string, IUser> = new Map();
    users.forEach((user: IUser) => {
        user = { ...user, ...{ password: undefined } };
        userMap.set(user.id, user);
    });

    books.forEach((book: IBook) => {
        const userInfo: IUser = userMap.get(book.authId)!;
        const reviewsArr: IFetchReview[] = reviewData[book.id];
        const reviews: IReview[] = reviewsArr.map((review: IFetchReview) => {
            let obj = { ...review, ...{ authId: undefined } }
            let modifiedReview: IReview = { ...obj, reviewerInfo: userMap.get(review.authId)! };
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

export { extractBookIds, getAllUsers, getBooks, getBookReviews, getUserInfo, mapDataIntoFeed }