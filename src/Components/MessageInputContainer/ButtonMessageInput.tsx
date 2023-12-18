import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { pushMessageToContainer } from "../../Functions/pushMessageToContainer"
import { useContext, useEffect } from "react"
import { MessageInputRefCtx, MsgContainerDivRefCtx } from "../../Context"
import { useDispatch } from "react-redux"
import { WebSocketConnection } from '../../Types'

export default function ButtonMessageInput({ ws }:WebSocketConnection){
    const dispatch = useDispatch()
    const messageInputRef = useContext(MessageInputRefCtx)
    const msgContainerDivRef = useContext(MsgContainerDivRefCtx)
    const messageInput = useSelector<RootState>((state)=>state.chatboxReducer.messageInput) as string
    const pushMsgArgs = {
        msg:messageInput, 
        msgContainerDivRef, 
        messageInputRef, 
        dispatch,
        ws
    }

    useEffect(()=>{
        ws.onopen = (() => pushMessageToContainer(pushMsgArgs))
    },[])

    return(
        <button 
            className="text-base xl:text-xl 2xl:text-[1.6vw] w-auto bg-slate-500 hover:text-slate-100 active:bg-slate-600 transition-colors rounded-lg 2xl:rounded-2xl text-white p-1 xl:p-[1vw] shadow-md"
            onClick={()=>pushMessageToContainer(pushMsgArgs)}
        >
            Enviar
        </button>
    )
}