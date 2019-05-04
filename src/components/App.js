import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "materialize-css/dist/css/materialize.css"
import "materialize-css/dist/js/materialize.min.js"

import '../css/App.css'

import Menu from './Menu';
import StudentList from "./Students/StudentList";
import ClassRecord from "./UploadClassRecord/ClassRecord";
import NoticeBoard from "./Notices/BoardList";
import Settings from "./Settings/Settings";
import Board from './Notices/Board';
import AddBoard from "./Notices/AddBoard";
import StudentProfile from "./Students/StudentProfile";
import InstructorsNote from "./Students/InstructorsNote";

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/BOBO" component={StudentList}/>
        <Route path="/BOBO/studentProfile/:id" component={StudentProfile}/>
        <Route path="/BOBO/studentProfile/instructorsNote/:id" component={InstructorsNote}/>
        <Route exact path="/BOBO/classRecord" component={ClassRecord}/>
        <Route exact path="/BOBO/addBoard" component={AddBoard}/>
        <Route exact path="/BOBO/board" component={NoticeBoard}/>
        <Route path="/BOBO/board/:id" component={Board}/>
        <Route exact path="/BOBO/settings" component={Settings}/>
        <Menu/>
      </div>
    </Router>
  );
}

export default App;
