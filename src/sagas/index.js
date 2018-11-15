import { asyncActionWithSaga } from './../actions'

import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'

import { requestSagaFactory, gotAsyncData } from './../actions/asyncAction'

export function* helloSaga() {
  console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchFetchAsync() {
  yield takeEvery('INCREMENT_ASYNC', asyncActionWithSaga)
}



const GET_USER = 'GET_USER'
const CREATE_USER = 'CREATE_USER'

const config = {
  api: {
    getUser1: {
      getOptions: ({id}) => ({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      }),
      triggerAction: GET_USER,
      successAction: gotAsyncData,
    },
    createUser: {
      getOptions: () => ({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1
        }),
      }),
      triggerAction: CREATE_USER,
      successAction: gotAsyncData,
    }
  }
}

const makeRequest = (options) => {
  return axios(options)
}

export const requestSagaFactory = (requestConfig) => {
  return function* asyncRequestSaga(action) {
    const { getOptions, successAction } = requestConfig
    const options = getOptions(action)
    try {
      const { data } = yield call(makeRequest, options)
      yield put(successAction(data))
    } catch (error) {
      yield put({type: "FETCH_FAILED", error})
    }
  }
}


export function* watchApiRequests() {
  const { api: apiConfig } = config
  const watchRequestSagas = []

  Object.keys(apiConfig).forEach((request) => {
    const requestConfig = apiConfig[request]
    const { triggerAction } = requestConfig

    const requestSaga = requestSagaFactory(requestConfig)
    const watchRequestSaga = function* () {
      yield takeEvery(triggerAction, requestSaga)
    }
    watchRequestSagas.push(watchRequestSaga())
  })

  yield all(watchRequestSagas)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchAsync(),
    watchApiRequests(),
  ])
}
