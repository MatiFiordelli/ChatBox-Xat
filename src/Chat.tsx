import { useEffect, useRef, useState } from 'react' 
import SmileysCarousel from './Components/SmileysCarousel'
import { SmileyReducerState, UsersList } from './Types'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from './Redux/store'
import { setMessageInput, setUserName } from './Redux/actions'
import MessagesListContainer from './Components/MessagesListContainer'
import VisitorsContainer from './Components/VisitorsContainer'
import AsideVisitorsContainerMobile from './Components/VisitorsContainer/VisitorsContainerMobile/AsideVisitorsContainerMobile'
import MessageInputContainer from './Components/MessageInputContainer'
import { 
		MessageInputRefCtx, 
		MsgContainerDivRefCtx, 
		ToggleModalLoginVisibilityCtx, 
		ToggleWsBooleanCtx, 
		UsersListCtx,
		WsCtx} from './Context'
import ModalLogin from './Components/ModalLogin'
import { userLocalStorage } from './Functions/userLocalStorage'
import Spinner from './Components/Spinner'

export default function ChatBox() {
	const dispatch = useDispatch()
	const [showLogin, setShowLogin] = useState(userLocalStorage() ? false : true)

	const stateSmileys = useSelector<RootState>((state)=>state.smileysReducer) as SmileyReducerState
	const stateMessageInput = useSelector<RootState>((state)=>state.chatboxReducer.messageInput)
	
	const messageInputRef = useRef<HTMLInputElement | null>(null)
	const msgContainerDivRef = useRef<HTMLInputElement | null>(null)

	const [toggleWsBoolean, setToggleWsBoolean] = useState(true)

	const [usersList, setUsersList] = useState(null)

	const ws = useRef<WebSocket | null>(null)

	useEffect(()=>{
		stateSmileys.smileyClicked.code!=='' 
			&& dispatch(setMessageInput(`${stateMessageInput}${stateSmileys.smileyClicked.code}`))
	},[stateSmileys])
	
	useEffect(()=>{		
		const user = userLocalStorage()

		if(user){
			const parsedUser = JSON.parse(user)
			dispatch(setUserName( JSON.stringify(parsedUser) ))
		}

	},[])
	
	return (
		<WsCtx.Provider value={ws}>
			<UsersListCtx.Provider value={{usersList, setUsersList} as UsersList}>
				<ToggleWsBooleanCtx.Provider value={{toggleWsBoolean, setToggleWsBoolean}}>
					<ToggleModalLoginVisibilityCtx.Provider value={{showLogin, setShowLogin}}>
						<MsgContainerDivRefCtx.Provider value={msgContainerDivRef}>
							<MessageInputRefCtx.Provider value={messageInputRef}>

								<main className="relative grid grid-cols-2 place-items-center text-center w-[100dvw] h-[100dvh] overflow-hidden bg-slate-300 dark:bg-slate-900 duration-1000 transition-colors text-base lg:text-[1.8vw] xl:leading-loose">
									<Spinner />
									<section className={`${showLogin ? 'absolute' : 'hidden'} bg-black bg-opacity-70 text-white w-[100dvw] h-[100dvh] z-30 flex justify-center items-center`}>
										<ModalLogin />
									</section>

									<section className={`bg-[url('../public/summer_medium.jpg')] lg:bg-[url('../public/summer_big.jpg')] bg-center bg-no-repeat bg-cover absolute text-gray-100 rounded-xl w-[90dvw] h-[93dvh] flex flex-row justify-center lg:gap-[0.5vw] m-auto p-2`}>
										<div className="h-[98%] w-full sm:w-3/4 sm:h-[90dvh] flex flex-col justify-between text-slate-900 my-auto">
											<MessagesListContainer />
											<SmileysCarousel />
											<MessageInputContainer />
										</div>
										
										<VisitorsContainer />
										<AsideVisitorsContainerMobile />
									</section>
								</main>
								
							</MessageInputRefCtx.Provider>
						</MsgContainerDivRefCtx.Provider>
					</ToggleModalLoginVisibilityCtx.Provider>
				</ToggleWsBooleanCtx.Provider>
			</UsersListCtx.Provider>
		</WsCtx.Provider>
	)
}