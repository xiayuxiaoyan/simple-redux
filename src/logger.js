// logger({getState, disptch})(dispatch);
export const logger = ({getState, dispatch}) => (next) => (action) => {
  if(typeof action === 'function') {
    action(dispatch, getState);
  }
  next(action);
  console.log(action.type);
}