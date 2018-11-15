export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      }
    case 'INCREMENT':
      return {
        result: 1
      }
    default:
      return state
  }
}
