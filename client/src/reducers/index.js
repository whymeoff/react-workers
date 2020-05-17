import { combineReducers } from 'redux'
import { reducer } from 'redux-form'
import authReducer from './authReducer'
import workersReducer from './workersReducer'

export default combineReducers({
    auth: authReducer,
    form: reducer,
    data: workersReducer
})