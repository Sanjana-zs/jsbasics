import axios from 'axios';
import app from '../app';
import request from 'supertest';
import { feeds } from './data';
import dotenv from 'dotenv';
dotenv.config();

describe("Test cases for feeds", (): void => {
    const token = process.env.TOKEN;

    describe("When api call is successfull", (): void => {

        it("should return status of 200", async (): Promise<void> => {
            const response = await request(app.callback()).get('/feeds').set('Authorization', `Bearer ${token}`);
            const data = JSON.parse(response.text).data;
            expect(data).toEqual(feeds);
            expect(response.status).toBe(200);
            expect(axios.get).toHaveBeenCalledTimes(1);
        })

    })

    describe("When api call is unsuccessfull", (): void => {

        it("if the token is not present", async (): Promise<void> => {
            const response = await request(app.callback()).get('/feeds').set('Authorization', `Bearer`);
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'Unauthorized' });
            expect(axios.get).toHaveBeenCalledTimes(1);
        })

    })

})