import { SETMESSAGEINPUT } from "../types"
import { ReduxAction, ChatboxReducerState } from "../../Types"

const initialState: ChatboxReducerState = {
    messageInput: '',
}

export default function chatboxReducer(state=initialState, action:ReduxAction) {
    switch(action.type){
        case SETMESSAGEINPUT:
            return {...state, messageInput: action.payload}
        default:
            return state
    }    
}