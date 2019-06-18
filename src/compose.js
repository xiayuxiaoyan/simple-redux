export function compose(...funcs) {
  if(funcs.lentgh === 0) {
    return true;
  }
  if(funcs.lentgh === 1) {
    return funcs[0];
  }
  return funcs.reduce((last, cur) => (...args) => last(cur(...args)));
}