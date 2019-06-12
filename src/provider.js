import React from 'react';
import { StoreContext } from './StoreContext';

export class Provider extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { store } = this.props;
    return (
      // 原封返回子组件
      <StoreContext.Provider value={{ store }}>
        this.props.children
      </StoreContext.Provider>
    );
  }
}