import { /* lazy, Suspense, */ useEffect, useState, useRef } from 'react' 
import SmileysCarousel from './Components/SmileysCarousel'
import "./App.css"
import { SmileyObject } from './Types'
import { getSmileysMap } from './Functions'

export default function App() {
	//const SmileysCarousel = lazy(()=>import('./Components/SmileysCarousel')) 
	const [smiley, setSmiley] = useState<SmileyObject|null|undefined>(null)
	const [messageInput, setMessagesInput] = useState<string>('')
	const [visitorsMobileOpened, setVisitorsMobileOpened] = useState(false)
	const messageInputRef = useRef<HTMLInputElement | null>(null)
	const msgContainerDiv = useRef<HTMLInputElement | null>(null)

	const validateEachCharacter = (msg:string) => {
		if(msg!==''){
			const validatedMsg = msg.match(/[a-zA-Z 0-9()!¡¿?çÇ/&%$@"',;.:-]/g)
			msg = ''
			validatedMsg?.forEach((e) => msg += e )
		}
		return msg
	}

	const placeMarkInSmileysCodesPosition = (msg:string, smileyCodesArray:RegExpMatchArray | null) => {
		if(msg!==''){			
			//to indicate where the smileyCodes are positionated, in case of exist . ex:(COOL) vs (???)
			smileyCodesArray?.forEach((e:string) => {
				const checkMatchSmiley = 
					Array.from(getSmileysMap().values()).some((value) => e.toUpperCase() === value )
				
				if(checkMatchSmiley) msg = msg.replace(e, '🚫') 		
			})
		}
		return msg
	}

	const replaceMarksWithEachProperImgTag = (msg:string, smileyCodesArray:RegExpMatchArray | null) => {
		if(msg!==''){			
			smileyCodesArray?.forEach((e:string)=>{
				for( let [src, codeSmiley] of getSmileysMap().entries() ){
					if(codeSmiley===e.toUpperCase()){
						msg = msg.replace('🚫', `<img src="${src}" style="display:inline" alt="${e}" title="${e}" />`)
						break
					}
				}
			})
		}
		return msg
	}
	
	const pushMessageToContainer = (msg:string) => { 
		const msg1 = validateEachCharacter(msg)
		const smileyCodesArray = msg1.match(/\((.*?)\)/g)
		const msg2 = placeMarkInSmileysCodesPosition(msg1, smileyCodesArray)
		const msg3 = replaceMarksWithEachProperImgTag(msg2, smileyCodesArray)

		if(msg3!==''){			
			const msgHTMLElement = `
									<p style="font-weight:bold">Matias</p>
									<div style="padding-bottom:0.5rem; display:inline">${msg3}</div>
									`
			if(msgContainerDiv.current){
				msgContainerDiv.current.innerHTML += msgHTMLElement
				msgContainerDiv.current.scrollTop = msgContainerDiv.current.scrollHeight
			}
		}
		setMessagesInput('')
	}

	useEffect(()=>{
		smiley && setMessagesInput((messagesInput)=>`${messagesInput}${smiley.code}`)

	},[smiley])

	const onKeyDownInputText = (e:React.KeyboardEvent<HTMLInputElement>) => {
		e.key==='Enter' && pushMessageToContainer(messageInput)
	}

	return (
		<main className="flex flex-row justify-center items-start overflow-hidden bg-slate-300 dark:bg-slate-900 duration-500 transition-colors">
			<section className="text-gray-100 rounded-xl w-[90vw] h-screen flex flex-row justify-center m-auto p-2">
				<div className="h-[98%] w-screen sm:w-3/4 sm:h-[90vh] flex flex-col justify-between text-slate-900 my-auto">
					<div 
						className="w-full h-[70%] bg-opacity-90 bg-slate-100 text-slate-900 rounded-t-lg sm:rounded-ss-lg shadow-md overflow-y-scroll break-all p-4"
						ref={msgContainerDiv}
						id="msgContainerDiv" 
					/>

					<SmileysCarousel statusProps={{smiley, setSmiley, messageInputRef}} />

					<div className="w-full h-[15%] flex flex-row space-x-2">
						<div className="p-3 bg-opacity-90 flex flex-auto bg-slate-100 text-slate-900 rounded-bl-lg shadow-md overflow-auto break-all">
							<input 
								autoFocus
								ref={messageInputRef}
								id="messageInput"
								type="text" 
								className="w-full bg-transparent outline-none break-words align-middle" 
								value={messageInput}
								onChange={(e)=>{setMessagesInput(e.currentTarget.value)}}
								onKeyDown={(e)=>onKeyDownInputText(e)}
							/>
						</div>
						<button 
							className="w-max bg-slate-500 hover:text-slate-100 active:bg-slate-600 transition-colors rounded-lg text-white p-1 shadow-md"
							onClick={()=>pushMessageToContainer(messageInput)}
						>
							Enviar
						</button>
					</div>
				</div>

				<div className="hidden sm:flex space-y-1 font-semibold italic w-1/4 h-[90vh] p-3 flex-col justify-start gap-1 bg-opacity-90 bg-slate-100 text-slate-900 capitalize ml-2 my-auto rounded-r-lg shadow-md overflow-auto">
					<div className="flex truncate">
						<img src="src/assets/smileys/a_(user)_20.webp" />
						matias
					</div>
					<div className="flex truncate">
						<img src="src/assets/smileys/a_(user)_20.webp" />
						antonelaaaaaaaaaaaa
					</div>
				</div>

				<aside className={`sm:hidden fixed flex flex-auto top-0 right-0 ${visitorsMobileOpened ? 'translate-x-80%]' : 'translate-x-[90%]'} h-[100vh] m-0 p-0 transition-transform duration-500`}>
					<button 
						onClick={()=>{setVisitorsMobileOpened(!visitorsMobileOpened)}}
						className={`sm:hidden bg-slate-500 bg-opacity-70 text-slate-100 rounded-l-lg text-xl w-fit h-fit m-0 px-2 py-4 ${visitorsMobileOpened ? 'translate-x-[40%]' : 'translate-x-[0%]'} relative top-[50%] translate-y-[-50%] `}
					>
						{visitorsMobileOpened ? <span>»</span> : <span>«</span>}
					</button>
					<div 
						className="space-y-1 font-semibold italic w-fit h-[100vh] p-3 bg-opacity-90 bg-slate-100 text-slate-900 capitalize ml-4 shadow-md overflow-auto"
					>
						<div className="flex truncate">
							<img src="src/assets/smileys/a_(user)_20.webp" />
							matias
						</div>
						<div className="flex truncate">
							<img src="src/assets/smileys/a_(user)_20.webp" />
							antonelaaaaaaaaaaaa
						</div>
					</div>
				</aside>
			</section>
		</main>
	)
}

