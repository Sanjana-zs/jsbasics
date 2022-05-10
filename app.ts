import axios, { Axios } from 'axios';
import request from 'supertest';
import app from './assignments_day24/MockServer/src/app';
import { url } from 'koa-router';
import { IBook, IFeed, IFetchReview, IUser } from './assignments_day24/MockServer/src/constants/interface';
import { AxiosError } from './assignments_day24/MockServer/src/Error/error';
import { getBooks, getBookReviews, extractBookIds, getAllUsers, getUserInfo } from './assignments_day24/MockServer/src/Services/feed';
jest.mock("axios");

describe("Test case for feeds", ():void => {
    const token = process.env.TOKEN;

    describe("When api call is successfull", ():void => {
        
        it("throws error if not successfully executed", async ():Promise<void> => {
            const error = {
                response: {
                    status: 500,
                    statusText: "Network Error"
                }
            }
            axios.get = jest.fn().mockImplementation(() => Promise.reject(error));
            axios.post = jest.fn().mockImplementation(() => Promise.reject(error))
            const result = await request(app.callback()).get('/feeds').set('Authorization',`Bearer ${token}`);
            console.log(result);
        })

    })

})

// describe("Test case for feeds", (): void => {
//     const BASE_URL = 'http://localhost:3000';
//     const headers = {
//         authorization: `Bearer ${process.env.TOKEN}`
//     }
//     const books: IBook[] = [
//         {
//             "id": "5bb0f22a-d64b-41be-8436-18f82e859bb4",
//             "title": "Javascript",
//             "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
//             "releaseDate": new Date("2022-05-06T09:48:15.414Z"),
//             "description": "A true story"
//         },
//         {
//             "id": "435be8e7-a204-40c3-b860-b31a7baec8ef",
//             "title": "Python",
//             "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
//             "releaseDate": new Date("2022-05-06T09:48:15.957Z"),
//             "description": "A true story"
//         }
//     ];
//     const reviews: Record<string, IFetchReview[]> = {
//         "5bb0f22a-d64b-41be-8436-18f82e859bb4": [
//             {
//                 "id": "7ce9eb0d-8f08-4250-9cb0-6c9610f03b8f",
//                 "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                 "bookId": "b3501984-f08b-43db-a98d-6690231c03cf",
//                 "review": "Great Job",
//                 "createdAt": new Date("2022-05-06T10:45:06.168Z")
//             },
//             {
//                 "id": "7e897b79-ca36-4263-be58-9fc4db4c433d",
//                 "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                 "bookId": "b3501984-f08b-43db-a98d-6690231c03cf",
//                 "review": "Great Job",
//                 "createdAt": new Date("2022-05-06T10:45:11.894Z")
//             }
//         ],
//         "435be8e7-a204-40c3-b860-b31a7baec8ef": []
//     }
//     const users:IUser[] = [
//         {
//             "id": "1d758928-b5fe-49bd-b34d-6433d751520d",
//             "userName": "sanju",
//             "fullName": "Sanjana Sharma",
//             "email": "sonu@gmail.com"
//         }
//     ]

//     describe("Test case for getting books", (): void => {
//         const bookLimit: string = process.env.LIMIT || "10";

//         describe("When api call is successfull", (): void => {

//             it("should return list of books", async (): Promise<void> => {
//                 axios.get = jest.fn().mockImplementation(() => {
//                     const response = {
//                         data: {
//                             data: books
//                         },
//                         status: 200
//                     }
//                     return Promise.resolve(response);
//                 })
//                 const result = await getBooks(headers, bookLimit);
//                 expect(axios.get).toHaveBeenCalledTimes(1);
//                 expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/book/list?limit=${bookLimit}`, { headers });
//                 expect(result).toEqual(books);
//             });

//         })

//         describe("When api call is not successfull", (): void => {

//             it("should return empty users list", async (): Promise<void> => {
//                 const axiosError: AxiosError = new AxiosError("Network Error", 500);
//                 axios.get = jest.fn().mockRejectedValueOnce({ response: { status: 500, statusText: "Network Error"}});
//                 try {
//                     await getBooks(headers, bookLimit);
//                 } catch (error) {
//                     expect(error).toEqual(axiosError);
//                     expect(axios.get).toHaveBeenCalledTimes(1);
//                     expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/book/list?limit=${bookLimit}`, { headers })
//                 }
//             })

//         })

//     })

//     describe("Test case for getting reviews", (): void => {

//         describe("When api call is successfull", (): void => {

//             it("should return the array", async (): Promise<void> => {
//                 axios.post = jest.fn().mockResolvedValueOnce({ data: { data: reviews } });
//                 const bookIds = extractBookIds(books);
//                 const result = await getBookReviews(headers, books);
//                 expect(result).toEqual(reviews);
//                 expect(axios.post).toHaveBeenCalledTimes(1);
//                 expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/review/books/list`, {
//                     id: bookIds,
//                     limit: 2
//                 }, {
//                     headers
//                 });
//             })

//         })

//         describe("When api call is not successfull", (): void => {

//             it("should return empty array", async (): Promise<void> => {
//                 const axiosError: AxiosError = new AxiosError("Network Error", 500);
//                 axios.post = jest.fn().mockRejectedValueOnce({ response: { status: 500, statusText: "Network Error"}});
//                 const bookIds = extractBookIds(books);
//                 try {
//                     await getBookReviews(headers, books);
//                 } catch (error) {
//                     expect(error).toEqual(axiosError);
//                     expect(axios.post).toHaveBeenCalledTimes(1);
//                     expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/review/books/list`, {
//                         id: bookIds,
//                         limit: 2
//                     }, {
//                         headers
//                     });
//                 }
//             })

//         })

//     })


//     describe("Test case for getting user info", (): void => {

//         describe("When api call is successfull", (): void => {

//             it("should return list of users", async (): Promise<void> => {
//                 axios.post = jest.fn().mockResolvedValueOnce({ data: { data: users } });
//                 const allUsers = getAllUsers(books, reviews);
//                 const result = await getUserInfo(headers, allUsers);
//                 expect(result).toEqual(users);
//                 expect(axios.post).toHaveBeenCalledTimes(1);
//                 expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/user/list`, {
//                     id: allUsers
//                 }, {
//                     headers
//                 });
//             })

//         })

//         describe("When api call is not successfull", (): void => {

//             it("should return empty list", async (): Promise<void> => {
//                 const axiosError: AxiosError = new AxiosError("Network Error", 500);
//                 axios.post = jest.fn().mockRejectedValueOnce({ response: { status: 500, statusText: "Network Error"}});
//                 const allUsers = getAllUsers(books, reviews);
//                 try {
//                     await getUserInfo(headers, allUsers);
//                 } catch (error) {
//                     expect(error).toEqual(axiosError);
//                     expect(axios.post).toHaveBeenCalledTimes(1);
//                     expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/user/list`, {
//                         id: allUsers
//                     }, {
//                         headers
//                     });
//                 }
//             })

//         })

//     })

//     describe("Test case for feeds", (): void => {
//         const feeds: IFeed[] = [
//             {
//                 userInfo: {
//                     "id": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                     "userName": "sanju",
//                     "fullName": "Sanjana Sharma",
//                     "email": "sonu@gmail.com"
//                 },
//                 bookInfo: {
//                     "id": "5bb0f22a-d64b-41be-8436-18f82e859bb4",
//                     "title": "Javascript",
//                     "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                     "releaseDate": new Date("2022-05-06T09:48:15.414Z"),
//                     "description": "A true story"
//                 },
//                 reviews: [
//                     {
//                         "id": "7ce9eb0d-8f08-4250-9cb0-6c9610f03b8f",
//                         "bookId": "b3501984-f08b-43db-a98d-6690231c03cf",
//                         "review": "Great Job",
//                         "createdAt": new Date("2022-05-06T10:45:06.168Z"),
//                         "reviewerInfo": {
//                             "id": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                             "userName": "sanju",
//                             "fullName": "Sanjana Sharma",
//                             "email": "sonu@gmail.com"
//                         }
//                     },
//                     {
//                         "id": "7e897b79-ca36-4263-be58-9fc4db4c433d",
//                         "bookId": "b3501984-f08b-43db-a98d-6690231c03cf",
//                         "review": "Great Job",
//                         "createdAt": new Date("2022-05-06T10:45:11.894Z"),
//                         "reviewerInfo": {
//                             "id": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                             "userName": "sanju",
//                             "fullName": "Sanjana Sharma",
//                             "email": "sonu@gmail.com"
//                         }
//                     }
//                 ]
//             },
//             {
//                 userInfo: {
//                     "id": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                     "userName": "sanju",
//                     "fullName": "Sanjana Sharma",
//                     "email": "sonu@gmail.com"
//                 },
//                 bookInfo: {
//                     "id": "435be8e7-a204-40c3-b860-b31a7baec8ef",
//                     "title": "Python",
//                     "authId": "1d758928-b5fe-49bd-b34d-6433d751520d",
//                     "releaseDate": new Date("2022-05-06T09:48:15.957Z"),
//                     "description": "A true story"
//                 },
//                 reviews: []
//             }
//         ];

//     })

// })