import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { ToggleModalLoginVisibilityCtx, ToggleWsBooleanCtx, UsersListCtx } from "../../Context"
import { useContext } from "react"
import { ShowLogin, ToggleWsBoolean, UsersList } from "../../Types"

export default function Visitors( children: string | {} ){
    const {toggleWsBoolean} = useContext(ToggleWsBooleanCtx) as ToggleWsBoolean
    const {showLogin, setShowLogin} = useContext(ToggleModalLoginVisibilityCtx) as ShowLogin
    let nickName = useSelector<RootState>((state)=>state.chatboxReducer.user.nickName) as string
    const id = useSelector<RootState>((state)=>state.chatboxReducer.user.id) as string
    const {usersList, } = useContext(UsersListCtx) as UsersList

    const onClickUserNickname = () => {
        if(toggleWsBoolean){
            setShowLogin(!showLogin)
        } else {
            alert('Para cambiar tu Nickname, primero debes entrar al chat')
        }
    }

    if (Object.values(children)[0]==='test'){
        nickName='TestUser'
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
                        data-testid="myself"
                    />
                    <p>{nickName}</p>
                </div>

                {
                    usersList?.map((e)=>(
                        e.id !== id &&
                            <div 
                                className="flex items-center truncate cursor-pointer" 
                                key={e.id}
                            >
                                <img
                                    className="block aspect-auto w-min h-min xl:h-[80%]"
                                    alt={`${e.nickName}`}
                                    src="a_(user)_20.webp"                     
                                />
                                <p>{e.nickName}</p>
                            </div>
                    ))
                }
            </>       
            }
        </>
     )
}