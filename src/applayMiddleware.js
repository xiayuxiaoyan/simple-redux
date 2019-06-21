import { compose } from "./compose";

// 核心思想是；中间件包装dispatch,再action和reducer中间，添加异步效果
export function applayMiddleware(...middlewares){
  return function cstore(creatStore){
    return function rd(reducer, initstate){
      const store = creatStore(reducer, initstate);
      const middlewaresChain = middlewares.map(item => item({dispatch:store.dispatch, getState:store.getState}));
      // const distpatch = middleware({dispatch:store.dispatch, getState:store.getState})(store.dispatch);
      const distpatch = compose(...middlewaresChain)(store.dispatch);
      return { ...store, distpatch };
    }
  }
}