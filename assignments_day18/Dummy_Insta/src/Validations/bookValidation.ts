import joi from 'joi';
import { userData } from '../Constants/data';
import { IBook, IUser } from '../Constants/interface';
import { AuthError, MandatoryError } from '../Error/error';

const bookValidation = (body: IBook, userId: string): void => {
    const joiBookObject = joi.object({
        title: joi.string().min(5).max(15).required(),
        description: joi.string().min(10).max(50).optional()
    });
    const validBook = joiBookObject.validate(body);
    if (validBook.error) {
        throw new MandatoryError(validBook.error.message);
    }
    // check user exists or not
    const index = userData.findIndex((e: IUser) => e.id === userId);
    if (index === -1) {
        throw new AuthError("User doesn't exist");
    }
}

export { bookValidation };