interface IUser {
    id: string,
    userName: string,
    fullName: string,
    email: string,
    password: string
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
    authId: string,
    bookId: string,
    createdAt: Date
}

export { IUser, IBook, IReview };