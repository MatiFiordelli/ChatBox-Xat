import { useState } from "react"
import VisitorsContainerMobile from ".."
import ButtonToggleVisitorsContainerMobile from "./ButtonToggleVisitorsContainerMobile"

export default function AsideVisitorsContainerMobile(){
    const [visitorsMobileOpened, setVisitorsMobileOpened] = useState(false)

    return(
        <aside className={`sm:hidden fixed flex flex-auto top-0 right-0 ${visitorsMobileOpened ? 'translate-x-80%]' : 'translate-x-[85%]'} h-[100vh] m-0 p-0 transition-transform duration-500 z-10`}>
            <ButtonToggleVisitorsContainerMobile visitorsMobileOpened={visitorsMobileOpened} setVisitorsMobileOpened={setVisitorsMobileOpened} />
            <VisitorsContainerMobile />
        </aside>
    )
}