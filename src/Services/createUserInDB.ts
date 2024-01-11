import { User } from "../Types"

export default function createUserInDB(user: User){
    fetch('http://localhost:3001/insertUser',{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
}