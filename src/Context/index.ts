import { createContext } from "react"
import { ShowLogin, ToggleWsBoolean } from "../Types"

export const MessageInputRefCtx = createContext<React.MutableRefObject<HTMLInputElement | null>|null>(null)
export const MsgContainerDivRefCtx = createContext<React.MutableRefObject<HTMLDivElement | null>|null>(null)
export const ToggleModalLoginVisibilityCtx = createContext<ShowLogin | null>(null)
export const ToggleWsBooleanCtx = createContext<ToggleWsBoolean | null>(null)