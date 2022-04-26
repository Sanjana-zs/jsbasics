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
    releaseDate: Date,
    authId: string
}

interface IReview {
    id: string,
    review: string,
    bookId: string,
    createdAt: Date
    reviewerInfo: IUser
}

interface IFetchReview {
    id: string,
    review: string,
    authId: string,
    bookId: string,
    createdAt: Date
}


export { IFeed, IBook, IReview, IUser, IFetchReview };