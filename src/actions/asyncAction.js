// export const gotAsyncData = (data) => (
//   {
//     type: 'GOT_DATA_ACTION',
//     data,
//   }
// )

// function fetchFakeApi(actionPayload) {
//   console.log('actionPayload', actionPayload)
//   return fetch('')
//     .then(data => data.json())
// }
//
// export function* asyncActionWithSaga(action) {
//   try {
//     const data = yield call(fetchFakeApi, action.payload)
//     yield put(gotAsyncData(data))
//   } catch (error) {
//     yield put({type: "FETCH_FAILED", error})
//   }
// }
