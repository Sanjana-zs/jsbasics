import { bookData, userData } from "../Constants/data";
import { IBook, IUser } from "../Constants/interface";
import { AuthError, NotFoundError } from "../Error/error";
import { v4 as uuidv4 } from 'uuid';

const fetchBookById = (bookId: string): IBook | NotFoundError => {
    const bookInfo: IBook | undefined = bookData.find((e: IBook) => e.id === bookId);
    if (!bookInfo) {
        throw new NotFoundError("Book doesn't exist");
    }
    return bookInfo;
}

const getRespectiveBooksByAuth = (userId: string): IBook[] | AuthError => {
    const index = userData.findIndex((e: IUser) => e.id === userId);
    if (index === -1) {
        throw new AuthError("User doesn't exist");
    }
    const books: IBook[] = bookData.filter((e: IBook) => e.authId === userId);
    return books;
}

const handleBookQuery = (query: string | string[]): IBook[] => {
    const title = Array.isArray(query) ? query[0] : query;
    const filteredData: IBook[] = bookData.filter((e: IBook) => e.title.includes(title));
    return filteredData;
}

const createBook = (body: IBook, userId: string): string => {
    const { title, description } = body;
    const newBook: IBook = {
        id: uuidv4(),
        title,
        authId: userId,
        releaseDate: new Date(),
        description: description || ''
    }
    bookData.push(newBook);
    return newBook.id;
}

const updateRespectiveBook = (body: IBook, bookId: string, userId: string): void => {
    const { title, description } = body;
    const index = bookData.findIndex((e: IBook) => e.id === bookId);
    if (index === -1) {
        throw new NotFoundError("Book doesn't exist");
    }
    for (const book of bookData) {
        if (book.id === bookId) {
            book.title = title || book.title;
            book.description = description || book.description;
            break;
        }
    }
}

const deleteRespectiveBook = (bookId: string, userId: string): IBook[] => {
    const index = bookData.findIndex((e: IBook) => e.id === bookId && e.authId === userId);
    if (index === -1) {
        throw new NotFoundError("Book doesn't exist");
    }
    bookData.splice(index, 1);
    return bookData;
}

export { fetchBookById, deleteRespectiveBook, updateRespectiveBook, createBook, getRespectiveBooksByAuth, handleBookQuery };