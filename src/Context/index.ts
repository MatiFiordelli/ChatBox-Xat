import { createContext } from "react"

export const MessageInputRefCtx = createContext<React.MutableRefObject<HTMLInputElement | null>|null>(null)
export const MsgContainerDivRefCtx = createContext<React.MutableRefObject<HTMLDivElement | null>|null>(null)