import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import { Row, Col, Collection, CollectionItem, Autocomplete, Button, Dropdown, Select, Divider } from 'react-materialize';

import Topbar from "../Topbar";
//import StudentListItem from './StudentListItem';
//import ClassListItem from './ClassListItem';
import { fire, getFireDB_arr, getFireDB, download_picture, getPictureURL } from '../../config/fire'
import "../../css/Students/StudentList.css"
import photo from './basic.png'

export class StudentList extends Component {

  state = {
    Students: [],
    CurrentUser: {
      id: 1,
      name: "Juho Kim"
    },
    autocompleteData: { Test: null, Test2: null },
    StudentFiltered: [],
    ClassTable: [],
    curr_instructor: this.props.match.params.instructor_id
  }

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log('teacher:',this.state.curr_instructor)
    var autocompleteData = this.state.Students.reduce((_acc, _student) => {
      return { ..._acc, [_student.name]: null };
    }, {});
    this.setState({ ...this.state, autocompleteData, showAutocomplete: true });
    getFireDB_arr('User/', this, 'Students', 'type', 'parent');
    getFireDB('Class/').then (
      result => {
        console.log("classtable: ",result.val())
        var classtable = result.val();
        this.setState({ ...this.state, ClassTable: result.val() });
      }
    )
  }

  onAutocomplete = (_studentName) => {
    var student = this.state.Students.find(_student => _student.name === _studentName)
    this.setState({ ...this.state, redirect: true, redirectTo: "/BOBO/studentProfile/main/"+this.state.curr_instructor+"/"  }); //FIXME: id instead tommy
  }

  onClassSelection = e => {
    var s = document.getElementById("selection")
    var selectedClass = s.options[s.selectedIndex].text
    console.log("selected class: ",selectedClass)
    var StudentFiltered = this.state.Students.filter(_student => {
      console.log("**", _student.name, _student.class)
      return _student.class === selectedClass
    })
    console.log("filt:",StudentFiltered)
    this.setState({ ...this.state, selectedClass, StudentFiltered, showSelectClass: true });
  }


  renderStudentList = () => {
    return this.state.Students.map(_student => {
      return <StudentListItem data={_student} instructor={this.state.curr_instructor} />
    });
  }

  renderStudentFilteredList = () => {
    console.log('renderfilter:', this.state.StudentFiltered)
    return this.state.StudentFiltered.map(_student => {
      return <StudentListItem data={_student} instructor={this.state.curr_instructor} />
    });
  }

  renderClassList = () => {
    return this.state.ClassTable.map(_class => {
      return <ClassListItem data={_class}/>
    });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div className='content student-list-content'>
        <div><Topbar id='class-record-topbar' name="Student List" /> </div>
        { /* search */}
        <Row id="student-list-search-row">
          <Col s={12}>
            {this.state.showAutocomplete ?
              <Autocomplete
                options={{ data: this.state.autocompleteData, onAutocomplete: this.onAutocomplete }}
                placeholder="Search by student name"
                icon="search"
                s={12} /> :
              <span></span>
            }
          </Col>
        </Row>

        {/* select class */}
        <Row id="select-class-row" style={{ alignItems: 'center' }}>
          <Col s={12}>
            <Select
              id='selection'
              onChange={this.onClassSelection}
              style={{ width: '100%' }}>
              <option value="" disabled selected>Select a class</option>
              {this.renderClassList()}
            </Select>
          </Col>
        </Row>

        {/* show student list */}
        <Row id="show-student-list-row">
          <Col className="showStudentList" s={12}>
            {this.state.showSelectClass ?
              <Collection>
                {this.renderStudentFilteredList()}
              </Collection>
              :
              <Collection>
                {this.renderStudentList()}
              </Collection>
            }
          </Col>
        </Row>
      </div>
    )
  }
}


class ClassListItem extends Component {
  render() {
    return (
      <option value={this.props.data} onClick>
        {this.props.data}
      </option>
    )
  }
}


class StudentListItem extends Component {
  constructor(props){
    super(props);
    fire();
    this.state={
      url: "",
      mount:true,
      originurl: "",
    }
  }
  
  givesrc = (name) => {
    getPictureURL(name, this);
    if(this.state.url)
      return download_picture(this.state.url,this);
  }

  shouldComponentUpdate() {
    return this.state.mount;
  }
  
  render() {
    this.givesrc(this.props.data.name);
        
    return (
      <CollectionItem className="student" href={"/BOBO/studentProfile/main/" +this.props.instructor +'/'+this.props.data.id}>
        <Row className="studentChild" style={{ marginTop: '0px', marginBotton: '0px', height: '70px' }}>
          {/* profile image */}
          <Col s={3} style={{ alignItems: 'center' }}>
            {/* <img className="profileImage" id="profile" src={purl} alt="photo" width='70px' height='70px'></img> */}
            <img className="profileImage" src={ this.state.url===this.state.originurl ? photo : this.state.url} alt="photo" width='70px' height='70px'></img>
          </Col>
          {/* name and class */}
          <Col className="studentItem" s={9} >
            <div className="studentItemChild">
              <div className='studentName'>{this.props.data.name}</div>
              <br></br>
              {this.props.data.class}
            </div>
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}


export default StudentList