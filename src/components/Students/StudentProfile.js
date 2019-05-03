import React, { Component } from 'react'
import '../../css/StudentProfile.css'
import Topbar from '../Topbar';
import logo from './profile_pic.JPG'
import {Row, Col} from 'react-materialize'

export class StudentProfile extends Component {
  render() {
    return (
      <div style = {{width:"100%"}} className="content">
        <Topbar name="Profile" showBack={true} backTo = "/BOBO/"></Topbar>
        <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
        <Demographic />
        <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
      </div>
    )
  }
}

class Demographic extends Component {
    state = {
        Name: "Tommy",
        Class: "B",
        Age: 3,
        Tel: "010-6859-4898"
    }
    render() {
        return (
            <div className="DemographicContainer">
                <Row style={{marginTop: '15px', marginBotton: '15px'}}>
                    <Col s={5} style={{alignItems: 'center'}}>
                        <img className="ProfileImage" src={logo} alt="logo"></img>
                    </Col>
                    <Col s={7}>
                        <div className="Parent">
                            <div className="ProfileText">
                                <span>{'Name:' + this.state.Name}</span>
                                <br/>
                                <span>Class: {this.state.Class}</span>
                                <br/>
                                <span>Age: {this.state.Age}</span>
                                <br/>
                                <span>Tel: {this.state.Tel}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                    {/* <img className="ProfileImage" src={logo} alt="logo"></img>
                    <div className="ProfileText">
                        <span>{'Name:' + this.state.Name}</span>
                        <br/>
                        <span>Class: {this.state.Class}</span>
                        <br/>
                        <span>Age: {this.state.Age}</span>
                        <br/>
                        <span>Tel: {this.state.Tel}</span>
                    </div> */}
            </div>
            
        )
    }
}

export default StudentProfile