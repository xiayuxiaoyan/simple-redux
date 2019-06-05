import React from 'react';

export class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.StoreContext = React.createContex(props.store);
  }
  render() {
    const { StoreContext } = this;
    const { store } = this.props;
    return (
      // 原封返回子组件
      <StoreContext.Provider value={store}>
        this.props.children
      </StoreContext.Provider>
    );
  }
}