import { PropsButtonToggleVisitorsContainerMobile } from "../../../../Types"

export default function ButtonToggleVisitorsContainerMobile({visitorsMobileOpened, setVisitorsMobileOpened}: PropsButtonToggleVisitorsContainerMobile){
    return(
        <button 
            onClick={()=>{setVisitorsMobileOpened(!visitorsMobileOpened)}}
            className={`sm:hidden bg-slate-500 bg-opacity-70 text-slate-100 rounded-l-lg text-xl h-min m-0 px-2 py-4 relative top-[50%] translate-y-[-50%]`}
        >
            {visitorsMobileOpened ? <span>»</span> : <span>«</span>}
        </button>
    )
}