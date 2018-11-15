import { call, put } from 'redux-saga/effects'

export const gotAsyncData = (data) => (
  {
    type: 'GOT_DATA_ACTION',
    data,
  }
)

function fetchFakeApi(actionPayload) {
  console.log('actionPayload', actionPayload)
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => data.json())
}

export const asyncActionWithThunk = () => {
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return (dispatch) => {
    return fetchFakeApi()
      .then(data => dispatch(gotAsyncData(data)))
      .catch((error) => dispatch(({type: "FETCH_FAILED"})))
  }
}

export function* asyncActionWithSaga(action) {
  try {
    const data = yield call(fetchFakeApi, action.payload)
    yield put(gotAsyncData(data))
  } catch (error) {
    yield put({type: "FETCH_FAILED", error})
  }
}