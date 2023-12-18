import { useEffect, useRef, useState } from 'react' 
import SmileysCarousel from './Components/SmileysCarousel'
import { SmileyReducerState, ChatboxReducerState } from './Types'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from './Redux/store'
import { setMessageInput } from './Redux/actions'
import MessagesContainer from './Components/MessagesContainer'
import VisitorsContainer from './Components/VisitorsContainer'
import AsideVisitorsContainerMobile from './Components/VisitorsContainer/VisitorsContainerMobile/AsideVisitorsContainerMobile'
import MessageInputContainer from './Components/MessageInputContainer'
import { MessageInputRefCtx, MsgContainerDivRefCtx } from './Context'

export default function ChatBox() {

	const [nickName, setNickName] = useState('')
	
	const dispatch = useDispatch()
	const stateSmileys = useSelector<RootState>((state)=>state.smileysReducer) as SmileyReducerState
	const stateMessageInput = useSelector<RootState>((state)=>state.chatboxReducer.messageInput) as ChatboxReducerState
	
	const messageInputRef = useRef<HTMLInputElement | null>(null)
	const msgContainerDivRef = useRef<HTMLInputElement | null>(null)

	useEffect(()=>{
		const nickNameLS = localStorage.getItem('nickName')
		!nickNameLS && localStorage.setItem('nickName', 'Visitor')
	},[])

	useEffect(()=>{
		stateSmileys.smileyClicked.code!=='' && dispatch(setMessageInput(`${stateMessageInput}${stateSmileys.smileyClicked.code}`))
	},[stateSmileys])
	
	const setNickNameFunction = () => {
		if(nickName!==''){
			const nickNameCapitalized = nickName.charAt(0).toUpperCase() + nickName.slice(1)
			localStorage.setItem('user', `{nickName: ${nickNameCapitalized}, id: '001'`)
		}
	}
	
	return (
		<MsgContainerDivRefCtx.Provider value={msgContainerDivRef}>
			<MessageInputRefCtx.Provider value={messageInputRef}>
				<main className="grid grid-cols-2 justify-center items-center text-center w-[200dvw] overflow-scroll bg-slate-300 dark:bg-slate-900 duration-1000 transition-colors translate-x-[0dvw] text-base lg:text-[1.8vw] xl:leading-loose">

					<section className="text-white w-[100dvw] flex justify-center items-center">
						<div className="bg-slate-900 dark:bg-slate-300 w-fit lg:w-1/3 grid grid-flow-row gap-4 2xl:gap-[2vw] justify-center items-center p-4 2xl:p-[2vw] rounded-lg">
							<label className="text-base xl:text-xl 2xl:text-[1.6vw] text-slate-300 dark:text-slate-900 bolder text-bold">Cual es tu nombre?</label>
							<input 
								id="nickName" 
								type="text" 
								className="p-3 bg-opacity-90 flex flex-auto bg-slate-100 text-slate-900 rounded-lg 2xl:rounded-2xl shadow-sm dark:shadow-md shadow-slate-300 overflow-auto outline-none"
								value={nickName}
								onChange={(e)=>setNickName(e.target.value)}
								onKeyUp={(e)=>e.key==='Enter' && setNickNameFunction()}
							 />
							<button
								className="text-base xl:text-xl 2xl:text-[1.6vw] w-auto bg-slate-500 hover:text-slate-100 active:bg-slate-600 transition-colors rounded-lg 2xl:rounded-2xl text-white p-1 xl:p-[1vw] shadow-md p-1 xl:p-[1vw]"
								onClick={()=>setNickNameFunction()}
							>
								Entrar
							</button>
						</div>
					</section>

					<section className="text-gray-100 rounded-xl w-[90dvw] h-screen flex flex-row justify-center lg:gap-[0.5vw] m-auto p-2">
						<div className="h-[98%] w-full sm:w-3/4 sm:h-[90dvh] flex flex-col justify-between text-slate-900 my-auto">
							<MessagesContainer />
							<SmileysCarousel />
							<MessageInputContainer />
						</div>
						
						<VisitorsContainer />
						<AsideVisitorsContainerMobile />
					</section>
				</main>
			</MessageInputRefCtx.Provider>
		</MsgContainerDivRefCtx.Provider>
	)
}