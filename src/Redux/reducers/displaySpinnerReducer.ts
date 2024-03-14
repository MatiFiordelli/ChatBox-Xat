import { ReduxAction } from "../../Types";
import { SETDISPLAYSPINNER } from "../types";

const initialState = {
    display: true
}

export default function displaySpinnerReducer(state=initialState, action:ReduxAction ){
    switch(action.type){
        case SETDISPLAYSPINNER:
            return {...state, display: action.payload}
            
        default:
            return state
    }
}