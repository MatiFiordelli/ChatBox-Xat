import { ADDSMILEY } from "../types"
import { ReduxAction, SmileyReducerState } from "../../Types"

const initialState: SmileyReducerState = {
    smileyClicked: {
        src: '',
        code: ''
    }
}

export default function smileysReducer(state=initialState, action:ReduxAction) {
    switch(action.type){
        case ADDSMILEY:
            return {...state, smileyClicked:action.payload}
        default:
            return state
    }    
}


