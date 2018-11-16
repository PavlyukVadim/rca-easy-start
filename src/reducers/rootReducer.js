import { combineReducers } from 'redux'

import simpleReducer from './simpleReducer'
import user from './usersReducer'

export default combineReducers({
  simpleReducer,
  user,
})
