import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { pushMessageToContainer } from "../../Functions/pushMessageToContainer"
import { useContext, useEffect } from "react"
import { MessageInputRefCtx, MsgContainerDivRefCtx } from "../../Context"
import { useDispatch } from "react-redux"
import { PropsMessageInput } from '../../Types'

export default function ButtonMessageInput({ ws, beepSound }: PropsMessageInput){
    const dispatch = useDispatch()
    const messageInputRef = useContext(MessageInputRefCtx)
    const msgContainerDivRef = useContext(MsgContainerDivRefCtx)
    const messageInput = useSelector<RootState>((state)=>state.chatboxReducer.messageInput) as string
    const nickName = useSelector<RootState>((state)=>state.chatboxReducer.user.nickName) as string
    const pushMsgArgs = {
        msg:messageInput, 
        msgContainerDivRef, 
        messageInputRef, 
        dispatch,
        ws,
        nickName
    }

    useEffect(()=>{
        ws.onopen = (() => {
            pushMessageToContainer(pushMsgArgs)
        })
    },[])

    const onClickSendButton = () => {
        if (messageInputRef?.current?.value){
            if (ws.readyState === 1) {
                beepSound?.play()
                pushMessageToContainer(pushMsgArgs)
            } else {
                alert('Para enviar un mensaje, debes entrar al Chat')
            }
        }
    }

    return(
        <button 
            className="text-base xl:text-xl 2xl:text-[1.6vw] w-[6ch] xl:w-[7ch] bg-slate-500 hover:text-slate-100 active:bg-slate-600 transition-colors rounded-lg 2xl:rounded-2xl text-white p-1 xl:p-[1vw] shadow-md"
            onClick={()=>{
                onClickSendButton()
            }}
        >
            Enviar
        </button>
    )
}