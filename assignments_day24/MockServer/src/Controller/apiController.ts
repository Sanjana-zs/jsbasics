import { Context } from "koa";
import { getBooks, getAllUsers, getUserInfo, getBookReviews, mapDataIntoFeed } from "../Services/apiService";

const showFeeds = async (ctx: Context) => {
    try {
        const bookLimit = process.env.LIMIT || 10;
        const { Header } = ctx.state;
        const bookData = await getBooks(Header, bookLimit.toString());
        const reviews = await getBookReviews(Header, bookData);
        const userIds = getAllUsers(bookData, reviews);
        const userInfo = await getUserInfo(Header, userIds);
        const feeds = mapDataIntoFeed(bookData, reviews, userInfo);
        ctx.status = 200;
        ctx.body = { data: feeds };
    } catch (error: any) {
        ctx.status = error.status || 500;
        ctx.body = { error: error.message };
    }
}

export { showFeeds };