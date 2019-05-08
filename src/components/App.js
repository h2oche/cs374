import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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

import { fire} from '../config/fire';
function App() {
  fire();
  return (
    <Router>
      <div className="container">
        <Route exact path="/BOBO" component={StudentList}/>
        <Route path="/BOBO/studentProfile/main/:instructor_id/:student_id" component={StudentProfile}/>
        <Route path="/BOBO/studentProfile/instructorsNote/:instructor_id/:student_id" component={InstructorsNote}/>
        <Route path="/BOBO/studentProfile/instructorsNoteAddModify/:instructor_id/:student_id" component={InstructorsNoteAddModify}/>
        <Route path="/BOBO/studentProfile/classRecord/:instructor_id/:student_id" component={ClassRecord}/>
        <Route path="/BOBO/studentProfile/editClassRecord/:key" component={EditClassRecord}/>
        <Route exact path="/BOBO/classRecord" component={UploadClassRecord}/>
        <Route exact path="/BOBO/addBoard" component={AddBoard}/>
        <Route exact path="/BOBO/board" component={NoticeBoard}/>
        <Route exact path="/BOBO/board/:id/addNotice" component={AddNotice}/>
        <Route exact path="/BOBO/board/:id" component={Board}/>
        <Route exact path="/BOBO/board/:id/notice/:id" component={Notice}/>
        <Route exact path="/BOBO/settings" component={Settings}/>
        <Menu/>
      </div>
    </Router>
  );
}

export default App;
