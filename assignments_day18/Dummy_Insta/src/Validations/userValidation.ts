import joi from "joi";
import { MandatoryError } from "../Error/error";
import { IUser } from "../Constants/interface";

const userValidation = (body: IUser): void => {
    const joiUserObject = joi.object({
        userName: joi.string().regex(/[A-Za-z0-9_-]+/).min(4).max(15).required(),
        fullName: joi.string().regex(/^[A-Za-z ]+$/).min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(16).required()
    });
    const validUser = joiUserObject.validate(body);
    if (validUser.error) {
        throw new MandatoryError(validUser.error.message);
    }
}

const loginValidation = (body: { email: string, password: string }): void => {
    const joiLoginObject = joi.object({
        email: joi.string().email().min(8).max(30).required(),
        password: joi.string().min(8).max(16).required()
    })
    const validUser = joiLoginObject.validate(body);
    if (validUser.error) {
        throw new MandatoryError(validUser.error.message);
    }
}

export { userValidation, loginValidation };