import axios from 'axios'
import { call, put, takeEvery, all } from 'redux-saga/effects'
import config from '../config'

const makeRequest = (options) => {
  return axios(options)
}

const requestSagaFactory = (requestConfig) => {
  return function* asyncRequestSaga(action) {
    const { getOptions, successAction, failureAction } = requestConfig
    const options = getOptions(action)
    try {
      const { data } = yield call(makeRequest, options)
      yield put(successAction(data))
    } catch (error) {
      yield put(failureAction(error))
    }
  }
}

export default function* watchApiRequests() {
  const watchRequestSagas = Object.values(config.api).map((requestConfig) => {
    const { triggerActionType } = requestConfig
    const requestSaga = requestSagaFactory(requestConfig)
    const watchRequestSaga = function* () {
      yield takeEvery(triggerActionType, requestSaga)
    }
    return watchRequestSaga()
  })

  yield all(watchRequestSagas)
}
