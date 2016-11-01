import React from 'react';
import {Link} from 'react-router';

import './style.css';
import Button from '../../components/Button';

import bgSrc from '../../assets/img/buyyk_bg.jpg';

class Receive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click_status: 1
    }
  }
  handleClick() {
    alert(this.state.click_status)
  }
  render() {
    return (
      <div>
        <img className="bgImg" src={bgSrc}/>
        <div className="cont">
          <Button children="领取" className="button orange" onClick={this.handleClick.bind(this)}/>
        </div>
      </div>
    );
  }
}
export default Receive;
