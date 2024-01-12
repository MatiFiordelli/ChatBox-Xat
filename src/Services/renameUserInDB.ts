import { User } from "../Types"

export default function renameUserInDB(user: User){
    fetch('http://localhost:3001/renameUser',{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
    .catch((e)=>console.log(e))
}