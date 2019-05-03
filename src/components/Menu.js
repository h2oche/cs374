import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../css/Menu.css";

export class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="menu-item"><Link to="/">Student List</Link></div>
        <div className="menu-item"><Link to="/classRecord">Class Record</Link></div>
        <div className="menu-item"><Link to="/notice">Notice</Link></div>
        <div className="menu-item"><Link to="/settings">Settings</Link></div>
      </div>
    )
  }
}

export default Menu
