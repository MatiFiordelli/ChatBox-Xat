import { PropsButtonInOut } from "../../../Types"

export default function ButtonInOut({ toggleWsBoolean, setToggleWsBoolean, dingdongSound }: PropsButtonInOut ) {
    const onClickEnterChatButton = () => {
        setToggleWsBoolean(!toggleWsBoolean)
        !toggleWsBoolean && dingdongSound?.play()
    }

    return(
        <button 
            className="text-base xl:text-xl 2xl:text-[1.6vw] w-[6ch] xl:w-[7ch] bg-slate-500 hover:text-slate-100 active:bg-slate-600 transition-colors rounded-lg 2xl:rounded-2xl text-white p-1 xl:p-[1vw] shadow-md"
            onClick={()=> onClickEnterChatButton() }
        >
            {!toggleWsBoolean ? 'Entrar' : 'Salir'}
        </button>
    )
}

