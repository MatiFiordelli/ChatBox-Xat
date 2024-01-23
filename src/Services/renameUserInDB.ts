import { User, WsRef } from "../Types"

export default function renameUserInDB(user: User, ws: WsRef){
    fetch('http://localhost:3001/renameUser',{
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