import { createContext } from "react"
import { ShowLogin } from "../Types"

export const MessageInputRefCtx = createContext<React.MutableRefObject<HTMLInputElement | null>|null>(null)
export const MsgContainerDivRefCtx = createContext<React.MutableRefObject<HTMLDivElement | null>|null>(null)
export const ToggleModalLoginVisibility = createContext<ShowLogin | null>(null)