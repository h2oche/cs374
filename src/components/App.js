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
        <Route exact path="/" component={StudentList}/>
        <Route exact path="/classRecord" component={ClassRecord}/>
        <Route exact path="/notice" component={NoticeBoard}/>
        <Route exact path="/settings" component={Settings}/>
        <Menu/>
      </div>
    </Router>
  );
}

export default App;
