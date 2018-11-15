export const gotAsyncData = (data) => (
  {
    type: 'GOT_DATA_ACTION',
    data,
  }
)

function fetchFakeApi() {
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
}

export const asyncActionWithThunk = () => {
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return (dispatch) => {
    return fetchFakeApi()
      .then(data => data.json())
      .then(data => dispatch(gotAsyncData(data))
    )
  }
}