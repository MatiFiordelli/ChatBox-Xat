import createUserInDB from "../Services/createUserInDB";
import renameUserInDB from "../Services/renameUserInDB";
import { User } from "../Types";

export default function createOrRenameUserInDB(user: string | null, userObj: User, reEnterToChat: boolean){
    if(!reEnterToChat){
        user
            ? renameUserInDB(userObj)
            : createUserInDB(userObj)
    } else {
        user && createUserInDB(userObj)
    }
}