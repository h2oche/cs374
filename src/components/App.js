import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import "materialize-css/dist/css/materialize.css"
import "materialize-css/dist/js/materialize.min.js"

import '../css/App.css'

import Menu from './Menu';
import StudentList from "./Students/StudentList";
import UploadClassRecord from "./UploadClassRecord/ClassRecord";
import NoticeBoard from "./Notices/BoardList";
import Settings from "./Settings/Settings";
import Board from './Notices/Board';
import AddBoard from "./Notices/AddBoard";
import Notice from './Notices/Notice';
import AddNotice from './Notices/AddNotice';
import StudentProfile from "./Students/StudentProfile";
import InstructorsNote from "./Students/InstructorsNote";
import ClassRecord from "./Students/ClassRecord";
import EditClassRecord from "./Students/EditClassRecord";
import InstructorsNoteAddModify from './Students/InstructorsNoteAddModify';
import LogIn from './LogIn';

import { fire} from '../config/fire';
function App() {
  fire();
  return (
    <Router>
      <div className="container">
        <Route path="/studentList/:instructor_id" component={StudentList}/>
        <Route path="/studentProfile/main/:instructor_id/:student_id" component={StudentProfile}/>
        <Route path="/studentProfile/instructorsNote/:instructor_id/:student_id" component={InstructorsNote}/>
        <Route path="/studentProfile/instructorsNoteAddModify/:instructor_id/:student_id" component={InstructorsNoteAddModify}/>
        <Route path="/studentProfile/classRecord/:instructor_id/:student_id" component={ClassRecord}/>
        <Route path="/studentProfile/editClassRecord/:key" component={EditClassRecord}/>
        <Route exact path="/classRecord" component={UploadClassRecord}/>
        <Route exact path="/addBoard" component={AddBoard}/>
        <Route exact path="/board" component={NoticeBoard}/>
        <Route exact path="/board/:id/addNotice" component={AddNotice}/>
        <Route exact path="/board/:id" component={Board}/>
        <Route exact path="/board/:id/notice/:id" component={Notice}/>
        <Route exact path="/settings" component={Settings}/>
        <Switch>
          <Route exact path="/BOBO" component={LogIn}/>
          <Route exact path="*" component={Menu}/>
        </Switch>   
      </div>
    </Router>
  );
}

export default App;
