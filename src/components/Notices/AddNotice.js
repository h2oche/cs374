import React, { Component } from 'react';
import Topbar from '../Topbar';
import {TextInput, Row, Col, Textarea, Checkbox, RadioGroup, DatePicker, Button} from 'react-materialize';
import "../../css/Notices/AddNotice.css";
import {Redirect} from 'react-router';
import { fire, getFireDB, pushMultipleDB, pushDB} from '../../config/fire';

export class AddNotice extends Component {
  state = {
    CurrentUser: {
      id: 1,
    },
    important: false,
    persistent: false,
    type: "homework",
    redirect: false,
    redirectTo: "",
  }

  constructor(props) {
    super(props);
    fire();
  }

  getBoardId = () => {
    return this.props.match.params.id;
  }

  componentDidMount() {
    console.log(this.props);
    getFireDB().then(_res => {
      let DB = _res.val();
      console.log(DB);
      var nextNoticeId = 0;
      for(var key in DB.Notice) {
        var noticeId = DB.Notice[key].id;
        if(noticeId > nextNoticeId)
          nextNoticeId = noticeId;
      }
      nextNoticeId++;
      this.nextNoticeId = nextNoticeId;
    });
  }

  onChange = (e) => {
    this.setState({...this.state, [e.target.id]:e.target.value});
  }

  onImportantChange = (e) => {
    this.setState({...this.state, important: !this.state.important});
  }

  onPersistentChange = (e) => {
    this.setState({...this.state, persistent: !this.state.persistent});
  }

  onExpireDateChange = (e) => {
    this.setState({...this.state, expireDate: e});
  }

  onTypeChange = (e) => {
    this.setState({...this.state, type: e.target.value});
  }

  onNoticeAdd = () => {
    console.log(this.state);
    var obj = {...this.state};
    obj.id = this.nextNoticeId;
    obj.userId = this.state.CurrentUser.id;
    obj.expireDate = obj.expireDate.getTime();
    obj.createDate = new Date().getTime();
    obj.boardId = this.getBoardId() * 1;
    obj.name = obj.noticeName;
    obj.content = obj.noticeContent;
    
    delete obj.redirect;
    delete obj.redirectTo;
    delete obj.CurrentUser;
    delete obj.noticeName;
    delete obj.noticeContent;

    pushDB("Notice", obj)
    .then(_res => {
      this.setState({...this.state, redirect: true, redirectTo: "/BOBO/board/" + this.getBoardId()});
    });
  }

  render() {
    if(this.state.redirect)
      return <Redirect to={this.state.redirectTo}/>

    return (
      <div className="content">
        <Topbar name="Add Notice" showBack={true} backTo={"/BOBO/board/" + this.getBoardId()}/>
        <Row id="add-notice-name-row">
          <Col s={12}>
            <TextInput s={12} id="noticeName" label="Name" onChange={this.onChange}/>
          </Col>
          <Col s={12}>
            <Textarea
              id="noticeContent" s={12}
              placeholder="Write some notices in here"
              onChange={this.onChange}/>
          </Col>
        </Row>
        <Row id="add-notice-info-row">
          <Col s={6}>
            <Checkbox value="important" id="important" label="important!" onChange={this.onImportantChange}/>
          </Col>
          <Col s={6}>
            <Checkbox value="persistent" id="persistent" label="persistent" onChange={this.onPersistentChange}/>
          </Col>
          <Col s={12} style={{marginTop: "10px"}}>
            <DatePicker s={12} onChange={this.onExpireDateChange} label="Expire Date"/>
          </Col>
          <Col s={12} id="add-notice-type-col">
            <RadioGroup
              id="type"
              name="type"
              label="type"
              value="homework"
              onChange={this.onTypeChange}
              options={[{label: "homework", value:"homework"},
                      {label: "schedule", value: "schedule"},
                      {label: "activity", value: "activity"}]}/>
          </Col>
          
          <Col s={12}>
            <Button className="CommonButton" style={{float: "right"}} onClick={this.onNoticeAdd}>Add</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddNotice
