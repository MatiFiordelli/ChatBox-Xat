import Visitors from "../Visitors";

export default function VisitorsContainerMobile(){
    return(
        <div className="space-y-1 font-semibold italic w-fit h-[100vh] p-3 bg-opacity-50 bg-slate-100 text-slate-900 capitalize shadow-md overflow-auto">
            <Visitors />
        </div>
    )
}