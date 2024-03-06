import { User } from "../Types"
import crudUrl from "./apiCrudForUsers"

export default async function deleteUserInDB(user: User){
    return fetch(`${crudUrl}deleteUser`,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
    .catch((e)=>console.log(e))
}