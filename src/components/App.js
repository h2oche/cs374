import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import '../css/App.css'

import Menu from './Menu';
import StudentList from "./StudentList";
import ClassRecord from "./ClassRecord";
import NoticeBoard from "./NoticeBoard";
import Settings from "./Settings";

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
