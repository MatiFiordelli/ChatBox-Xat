import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { ToggleModalLoginVisibility } from "../../Context"
import { useContext } from "react"
import { ShowLogin } from "../../Types"


export default function Visitors(){
    const {showLogin, setShowLogin} = useContext(ToggleModalLoginVisibility) as ShowLogin
    const nickName = useSelector<RootState>((state)=>state.chatboxReducer.user.nickName) as string

    return(
        <>
            {nickName !== '' &&
            <>
                <div 
                    className="flex items-center truncate cursor-pointer" 
                    onClick={()=>setShowLogin(!showLogin)}
                    title="Click para modificar"
                >
                    <img
                        className="block aspect-auto w-min h-min xl:h-[80%]"
                        alt={nickName}
                        src="public/assets/smileys/a_(user)_20.webp"
                    />
                    <p>{nickName}</p>
                </div>


                <div 
                    className="flex items-center truncate cursor-pointer" 
                >
                    <img
                        className="block aspect-auto w-min h-min xl:h-[80%]"
                        alt="Antonela1"
                        src="public/assets/smileys/a_(user)_20.webp"                     
                    />
                    <p>Antonela1</p>
                </div>
                <div 
                    className="flex items-center truncate cursor-pointer" 
                >
                    <img
                        className="block aspect-auto w-min h-min xl:h-[80%]"
                        alt="Antonela2"
                        src="public/assets/smileys/a_(user)_20.webp"                     
                    />
                    <p>Antonela2</p>
                </div>
            </>       
            }
        </>
     )
}