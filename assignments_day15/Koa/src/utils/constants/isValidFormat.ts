import { Status } from "./methods";

const checkValidation = (title: string, status: Status) => {
    if (!title) { // validation for title
        throw "Title is not defined";
    }
    if (status && ![Status.COMPLETE, Status.INCOMPLETE, Status.PENDING].includes(status)) {
        throw "Status is not defined";
    }
}

export default checkValidation;