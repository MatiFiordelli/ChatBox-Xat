import React, { SetStateAction, MutableRefObject } from "react"
import { Action, Dispatch } from "redux"

export interface SmileyObject {
	src: string | undefined
	code: string | undefined
}

export interface PropsButtonToggleVisitorsContainerMobile {
	visitorsMobileOpened: boolean
	setVisitorsMobileOpened: React.Dispatch<SetStateAction<boolean>>
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

export interface PropsMessageInput {
    ws: WebSocket
    beepSound: HTMLAudioElement | null
}

export interface PropsButtonInOut {
	dingdongSound: HTMLAudioElement | null
}

export interface PushMessageToContainer {
	msg: string 
	msgContainerDivRef: MutableRefObject<HTMLDivElement|null>|null 
	messageInputRef: MutableRefObject<HTMLDivElement|null>|null
	dispatch: Dispatch<Action>
	ws: WebSocket
	nickName: string
}

export interface ShowLogin {
	showLogin: boolean
	setShowLogin: React.Dispatch<SetStateAction<boolean>>
}

export interface ToggleWsBoolean {
	toggleWsBoolean: boolean
	setToggleWsBoolean: React.Dispatch<SetStateAction<boolean>>
}

export interface UsersList {
	usersList: null
	setUsersList: React.Dispatch<SetStateAction<null>>
}


