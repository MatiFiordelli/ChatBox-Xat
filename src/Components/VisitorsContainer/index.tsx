import Visitors from "./Visitors";

export default function VisitorsContainer(){
    return(
        <div className="hidden sm:flex space-y-1 font-semibold italic w-1/4 h-[90vh] p-3 2xl:p-[2vw] flex-col justify-start gap-1 bg-opacity-90 bg-slate-100 text-slate-900 capitalize ml-2 my-auto rounded-lg 2xl:rounded-2xl shadow-md overflow-auto">
            <Visitors />
        </div>
    )
}