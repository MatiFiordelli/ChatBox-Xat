import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

export default function Spinner(){
    const display = useSelector<RootState>((state)=>state.displaySpinnerReducer.display)

    return(
        <div className = {`${display ? 'grid' : 'hidden'} place-items-center bg-transparent fixed top-0 left-0 w-[100dvw] h-[100dvh] z-10 duration-500 text-slate-900`}>
            <div className="grid place-items-center bg-[rgb(255,255,255,.3)] p-4 rounded-lg shadow-lg">
                <div className = "animate-spin bg-transparent border-[0.7dvw] border-solid border-t-transparent border-b-transparent border-l-[#3b3a3a] border-r-[#3b3a3a] rounded-full w-[5dvh] h-[5dvh] z-0" />
                <p>connecting to the server</p>
                <p>please, wait around 30 seconds..</p>
            </div>
        </div>
    )
}