import { useState, useEffect } from "react"
import ButtonMessageInput from "./ButtonMessageInput"
import MessageInput from "./MessageInput"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import DingDong from '../../../public/Assets/Sounds/dingdong.webm'
import Beep from '../../../public/Assets/Sounds/beep.webm'
import wsUrl from "../../Services/webSocket"
import ButtonInOut from "./ButtonInOut"

export default function MessageInputContainer(){
    const user = useSelector<RootState>((state)=>state.chatboxReducer.user) as string
    const [ws, setWs] = useState(new WebSocket(wsUrl))
    const [toggleWsBoolean, setToggleWsBoolean] = useState(true)

    useEffect(()=>{
        toggleWsBoolean
            ? setWs(new WebSocket(wsUrl))
            : ws.close()

    },[toggleWsBoolean])

    ws.onopen = () => {
        console.log('Conectado al Websocket')
    }

    ws.onerror = () => {
        alert('No fue posible conectarse al servidor')
    }
    
    ws.onclose = () => {
        console.log('Se cerró la conexion')
        fetch('http://localhost:3001/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    return(
        <div id="messageInputContainer" className="w-full h-[15%] flex flex-row space-x-2 lg:gap-[0.5vw]">
            <MessageInput ws={ws} beepSound={document.querySelector('#beepSound')} />
            <ButtonMessageInput ws={ws} beepSound={document.querySelector('#beepSound')} />
            <ButtonInOut toggleWsBoolean={toggleWsBoolean} setToggleWsBoolean={setToggleWsBoolean} dingdongSound={document.querySelector('#dingDongSound')} />

            <audio id="dingDongSound">
                <source src={DingDong} type="audio/webm"></source>
            </audio>
            <audio id="beepSound">
                <source src={Beep} type="audio/webm"></source>
            </audio>
        </div>
    )
}