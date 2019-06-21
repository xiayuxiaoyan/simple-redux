export function createStore(reducer, initstate, enhancer) {
  if(enhancer) {
    return enhancer(createStore)(reducer, initstate);
  }
  let state = initstate || {};
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