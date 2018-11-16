import {
  GET_USER,
  CREATE_USER,
  gotUser,
  gotFailure,
} from '../actions/';

const apiConfig = {
  getUser1: {
    triggerActionType: GET_USER,
    successAction: gotUser,
    failureAction: gotFailure,
    getOptions: ({id}) => ({
      method: 'get',
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    }),
  },
  createUser: {
    triggerActionType: CREATE_USER,
    successAction: gotUser,
    failureAction: gotFailure,
    getOptions: ({user}) => ({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: user,
    }),
  }
}

export default apiConfig