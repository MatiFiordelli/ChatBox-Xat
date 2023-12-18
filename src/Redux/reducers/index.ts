import  { combineReducers } from 'redux'
import smileysReducer from './smileysReducer'
import chatboxReducer from './chatboxReducer'

const reducer = combineReducers({
    smileysReducer,
    chatboxReducer
})

export default reducer