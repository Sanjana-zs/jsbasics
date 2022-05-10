import request from 'supertest';
import { app } from '../app';

// testing for books
describe("Test case for book api", (): void => {
    let JWT_TOKEN: string = '';
    let BOOK_ID: string = '';

    beforeAll(async (): Promise<void> => {
        JWT_TOKEN = await getToken();
    })

    describe("Test case for create book", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).post("/book").send({
                "title": "Book1",
                "description": "Let's hope for the best!!!"
            })
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).post(`/book/`).set('Authorization',`Bearer ${JWT_TOKEN}`).send({
                "title": "Book1",
                "description": "Let's hope for the best!!!"
            });
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })

        it("If token is not valid", async (): Promise<void> => {
            const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjcxMDEyMC05ZDllLTQyYTUtOThiZS1hZWMyYjQ1ZTM1MDEiLCJpYXQiOjE2NTE1NjM1ODB9.5Wh8QgJTq-A-XkYDIfGY4cAet9JQFLbuvSzldIK3Uak';
            const response = await request(app.callback()).post("/book").send({
                "title": "Book1",
                "description": "Let's hope for the best!!!"
            }).set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("User doesn't exist");
        })

        it("If the title is not present", async (): Promise<void> => {
            const response = await request(app.callback()).post("/book").
                set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(406);
            expect(JSON.parse(response.text).error).toStrictEqual(`\"title\" is required`);
        })

        it("Send response 201 if title is present", async (): Promise<void> => {
            const response = await request(app.callback()).post("/book").
                set('Authorization', `Bearer ${JWT_TOKEN}`)
                .send({
                    "title": "Book1",
                    "description": "Let's hope for the best!!!"
                });
            const { bookId } = JSON.parse(response.text).data;
            BOOK_ID = bookId;
            expect(response.statusCode).toBe(201);
            expect(response.type).toEqual('application/json');
        })

    })

    describe("Test case for read books", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).get(`/book`).set('Authorization',`Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })

        describe("Test case for user's books", (): void => {

            it("if user doesn't exist", async (): Promise<void> => {
                const JWT_TOKEN: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjcxMDEyMC05ZDllLTQyYTUtOThiZS1hZWMyYjQ1ZTM1MDEiLCJpYXQiOjE2NTE1NjM1ODB9.5Wh8QgJTq-A-XkYDIfGY4cAet9JQFLbuvSzldIK3Uak';
                const response = await request(app.callback()).get(`/book/user`).set('Authorization', `Bearer ${JWT_TOKEN}`);
                expect(response.statusCode).toBe(401);
                expect(JSON.parse(response.text).error).toStrictEqual("User doesn't exist");
            })

            it("show list of books w.r.t user", async (): Promise<void> => {
                const response = await request(app.callback()).get(`/book/user`).set('Authorization', `Bearer ${JWT_TOKEN}`)
                expect(response.statusCode).toBe(200);
                expect(response.type).toEqual('application/json');
            })

        })
    })

    describe("Test case for getting book w.r.t id", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book/${BOOK_ID}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).get(`/book/${BOOK_ID}`).set('Authorization',`Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })

        it("if book doesn't exist", async (): Promise<void> => {
            const BOOK_ID: string = '6a9c0c5e-1471-4697-b393-66da26fcc47b';
            const response = await request(app.callback()).get(`/book/${BOOK_ID}`).set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.text).error).toStrictEqual("Book doesn't exist");
        })

        it("if book exists", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book/${BOOK_ID}`).set('Authorization', `Bearer ${JWT_TOKEN}`)
            expect(response.statusCode).toBe(200);
            expect(response.type).toEqual('application/json');
        })

    })

    describe("Test case for handling book query", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).get(`/book`).set('Authorization',`Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })

        it("If there doesn't exist any query", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book?query=`).set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
        })

        it("If the query exists", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book?query=oo`).set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
        })

    })

    describe("Test case for list of books", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book/list`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).get(`/book/list`).set('Authorization',`Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })
        
        it("If limits of book is not passed", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book/list`).set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(200);
        })

        it("If limits of book is passed", async (): Promise<void> => {
            const response = await request(app.callback()).get(`/book/list?limit=12`).set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(200);
        })

    })

    describe("Test case for update book", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).put(`/book/${BOOK_ID}`).send({
                "title": "Book1",
                "description": "Let's hope for the best!!!"
            })
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).put(`/book/${BOOK_ID}`)
                             .set('Authorization',`Bearer ${JWT_TOKEN}`).send({
                                "title": "Book1",
                                "description": "Let's hope for the best!!!"
                            });
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })

        it("If book is not present", async (): Promise<void> => {
            const BOOK_ID: string = '6a9c0c5e-1471-4697-b393-66da26fcc47b';
            const response = await request(app.callback()).put(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`)
                .send({
                    title: "Change Book",
                    description: "Update Book"
                });
            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.text).error).toStrictEqual("Book doesn't exist");
        })

        it("If book is not authorized to user", async (): Promise<void> => {
            const JWT_TOKEN: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjcxMDEyMC05ZDllLTQyYTUtOThiZS1hZWMyYjQ1ZTM1MDEiLCJpYXQiOjE2NTE1NjM1ODB9.5Wh8QgJTq-A-XkYDIfGY4cAet9JQFLbuvSzldIK3Uak';
            const response = await request(app.callback()).put(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`).send({
                    title: "Change Book",
                    description: "Update Book"
                });
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("User doesn't exist");
        })

        it("If title is not present", async (): Promise<void> => {
            const response = await request(app.callback()).put(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(406);
            expect(JSON.parse(response.text).error).toStrictEqual(`\"title\" is required`);
        })

        it("If book is successfully updated", async (): Promise<void> => {
            const response = await request(app.callback()).put(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`)
                .send({
                    title: "Change Book",
                    description: "Update Book"
                });
            expect(response.statusCode).toBe(201);
            expect(response.type).toEqual('application/json');
        })

    })

    describe("Test case for delete book", (): void => {

        it("If user is not logged in", async (): Promise<void> => {
            const response = await request(app.callback()).delete(`/book/${BOOK_ID}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt must be provided");
        })

        it("If the passing token is invalid", async ():Promise<void> => {
            const JWT_TOKEN = "softy23-gdtrcj123ksmjd-1jhdfgerg33";
            const response = await request(app.callback()).delete(`/book/${BOOK_ID}`)
                             .set('Authorization',`Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("jwt malformed");
        })

        it("If book is not present", async (): Promise<void> => {
            const BOOK_ID: string = '6a9c0c5e-1471-4697-b393-66da26fcc47b';
            const response = await request(app.callback()).delete(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(404);
            expect(JSON.parse(response.text).error).toStrictEqual("Book doesn't exist");
        })

        it("If book is not authorized to user", async (): Promise<void> => {
            const JWT_TOKEN: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjcxMDEyMC05ZDllLTQyYTUtOThiZS1hZWMyYjQ1ZTM1MDEiLCJpYXQiOjE2NTE1NjM1ODB9.5Wh8QgJTq-A-XkYDIfGY4cAet9JQFLbuvSzldIK3Uak';
            const response = await request(app.callback()).delete(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.text).error).toStrictEqual("Unauthorized");
        })

        it("If book is successfully deleted", async (): Promise<void> => {
            const response = await request(app.callback()).delete(`/book/${BOOK_ID}`)
                .set('Authorization', `Bearer ${JWT_TOKEN}`);
            expect(response.statusCode).toBe(200);
            expect(response.type).toEqual('application/json');
        })

    })

})

const getToken = async (): Promise<string> => {
    const response = await request(app.callback()).post("/user").send({
        userName: "Sanjana001",
        fullName: "Sanjana Sharma",
        email: "sanjana@gmail.com",
        password: "12345678"
    });
    const login = await request(app.callback()).post("/user/login").send({
        email: "sanjana@gmail.com",
        password: "12345678"
    });
    const { token } = JSON.parse(login.text).data;
    return token;
}