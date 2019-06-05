import React from 'react';

 const StoreContext = React.createContex(props.store);
// connect 高阶函数，返回一个函数(接收组件作为参数)，函数返回一个组件
export const connect = (mapStateToProps, mapDispatchToProps) => {
  (aComponent) => class newComponent extends React.Component{
    render() {
      return (
        <StoreContext.Consumer>
          
        </StoreContext.Consumer>
      );
    }
  }
}