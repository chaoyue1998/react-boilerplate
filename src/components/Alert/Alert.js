import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import './Alert.css';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { // define this.state in constructor
      show: this.props.show
    }
  }
  handleCancel() {
    this.props.handleHide();
  }
  handleMakeordery() {
    const data = new FormData();
    //  @param source 必须, 写死"ssdk",因为走的是SDK购买代金券的接口
    // @param qid 必须 用户id
    // @param goodsId 必须 商品id
    // @param type 必须 商品类型 写死 "coupon"
    // @param num 必须 商品数量
    data.append("qid", this.props.data.user.qid);
    data.append("goodsId", this.props.data.card.goods_id);
    data.append("type", "coupon");
    data.append("num", "1");
    data.append("source", "ssdk");
    fetch(`${hostUrl}/9/order/makeorder`, {
      credentials: "include",
      method: 'POST',
      body: data
    }).then((response) => response.json() // eslint-disable-line
    ).then((json) => {
      console.log('parsed json', json)
      if (json.errno === 0) {
        console.log({data: json.data});
        if (typeof QhSDKWebView === 'object' && typeof QhSDKWebView.addCouponMallOrder === 'function') {
          QhSDKWebView.addCouponMallOrder(JSON.stringify(json.data.order));
        } else {
          alert('服务器开小差了~');
          // 一般情况下是客户端版本较低QhSDKWebView.addCouponMallOrder方法不存在
        }
      } else {
        alert("下单失败！")
      }
    }).catch((ex) => {
      alert("下单失败！");
      console.log('parsing failed', ex)
    });
  }
  render() {
    return (
      <div className="alert" style={{
        display: this.props.show
          ? "block"
          : "none"
      }}>
        <div className="alpha"></div>

        {this.props.data.user_notify
          ? (
            <div className="popup">
              <h2 className="title">您已成功购买月卡</h2>
              <h2 className="detail">请到游戏-悬浮窗-福利-月卡中领取每日收益。</h2>
              <Link className="butsm sure-btn" to={`/receive`}>确定</Link>
            </div>
          )
          : (
            <div className="popup">
              <h2 className="title">账号&nbsp;&nbsp;{this.props.data.user.username}</h2>
              <h2 className="price">
                {this.props.data.card.sell_price}
                元
              </h2>
              <h2 className="detail">请确认以上订单信息，虚拟物品交易，不退不换</h2>
              <span className="butsm cancel" onClick={this.handleCancel.bind(this)}>取消</span>
              <span className="butsm sure-btn" onClick={this.handleMakeordery.bind(this)}>
                确认
              </span>
            </div>
          )}
      </div>
    );
  }
}

export default Alert;
