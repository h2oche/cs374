import React, { Component } from 'react'
import { fire, getFireDB, pushMultipleDB, pushDB, setDB, deleteDB, download_picture} from '../config/fire.js';
import {Redirect} from 'react-router';
import {Button} from 'react-materialize'
import photo from './BOBO_logo.jpeg'

import "../css/login.css"


export class LogIn extends Component {
  state={
      redirect:false,
      target:"Loading...",
      url: "",
      mount:true
  }

  constructor(props) 
  {
    super(props);
  }

  loginSuccess = () => {
      this.setState({target:"/studentList/tommy11",
                      redirect:true});
  }

  render() {
      if(this.state.redirect)
          return (<Redirect to={this.state.target}></Redirect>);
      return (
        <div>
          <div align='center'>
            <img id="logo-image" src={photo} alt="photo" width='150px' height='150px'></img>
          </div>
          <div align='center'>
            <Button id='login-button' onClick={this.loginSuccess} >LogIn!</Button>
          </div>
        </div>
      );
  }
}


export default LogIn