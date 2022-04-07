import { Status } from "./util";

export interface ITodo {
    id: string;
    title: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}