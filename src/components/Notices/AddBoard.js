import React, { Component } from 'react'
import Topbar from '../Topbar';
import {TextInput, Row, Col, Tabs, Tab, Checkbox, Button} from 'react-materialize';
import "../../css/Notices/AddBoard.css";
import {Redirect} from 'react-router';
import { fire, getFireDB, pushMultipleDB, pushDB} from '../../config/fire';

export class AddBoard extends Component {
  state = {
    Users: [],
    CurrentUser: {
      id: 1,
      name: "안승민"
    },
    seletedUsers: new Set(),
    redirect: false,
    redirectTo: "/BOBO/board"
  }

  constructor(props) {
    super(props);
    fire();
  }

  componentDidMount = () => {
    // var salt = []; var types = ["instructor", "parent"];
    // for(var i = 0 ; i < 20; i++) salt.push(i);
    // var id = 0;
    // var users = [];
    // types.forEach(_type => {
    //   salt.forEach(_salt => {
    //     users.push({
    //       name:_type + " " + _salt,
    //       id: id++,
    //       type: _type
    //     });
    //   });
    // });

    // this.setState({Users: users});

    getFireDB()
    .then(_res => {
      let DB = _res.val();
      var Users = [];
      var nextBoardId = 0;
      for(var key in DB.User) {
        if(DB.User[key].id != this.state.CurrentUser.id)
          Users.push(DB.User[key]);
      }

      for(var key in DB.Board){
        var boardId = DB.Board[key].id;
        if(boardId > nextBoardId) nextBoardId = boardId;
      }
      nextBoardId++;
      this.setState({...this.state, Users, nextBoardId});
    });
  }

  onChkBoxChange = (e) => {
    var userId = e.target.value;
    if(this.state.seletedUsers.has(userId)) this.state.seletedUsers.delete(userId);
    else this.state.seletedUsers.add(userId);
  }

  onNameChange = (e) => {
    this.setState({...this.state, [e.target.id]:e.target.value});
  }

  addBoard = () => {
    console.log(this.state.seletedUsers);
    console.log(this.state.boardName);
    var nextBoardId = this.state.nextBoardId;
    var BUobjs = [{boardId: nextBoardId, userId: this.state.CurrentUser.id}];
    this.state.seletedUsers.forEach(_userId => {
      BUobjs.push({boardId: nextBoardId, userId: _userId * 1});
    });
    pushDB("Board", {id: nextBoardId, name: this.state.boardName})
    .then(_res => {
      return pushMultipleDB("BoardUserMap", BUobjs);
    })
    .then(_res => {
      this.setState({...this.state, redirect: true});
    });
  }

  renderUserCheckbox = (_type) => {
    var users = this.state.Users.filter(_user => _user.type === _type);
    return users.map(_user => {
      return <Col s={12}><Checkbox value={_user.id.toString()} label={_user.name} onChange={this.onChkBoxChange}/></Col>
    });
  }

  render() {
    if(this.state.redirect)
      return <Redirect to={this.state.redirectTo}/>

    return (
      <div className="content">
        <Topbar name="Add Board" showBack={true} backTo={"/BOBO/#/board"}/>
        <Row id="add-board-name-row">
          <Col s={12}>
            <TextInput s={12} id="boardName" label="Name" onChange={this.onNameChange}/>
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
            <Button className="CommonButton" waves="light" style={{float:"right"}} onClick={this.addBoard}>Add</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddBoard
