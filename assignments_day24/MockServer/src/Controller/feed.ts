import { Context } from "koa";
import { IBook, IFeed, IFetchReview, IUser } from "../constants/interface";
import { getBooks, getAllUsers, getUserInfo, getBookReviews, mapDataIntoFeed } from "../Services/feed";

const showFeeds = async (ctx: Context) => {
    try {
        const bookLimit = process.env.LIMIT || 10;
        const { Header } = ctx.state;
        const bookData: IBook[] = await getBooks(Header, bookLimit.toString());
        const reviews: Record<string, IFetchReview[]> = await getBookReviews(Header, bookData);
        const userIds: string[] = getAllUsers(bookData, reviews);
        const userInfo: IUser[] = await getUserInfo(Header, userIds);
        const feeds: IFeed[] = mapDataIntoFeed(bookData, reviews, userInfo);
        ctx.status = 200;
        ctx.body = { data: feeds };
    } catch (error: any) {
        ctx.status = error.status || 500;
        ctx.body = { error: error.message };
    }
}

export { showFeeds };