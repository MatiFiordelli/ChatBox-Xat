import { useState, useEffect, useContext } from "react"
import ButtonMessageInput from "./ButtonMessageInput"
import MessageInput from "./MessageInput"
import DingDong from '../../../public/Assets/Sounds/dingdong.webm'
import Beep from '../../../public/Assets/Sounds/beep.webm'
import wsUrl from "../../Services/webSocket"
import ButtonInOut from "./ButtonInOut"
import deleteUserInDB from "../../Services/deleteUserInDB"
import { userLocalStorage } from "../../Functions/userLocalStorage"
import { ToggleWsBooleanCtx } from "../../Context"
import { ToggleWsBoolean } from "../../Types"

export default function MessageInputContainer(){
    const [ws, setWs] = useState(new WebSocket(wsUrl))
    const {toggleWsBoolean, setToggleWsBoolean} = useContext(ToggleWsBooleanCtx) as ToggleWsBoolean

    useEffect(()=>{
        toggleWsBoolean
            ? setWs(new WebSocket(wsUrl))
            : ws.close()

    },[toggleWsBoolean])

    ws.onopen = () => {
        console.log('Conectado al Websocket')
    }

    ws.onerror = () => {
        setToggleWsBoolean(false)
        alert('No fue posible conectarse al servidor')
        console.log('Error al conectarse al servidor')
    }

    ws.onclose = () => {
        setToggleWsBoolean(false)
        console.log('Se cerró la conexion')
        
        const user = userLocalStorage()
        user && deleteUserInDB(JSON.parse(user))
    }

    return(
        <div id="messageInputContainer" className="w-full h-[15%] flex flex-row space-x-2 lg:gap-[0.5vw]">
            <MessageInput ws={ws} beepSound={document.querySelector('#beepSound')} />
            <ButtonMessageInput ws={ws} beepSound={document.querySelector('#beepSound')} />
            <ButtonInOut dingdongSound={document.querySelector('#dingDongSound')} />

            <audio id="dingDongSound">
                <source src={DingDong} type="audio/webm"></source>
            </audio>
            <audio id="beepSound">
                <source src={Beep} type="audio/webm"></source>
            </audio>
        </div>
    )
}