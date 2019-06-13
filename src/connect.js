import React from 'react';
import { StoreContext } from './StoreContext';

function bindActionCreator(action, dispatch) {
  return (...args) => dispatch(action(...args))
}

function bindActionCreators(actions, dispatch) {
  Object.keys(actions).reduce((last, cur) => last[cur] = bindActionCreator(actions[cur], dispatch), {})
}

// connect 高阶函数，返回一个函数(接收组件作为参数)，函数返回一个组件
export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrapComponent) => {
    class newComponent extends React.Component{
      constructor (props, context) {
        super(props, context)
        this.state = {
          props: {}
        }
      }
      componentDidMount() {
        const { store } = this.context;
        //组拼所需要的props
        this.update();
        // 订阅store变了更新函数
        store.subscribe(() => this.update());
      }
      update() {
        const { store } = this.context;
        const stateProps = mapStateToProps(store.getState());
        const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);

        this.setState({
          props: {
            ...this.state.props, //没有啥意义啊？？？？？
            ...stateProps,
            ...dispatchProps
          }
        })
      }
      render() {
        return (<WrapComponent {...this.props} />)
      }
    }
    newComponent.contextType = StoreContext;
    return newComponent;
  }
}