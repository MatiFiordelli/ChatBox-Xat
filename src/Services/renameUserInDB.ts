import { User, WsRef } from "../Types"
import crudUrl from "./apiCrudForUsers"

export default function renameUserInDB(user: User, ws: WsRef){
    fetch(`${crudUrl}renameUser`,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
    .then((res)=>{
        res.ok && ws.current?.send('{"command": "REFRESH_USERS"}')
    })
    .catch((e)=>console.log(e))
}