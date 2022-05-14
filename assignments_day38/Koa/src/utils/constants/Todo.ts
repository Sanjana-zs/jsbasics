import { Status } from "./methods";

export interface ITodo {
    id: string,
    title: string,
    status: Status,
    createdAt: Date,
    updatedAt: Date
}