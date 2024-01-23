import { User } from "../Types"

export default async function createUserInDB(user: User){
    return fetch('http://localhost:3001/insertUser',{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
    .catch((e)=>console.log(e))
}