import { useState } from "react"
import ButtonMessageInput from "./ButtonMessageInput"
import MessageInput from "./MessageInput"

export default function MessageInputContainer(){
    const [ws] = useState(new WebSocket('ws://localhost:8080'))
    ws.onerror = () => {
        alert('No fue posible conectarse al servidor')
    }
    ws.onclose = () => {
        console.log('Se cerro la conexion')
    }

    return(
        <div className="w-full h-[15%] flex flex-row space-x-2 lg:gap-[0.5vw]">
            <MessageInput ws={ws} />
            <ButtonMessageInput ws={ws} />
        </div>
    )
}