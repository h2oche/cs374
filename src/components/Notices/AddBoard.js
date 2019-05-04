import React, { Component } from 'react'
import Topbar from '../Topbar';
import {TextInput, Row, Col, Tabs, Tab, Checkbox, Button} from 'react-materialize';
import "../../css/Notices/AddBoard.css";

export class AddBoard extends Component {
  state = {
    Users: [],
    seletedUsers: new Set(),
  }

  componentDidMount = () => {
    var salt = []; var types = ["instructor", "parent"];
    for(var i = 0 ; i < 20; i++) salt.push(i);
    var id = 0;
    var users = [];
    types.forEach(_type => {
      salt.forEach(_salt => {
        users.push({
          name:_type + " " + _salt,
          id: id++,
          type: _type
        });
      });
    });

    this.setState({Users: users});
  }

  onChange = (e) => {
    var userId = e.target.value;
    if(this.state.seletedUsers.has(userId)) this.state.seletedUsers.delete(userId);
    else this.state.seletedUsers.add(userId);
  }

  renderUserCheckbox = (_type) => {
    var users = this.state.Users.filter(_user => _user.type === _type);
    return users.map(_user => {
      return <Col s={12}><Checkbox value={_user.id.toString()} label={_user.name} onChange={this.onChange}/></Col>
    });
  }

  render() {
    return (
      <div className="content">
        <Topbar name="Add Board" showBack={true} backTo={"/BOBO/board"}/>
        <Row id="add-board-name-row">
          <Col s={12}>
            <TextInput s={12} label="Name"/>
          </Col>
        </Row>
        <Row id="add-board-user-list-row">
          <Col s={12}>
            <Tabs s={12}>
              <Tab title="Instructors">
                {this.renderUserCheckbox("instructor")}
              </Tab>
              <Tab title="Parents">
                {this.renderUserCheckbox("parent")}
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col s={12}>
            <Button waves="light" style={{float:"right"}}>Add</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddBoard
