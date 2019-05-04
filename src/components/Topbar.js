import React, { Component } from 'react';
import {Row, Col, Button} from 'react-materialize';
import "../css/Topbar.css";
import {browserHistory} from 'react-router';

export class Topbar extends Component {
  render() {
    return (
      <Row>
        <Col s={12}>
          <div id="topbar-container">
            <span id="topbar">{this.props.name}</span>
            {this.props.showBack ? <Button id="topbar-back-btn" node="a" floating small className="red" waves="light" icon="arrow_back" href={this.props.backTo}/>: <span></span>}
            {this.props.showOptional? this.props.optionalComponent : <span></span>}
          </div>
        </Col>
      </Row>
    )
  }
}

export default Topbar
