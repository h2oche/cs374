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

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/BOBO" component={StudentList}/>
        <Route exact path="/BOBO/classRecord" component={ClassRecord}/>
        <Route exact path="/BOBO/notice" component={NoticeBoard}/>
        <Route exact path="/BOBO/settings" component={Settings}/>
        <Menu/>
      </div>
    </Router>
  );
}

export default App;
