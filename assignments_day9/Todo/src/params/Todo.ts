import { Status } from "./status";

export interface Todo {
    id?: string;
    title?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}