import { useContext } from "react"
import createOrRenameUserInDB from "../../../Functions/createOrRenameUserInDB"
import { userLocalStorage } from "../../../Functions/userLocalStorage"
import { PropsButtonInOut, ToggleWsBoolean } from "../../../Types"
import { ToggleWsBooleanCtx } from "../../../Context"

export default function ButtonInOut({ dingdongSound }: PropsButtonInOut ) {
    const {toggleWsBoolean, setToggleWsBoolean} = useContext(ToggleWsBooleanCtx) as ToggleWsBoolean

    const onClickEnterChatButton = () => {
        setToggleWsBoolean(!toggleWsBoolean)
        !toggleWsBoolean && dingdongSound?.play()

        const user = userLocalStorage()
        !toggleWsBoolean && user && createOrRenameUserInDB(user, JSON.parse(user), true)
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

