import React, {PropTypes} from 'react';
import {IndexLink, Link, hashHistory} from 'react-router';
import './Layout.css';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        layout: 'layout'
      }
    }
  }
  handleDate() {
    console.log(this.state.data.layout);
  }
  componentDidMount() {
    this.handleDate();
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => { // eslint-disable-line
      return React.cloneElement(child, {
        data: this.state.data,
        handleDate: this.handleDate
      })
    });
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

export default Layout;
