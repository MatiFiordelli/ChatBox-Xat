import { ADDSMILEY, SETMESSAGEINPUT, SETUSERNAME, SETDISPLAYSPINNER } from "../types"
import { SmileyObject } from "../../Types"

export const addSmiley = (payload: SmileyObject) => ({
	type: ADDSMILEY,
	payload: payload,
})

export const setMessageInput = (payload:string) => ({
    type: SETMESSAGEINPUT,
    payload: payload
})

export const setUserName = (payload:string) => ({
    type: SETUSERNAME,
    payload: payload
})

export const setDisplaySpinner = (payload:boolean) => ({
    type: SETDISPLAYSPINNER,
    payload: payload
})