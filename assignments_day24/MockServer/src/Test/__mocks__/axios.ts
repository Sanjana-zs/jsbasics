import { books, reviews, users } from '../data';

export default {
    get: jest.fn().mockImplementation(() => Promise.resolve({ data: { data: books } })),
    post: jest.fn().mockImplementation((url) => {
        switch (url) {
            case "http://localhost:3000/user/list": {
                return Promise.resolve({ data: { data: users } });
            }
            case "http://localhost:3000/review/books/list": {
                return Promise.resolve({ data: { data: reviews } });
            }
        }
    })
}