import { GOT_USER } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case GOT_USER:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}
