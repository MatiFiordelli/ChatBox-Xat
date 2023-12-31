import { useContext, useState } from "react"
import { ToggleModalLoginVisibility } from "../../Context"
import { ShowLogin } from "../../Types"
import capitalizeText from "../../Functions/capitalizeText"
import { setUserName } from "../../Redux/actions"
import { userLocalStorage } from "../../Functions/userLocalStorage"
import { useDispatch } from "react-redux"

export default function ModalLogin(){
    const dispatch = useDispatch()
    const [nickName, setNickName] = useState('')
    const {showLogin, setShowLogin} = useContext(ToggleModalLoginVisibility) as ShowLogin

    const setNickNameFunction = (nickName:string) => {
		if(nickName!==''){
			const id = Math.random().toString().split('.')[1]
			const nickNameCapitalized = capitalizeText(nickName)
			const userObj = {nickName: nickNameCapitalized, id: id}
			localStorage.setItem('user', `${JSON.stringify(userObj)}`)

			setShowLogin(false)
			dispatch(setUserName(`${userLocalStorage()}`))			
		}
	}

    return(
        <div className="bg-slate-900 dark:bg-slate-300 w-fit lg:w-1/3 flex flex-col 2xl:gap-[2vw] justify-center items-center p-4 2xl:p-[2vw] 2xl:pt-2 rounded-lg">
            <div className="flex justify-end items-center border-1 w-full m-0 p-0">
                <span 
                    className="block text-slate-900 w-fit cursor-pointer"
                    onClick={()=>setShowLogin(!showLogin)}
                >
                    ⨉
                </span>
            </div>
            <label className="text-base xl:text-xl 2xl:text-[1.6vw] text-slate-300 dark:text-slate-900 bolder text-bold mb-4">
                Cual es tu nombre?
            </label>
            <input 
                id="nickName" 
                type="text" 
                className="w-full p-3 mb-4 bg-opacity-90 flex flex-auto bg-slate-100 text-slate-900 rounded-lg 2xl:rounded-2xl shadow-sm dark:shadow-md shadow-slate-300 overflow-auto outline-none"
                value={nickName}
                onChange={(e)=>setNickName(e.target.value)}
                onKeyUp={(e)=>e.key==='Enter' && setNickNameFunction(nickName)}
            />
            <button
                className="text-base xl:text-xl 2xl:text-[1.6vw] w-auto bg-slate-500 hover:text-slate-100 active:bg-slate-600 transition-colors rounded-lg 2xl:rounded-2xl text-white p-1 xl:p-[1vw] shadow-md mb-2 py-1 px-4"
                onClick={()=>setNickNameFunction(nickName)}
            >
                Listo
            </button>
        </div>
    )
}