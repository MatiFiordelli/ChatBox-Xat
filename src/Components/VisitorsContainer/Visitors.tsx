import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { ToggleModalLoginVisibilityCtx, ToggleWsBooleanCtx } from "../../Context"
import { useContext } from "react"
import { ShowLogin, ToggleWsBoolean } from "../../Types"


export default function Visitors(){
    const {toggleWsBoolean} = useContext(ToggleWsBooleanCtx) as ToggleWsBoolean
    const {showLogin, setShowLogin} = useContext(ToggleModalLoginVisibilityCtx) as ShowLogin
    const nickName = useSelector<RootState>((state)=>state.chatboxReducer.user.nickName) as string

    const onClickUserNickname = () => {
        if(toggleWsBoolean){
            setShowLogin(!showLogin)
        } else {
            alert('Para cambiar tu Nickname, primero debes entrar al chat')
        }
    }

    return(
        <>
            {nickName !== '' &&
            <>
                <div 
                    className="flex items-center truncate cursor-pointer" 
                    onClick={()=>onClickUserNickname()}
                    title="Click para modificar"
                >
                    <img
                        className="block aspect-auto w-min h-min xl:h-[80%]"
                        alt={nickName}
                        src="a_(user)_20.webp"
                    />
                    <p>{nickName}</p>
                </div>


                <div 
                    className="flex items-center truncate cursor-pointer" 
                >
                    <img
                        className="block aspect-auto w-min h-min xl:h-[80%]"
                        alt="Antonela1"
                        src="a_(user)_20.webp"                     
                    />
                    <p>Antonela1</p>
                </div>
                <div 
                    className="flex items-center truncate cursor-pointer" 
                >
                    <img
                        className="block aspect-auto w-min h-min xl:h-[80%]"
                        alt="Antonela2"
                        src="a_(user)_20.webp"                     
                    />
                    <p>Antonela2</p>
                </div>
            </>       
            }
        </>
     )
}