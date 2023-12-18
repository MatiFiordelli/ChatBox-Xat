import React from "react"
import { Action, Dispatch } from "redux"

export interface SmileyObject {
	src: string | undefined
	code: string | undefined
}

export interface PropsButtonToggleVisitorsContainerMobile {
	visitorsMobileOpened: boolean
	setVisitorsMobileOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ReduxAction {
    type: string
	payload: SmileyReducerState | ChatboxReducerState
}

export interface SmileyReducerState {
    smileyClicked: SmileyObject
}

export interface ChatboxReducerState {
	messageInput: string
}

export interface WebSocketConnection {
    ws: WebSocket
}

export interface PushMessageToContainer {
	msg:string 
	msgContainerDivRef:React.MutableRefObject<HTMLDivElement|null>|null 
	messageInputRef:React.MutableRefObject<HTMLDivElement|null>|null
	dispatch: Dispatch<Action>
	ws: WebSocket
}


