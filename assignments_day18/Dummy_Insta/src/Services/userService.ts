import { userData } from "../Constants/data";
import { IUser } from "../Constants/interface";
import { AuthError, NotFoundError } from "../Error/error";
import jsonWebToken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const createToken = (id: string): string => {
    const secret = process.env.SECRET_KEY || 'secret_key';
    const token = jsonWebToken.sign({ userId: id }, secret);
    return token;
}

const createUser = (body: IUser): string => {
    const { userName, fullName, email, password } = body;
    const newUser: IUser = {
        id: uuidv4(),
        userName, fullName, email, password
    }
    userData.push(newUser);
    return newUser.id;
}

const deleteRespectiveUser = (userId: string): IUser[] => {
    const index = userData.findIndex((e: IUser) => e.id === userId);
    if (index === -1) {
        throw new NotFoundError("User doesn't exist");
    }
    userData.splice(index, 1);
    return userData;
}

const getById = (userId: string): IUser => {
    const userInfo: IUser | undefined = userData.find((e: IUser) => e.id === userId);
    if (!userInfo) {
        throw new AuthError("User doesn't exist");
    }
    return userInfo;
}

const getUserInfo = (query: string[] | string): IUser[] => {
    // do efficient coding
    const userInfo: IUser[] = userData.filter((e: IUser) => {
        return query.includes(e.id);
    });
    return userInfo;
}

const updateUser = (body: IUser, userId: string): void => {
    const { userName, fullName, email, password } = body;
    const user = userData.find((e: IUser) => e.id === userId);
    if (typeof user === undefined) {
        throw new AuthError("User doesn't exist");
    }
    for (const user of userData) {
        if (user.id === userId) {
            user.userName = userName || user.userName;
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.password = password || user.password;
            break;
        }
    }
}

const handleUserQuery = (query: string | string[]): IUser[] => {
    const userName = Array.isArray(query) ? query[0] : query;
    const filteredData: IUser[] = userData.filter((e: IUser) => e.userName.includes(userName));
    return filteredData;
}

const makeLogin = (body: { email: string, password: string }): string => {
    const { email, password } = body;
    const index = userData.findIndex((e: IUser) => e.email === email && e.password === password);
    if (index === -1) {
        throw new AuthError("User doesn't exist");
    }
    const id = userData[index].id;
    return createToken(id);
}

export { getById, deleteRespectiveUser, createUser, handleUserQuery, makeLogin, updateUser, getUserInfo };