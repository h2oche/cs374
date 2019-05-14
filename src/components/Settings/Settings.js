import React, { Component } from 'react'
import '../../css/Settings/Setting.css'

export class Settings extends Component {
  render() {
    return (
      <div className="content" style={{textAlign: "center"}}>
        <span className="DonationTitle">How can I make contribution?</span>
        <br/>
        <br/>
        <span className="DonationContent">Donation: Woori Bank </span>
        <span className="DonationContent">1002-791-950310, Jungwoo Kim</span>
        <br/>
        <br/>
        <span className="DonationLastWord">Your support is very much appreciated.</span>
      </div>
    )
  }
}

export default Settings
