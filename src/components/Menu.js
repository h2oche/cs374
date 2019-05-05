import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'react-materialize';

import "../css/Menu.css";

export class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="menu-item"><Link to="/BOBO">
          <Icon className="menu-icon" medium='true'>assignment_ind</Icon>
          </Link></div>
        <div className="menu-item"><Link to="/BOBO/classRecord">
          <Icon className="menu-icon" medium='true'>add_box</Icon>
          </Link></div>
        <div className="menu-item"><Link to="/BOBO/board">
          <Icon className="menu-icon" medium='true'>assignment</Icon>
          </Link></div>
        <div className="menu-item"><Link to="/BOBO/settings">
          <Icon className="menu-icon" medium='true'>settings</Icon>
          </Link></div>
      </div>
    )
  }
}

export default Menu
