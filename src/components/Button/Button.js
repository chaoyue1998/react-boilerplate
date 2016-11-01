import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import './Button.css';

class Button extends Component {

  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  };
  render() {
    const {className, to, href, children, onClick, ...other} = this.props;
    return React.createElement(to
      ? Link
      : (href
        ? 'a'
        : 'span'), {
      ref: node => (this.root = node),
      to,
      href,
      onClick,
      className,
      ...other,
    }, children);
  }
}
export default Button;
