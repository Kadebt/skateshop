import reducer from './reducer'
import cartReducer from './cartreducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import promiseMiddleware from 'redux-promise-middleware'

const reducers = combineReducers({
    user: reducer,
    cart: cartReducer
})

export default createStore(reducers, composeWithDevTools(applyMiddleware()))