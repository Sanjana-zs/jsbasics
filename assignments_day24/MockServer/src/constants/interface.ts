interface IFeed {
    userInfo: IUser,
    bookInfo: IBook,
    reviews: IReview[]
}

interface IUser {
    id: string,
    userName: string,
    fullName: string,
    email: string
}

interface IBook {
    id: string,
    title: string,
    description: string,
    releaseDate: string,
    authId: string
}

interface IReview {
    id: string,
    review: string,
    bookId: string,
    createdAt: string
    reviewerInfo: IUser
}

interface IFetchReview {
    id: string,
    review: string,
    authId: string,
    bookId: string,
    createdAt: string
}

export { IFeed, IBook, IReview, IUser, IFetchReview };