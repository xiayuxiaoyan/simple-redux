export function createStore(reducer, enhancer) {
  if(enhancer) {
    return enhancer(createStore)(reducer);
  }
  let state = {};
  const listners = [];
  function getState() {
    return state;
  }
  function subcribe(listener) {
    listners.push(listener);
  }
  function dispatch(action) {
    state = reducer(state, action);
    listners.forEach(fn => fn())
    return action;
  }
  dispatch({ type: 'init' })
  return { getState, subcribe, dispatch };
}