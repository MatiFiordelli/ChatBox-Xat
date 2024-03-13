import { MsgContainerDivRefCtx } from '../../Context'
import { useContext } from 'react'

export default function MessagesListContainer(){
    const msgContainerDivRef = useContext(MsgContainerDivRefCtx)

    return(
        <div 
            className="w-full h-[70%] bg-opacity-50 bg-slate-100 text-slate-900 text-start rounded-t-lg 2xl:rounded-t-2xl sm:rounded-ss-lg shadow-md overflow-y-scroll break-all p-4 2xl:p-[2vw] leading-tight"
            ref={msgContainerDivRef}
            id="msgContainerDiv" 
            role="textbox"
        />
    )
}