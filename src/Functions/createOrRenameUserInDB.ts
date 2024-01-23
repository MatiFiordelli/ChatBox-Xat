import createUserInDB from "../Services/createUserInDB";
import renameUserInDB from "../Services/renameUserInDB";
import { User, WsRef } from "../Types";

export default function createOrRenameUserInDB(
                                                user: string | null, 
                                                userObj: User, 
                                                reEnterToChat: boolean, 
                                                ws: WsRef){
    if(!reEnterToChat){
        user
            ? renameUserInDB(userObj, ws)
            : createUserInDB(userObj)
    } else {
        user && createUserInDB(userObj)
    }
}