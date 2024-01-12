import { User } from "../Types"

export default function deleteUserInDB(user: User){
    fetch('http://localhost:3001/deleteUser',{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
    .catch((e)=>console.log(e))
}