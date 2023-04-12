import { User } from "../redux/user/types";
import MOCKS from "../mocks/data";
import * as yup from 'yup';

const userSchemaValidator = yup.object({
    name: yup.string().required()
})

const NOT_LOGGED_USER : User = {
    name: "",
    email: "",
    uid: "",
    role: ""
} 

export const currentUser = () : User => {
    if(import.meta.env.DEV) {
        return MOCKS.USER;
    }

    const dataFromSessionStorage = sessionStorage.getItem("user");

    if(!dataFromSessionStorage) {
        return NOT_LOGGED_USER;
    }

    let user = NOT_LOGGED_USER;
    if(dataFromSessionStorage) {
        let userDataFromSessionStorage;
        try {
            userDataFromSessionStorage = JSON.parse(dataFromSessionStorage);
            userSchemaValidator.validateSync(userDataFromSessionStorage);
            user = userDataFromSessionStorage as User;
        } catch (error) {
            sessionStorage.clear();
        }
    }

    return user;
} 