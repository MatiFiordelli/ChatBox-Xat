import  { combineReducers } from 'redux'
import smileysReducer from './smileysReducer'
import chatboxReducer from './chatboxReducer'
import displaySpinnerReducer from './displaySpinnerReducer'

const reducer = combineReducers({
    smileysReducer,
    chatboxReducer,
    displaySpinnerReducer
})

export default reducer