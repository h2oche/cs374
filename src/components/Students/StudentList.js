import React, { Component } from 'react';
import Topbar from "../Topbar";
import {Row, Col, Collection, Autocomplete} from 'react-materialize';
import StudentListItem from './StudentListItem';
import {Redirect} from 'react-router';


import "../../css/Students/StudentList.css"
export class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Students : [ {
          id: 1,
          name: "Yun SangJin",
          class: "class A",
        },{
          id: 2,
          name: "Park Yunha",
          class: "class C",
        },{
          id: 3,
          name: "Heather Park",
          class: "class C",
        },{
          id: 4,
          name: "Jin Ryu",
          class: "class B",
        },{
          id: 5,
          name: "Woo-Woo",
          class: "class B",
        },{
          id: 6,
          name: "Min Ahn",
          class: "class A",
        }
      ],
      CurrentUser : {
        id: 1,
        name: "Juho Kim"
      },
      autocompleteData: {Test:null, Test2:null},
    }
  }

  componentDidMount = () => {
    var autocompleteData = this.state.Students.reduce( (_acc, _student) => {
      return {..._acc, [_student.name]:null};
    }, {});
    this.setState({...this.state, autocompleteData, showAutocomplete:true});
  }

  onAutocomplete = (_studentName) => {
    var student = this.state.Students.find(_student => _student.name === _studentName) //FIXME: id instead name
    this.setState({ ...this.state, redirect: true, redirectTo: "/BOBO/StudentList/Profile/"}); 
    //FIXME: "/BOBO/StudentList/Profile/" + student.id
  }

  renderStudentList = () => {
    return this.state.Students.map(_student => {
      return <StudentListItem data = {_student} />
    });
  }

  render() {
    if(this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div className="content">
        <Topbar name="Student List" showBack={true} backTo="/BOBO"/>
        { /* search */} 
        <Row id="student-list-search-row">
          <Col s={12}>
            {this.state.showAutocomplete ?
              <Autocomplete options={{data: this.state.autocompleteData}} placeholder="Search by student name" icon="search" s={12}/> :
              <span></span>
            }
          </Col>
        </Row>
        {/* select class */}

        {/* show student list */}
        <Row>
          <Col s={12}>
            <Collection /*style={{alignItems: 'center'}}*/>
              {this.renderStudentList()}
            </Collection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StudentList
