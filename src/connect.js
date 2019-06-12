import React from 'react';
import { StoreContext } from './StoreContext';

// connect 高阶函数，返回一个函数(接收组件作为参数)，函数返回一个组件
export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (aComponent) => {
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
        this.setState({
          props: {
            ...this.state.props,
            ...stateProps
          }
        })
      }
    }
    newComponent.contextType = StoreContext;
    return newComponent;
  }
}