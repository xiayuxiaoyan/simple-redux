export const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if(typeof action === 'function') {
    action(dispatch, getState);
  }
  return next(action);
}