import { useState, useEffect, useContext } from "react"
import ButtonMessageInput from "./ButtonMessageInput"
import MessageInput from "./MessageInput"
import DingDong from '../../../public/Assets/Sounds/dingdong.webm'
import Beep from '../../../public/Assets/Sounds/beep.webm'
import ButtonInOut from "./ButtonInOut"
import deleteUserInDB from "../../Services/deleteUserInDB"
import { userLocalStorage } from "../../Functions/userLocalStorage"
import { MessageInputRefCtx, MsgContainerDivRefCtx, ToggleWsBooleanCtx, UsersListCtx, WsCtx } from "../../Context"
import { ToggleWsBoolean, UsersList } from "../../Types"
import createUserInDB from "../../Services/createUserInDB"
import { refreshUserList } from "../../Services/refreshUserList"
import { createWebsocket } from "../../Services/createWebsocket"
import { useDispatch } from "react-redux"
import { setMessageInput } from "../../Redux/actions"

export default function MessageInputContainer(){
    const dispatch = useDispatch()
    const msgContainerDivRef = useContext(MsgContainerDivRefCtx)
    const messageInputRef = useContext(MessageInputRefCtx)
    const {toggleWsBoolean, setToggleWsBoolean} = useContext(ToggleWsBooleanCtx) as ToggleWsBoolean
    const {usersList, setUsersList} = useContext(UsersListCtx) as UsersList
    const ws = useContext(WsCtx) as React.MutableRefObject<WebSocket | null>
    const [wsId,] = useState((Math.floor(Math.random() * 1000)).toString())

    if(usersList) true

    const insertContact = async () => {
        if(ws.current?.readyState===1){
            try{ 
                const ins = await createUserInDB(JSON.parse(userLocalStorage() as string))
                if (ins) {
                    console.log('Usuario insertado en la base de datos, exitosamente')
                    ws.current?.send('{"command": "REFRESH_USERS"}')
                }

            } catch(e){
                console.log('Ocurrio un error al intentar insertar el usuario de la base de datos', e)
            }                        
        }
    }

    const deleteContact = async () => {
        try{
            const del = await deleteUserInDB(JSON.parse(userLocalStorage() as string))
            if (del) {
                console.log('Usuario borrado de la base de datos, exitosamente')
                if (ws.current?.readyState===1){
                    ws.current?.send('{"command": "REFRESH_USERS"}')
                    ws.current?.close()
                    ws.current = null
                }
            }

        } catch(e){
            console.log('Ocurrio un error al intentar borrar el usuario de la base de datos', e)
        }
    }

    useEffect(()=>{
        toggleWsBoolean
            ? createWebsocket({ws, wsId})
            : deleteContact()

        if(ws.current){
            ws.current.onclose = () => {
                alert('Se cerró la conexion')
                console.log('Se cerró la conexion')
                setToggleWsBoolean(false)
            }
            ws.current.onerror = () => {
                alert('No fue posible conectarse al servidor')
                console.log('Error al conectarse al servidor')
                setToggleWsBoolean(false)
            }
            ws.current.onopen = async() => {
                console.log('Conectado al Websocket', ws.current?.readyState)
                insertContact()
                refreshUserList(setUsersList)
            }
            ws.current.onmessage = async(e) => {
                const msg4 = JSON.parse(e.data).msg
                const parsedNickname = JSON.parse(e.data).nickName

                if(msg4!=='' && msg4!==undefined){			
                    const msgHTMLElement = `
                                            <p style="font-weight:bold;">${parsedNickname}</p>
                                            <div style="margin-bottom:0.7rem; display:inline-block;">${msg4}</div>
                                            `

                    if(msgContainerDivRef?.current){
                        msgContainerDivRef.current.innerHTML += msgHTMLElement
                        msgContainerDivRef.current.scrollTop = msgContainerDivRef.current.scrollHeight
                    } 

                    dispatch(setMessageInput(''))
                    messageInputRef?.current?.focus()
                    console.log('Mensaje enviado con exito')
                } else {
                    console.log('Refrescando la lista de contactos')
                    refreshUserList(setUsersList)
                }
            }
        }

    },[toggleWsBoolean])

    useEffect(()=>{
            const beforeUnload = (event: Event) => {
                const e = event || window.event
                e.preventDefault()
                deleteUserInDB(JSON.parse(userLocalStorage() as string))
                ws.current?.send('{"command": "REFRESH_USERS"}')
                setToggleWsBoolean(false)
            }

            window.addEventListener('beforeunload', (e) => beforeUnload(e))

            return ()=>{
                deleteUserInDB(JSON.parse(userLocalStorage() as string))
                ws.current?.send('{"command": "REFRESH_USERS"}')
                setToggleWsBoolean(false)
                removeEventListener('beforeunload', (e) => beforeUnload(e))
            }
    },[])

    return(        
        <div id="messageInputContainer" className="w-full h-[15%] flex flex-row space-x-2 lg:gap-[0.5vw]">
            <MessageInput ws={ws.current} beepSound={document.querySelector('#beepSound')} />
            <ButtonMessageInput ws={ws.current} beepSound={document.querySelector('#beepSound')} />
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