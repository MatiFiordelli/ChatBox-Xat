import { SETMESSAGEINPUT, SETUSERNAME } from "../types"
import { ReduxAction, ChatboxReducerState } from "../../Types"

const initialState: ChatboxReducerState = {
    messageInput: '',
    user: {
        nickName: '',
        id: ''
    }
}

export default function chatboxReducer(state=initialState, action:ReduxAction) {
    switch(action.type){
        case SETMESSAGEINPUT:
            return {...state, messageInput: action.payload}
        case SETUSERNAME:
            const obj = JSON.parse(action.payload as string)
            return {...structuredClone(state), user:obj}

         default:
            return state
    }    
}