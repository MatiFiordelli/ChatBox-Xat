import React, { SetStateAction } from "react"

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
	payload: SmileyReducerState | string | boolean
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
    ws: WebSocket | null
    beepSound: HTMLAudioElement | null
}

export interface PropsButtonInOut {
	dingdongSound: HTMLAudioElement | null
}

export interface PushMessageToContainer {
	msg: string 
	ws: WebSocket | null
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
	usersList: User[] | null
	setUsersList: setUsersListParams
}

export interface createWebsocketParams {
    ws: WsRef
    wsId: string
}

export type setUsersListParams = React.Dispatch<React.SetStateAction<User[] | null>>

export type WsRef = React.MutableRefObject<WebSocket | null>



