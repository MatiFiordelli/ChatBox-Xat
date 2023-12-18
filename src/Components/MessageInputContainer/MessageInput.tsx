import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { useDispatch } from "react-redux"
import { setMessageInput } from "../../Redux/actions"
import { useContext } from "react"
import { MessageInputRefCtx, MsgContainerDivRefCtx } from "../../Context"
import { pushMessageToContainer } from "../../Functions/pushMessageToContainer"
import { WebSocketConnection } from '../../Types'


export default function MessageInput({ ws }: WebSocketConnection){
    const messageInputRef = useContext(MessageInputRefCtx)
    const msgContainerDivRef = useContext(MsgContainerDivRefCtx)
    const dispatch = useDispatch()
    const messageInput = useSelector<RootState>((state)=>state.chatboxReducer.messageInput) as string
    
    const onKeyDownEnterKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
		e.key==='Enter' && 
            pushMessageToContainer({
                msg:messageInput, 
                msgContainerDivRef, 
                messageInputRef, 
                dispatch,
                ws
            })
	}
    
    return(
        <div className="p-3 2xl:p-[2vw] bg-opacity-90 flex flex-auto bg-slate-100 text-slate-900 rounded-bl-lg 2xl:rounded-bl-2xl shadow-md overflow-auto break-all">
            <input 
                autoFocus
                aria-label="messageInput"
                ref={messageInputRef}
                id="messageInput"
                type="text" 
                className="w-full bg-transparent outline-none break-words align-middle" 
                value={messageInput}
                onChange={(e)=>{dispatch(setMessageInput(e.currentTarget.value))}}
                onKeyDown={(e)=>onKeyDownEnterKey(e)}
            />
        </div>
    )
}