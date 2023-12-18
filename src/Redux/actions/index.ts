import { ADDSMILEY, SETMESSAGEINPUT } from "../types"
import { SmileyObject } from "../../Types"

export const addSmiley = (payload: SmileyObject) => ({
	type: ADDSMILEY,
	payload: payload,
})

export const setMessageInput = (payload:string) => ({
    type: SETMESSAGEINPUT,
    payload: payload
})