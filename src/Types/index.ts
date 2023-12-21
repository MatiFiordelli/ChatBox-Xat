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
	payload: SmileyReducerState | string
}

export interface SmileyReducerState {
    smileyClicked: SmileyObject
}

export interface User {
	nickName: string
	id: string
}

export interface ChatboxReducerState {
	messageInput: string
	user: User
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
	nickName: string
}

export interface ShowLogin {
	showLogin: boolean
	setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}


