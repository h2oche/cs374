import React, { Component } from 'react';
import Topbar from "../Topbar";
import { Row, Col, Collection, Autocomplete, Button, Dropdown, Divider, Icon } from 'react-materialize';
import StudentListItem from './StudentListItem';
import ClassListItem from './ClassListItem';
import { Redirect } from 'react-router';


import "../../css/Students/StudentList.css"
import { resolveMx } from 'dns';
export class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Students: [{
        id: "tommy",
        name: "Yun SangJin",
        class: "class A",
      }, {
        id: "runxia",
        name: "Park Yunha",
        class: "class C",
      }, {
        id: "heather11",
        name: "Heather Park",
        class: "class C",
      }, {
        id: "jinjin",
        name: "Jin Ryu",
        class: "class B",
      }, {
        id: "jungwow",
        name: "Woo-Woo",
        class: "class B",
      }, {
        id: "mini",
        name: "Min Ahn",
        class: "class A",
      }
      ],
      CurrentUser: {
        id: 1,
        name: "Juho Kim"
      },
      ClassTable: [{
        id: 1,
        className: "class A",
        attendee: ["Boradolee", "ddubi11", "nana", "bobo"]//FIXME: id of the students in the class (instead name)
      }, {
        id: 2,
        className: "class B",
        attendee: ["jinjin", "mini", "heather11"]
      }, {
        id: 3,
        className: "class C",
        attendee: ["Yunha", "sangjin", "woo-woo"]
      },{
        id: 4,
        className: "class D",
        attendee: ["Yunha", "sangjin", "woo-woo"]
      },{
        id: 5,
        className: "class E",
        attendee: ["Yunha", "sangjin", "woo-woo"]
      },{
        id: 6,
        className: "class F",
        attendee: ["Yunha", "sangjin", "woo-woo"]
      }
      ],
      autocompleteData: { Test: null, Test2: null },
    }
  }

  componentDidMount = () => {
    var autocompleteData = this.state.Students.reduce((_acc, _student) => {
      return { ..._acc, [_student.name]: null };
    }, {});
    var studentFiltered = this.state.Students.reduce((_acc, _student) => {
      return { ..._acc, [_student.class]: null };
    }, {});
    this.setState({ ...this.state, autocompleteData, showAutocomplete: true, studentFiltered });
  }

  onAutocomplete = (_studentName) => {
    var student = this.state.Students.find(_student => _student.name === _studentName)
    this.setState({ ...this.state, redirect: true, redirectTo: "/BOBO/StudentProfile/main/tommy" }); //FIXME: id instead tommy
    console.log('tommy')
  }

  renderStudentList = () => {
    return this.state.Students.map(_student => {
      return <StudentListItem data={_student} />
    });
  }

  renderClassList = () => {
    return this.state.ClassTable.map(_class => {
      return <ClassListItem data={_class} />
    });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirectTo} />

    return (
      <div>
        <Topbar name="Student List" showBack={true} backTo="/BOBO" />
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
        <Row id="select-class-row">
          <Col s={12}>
            <Dropdown s={12} trigger={<Button>▼ Select a Class</Button>} >
              <Collection style={{ height: '200px', overflow: "scroll"}}>
                {this.renderClassList()}
              </Collection>
            </Dropdown>
          </Col>
        </Row>

        {/* show student list */}
        <Row id="show-student-list-row">
          <Col className="showStudentList" s={12}>
            <Collection>
              {this.renderStudentList()}
            </Collection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StudentList
