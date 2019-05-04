import React, { Component } from 'react'
import Topbar from '../Topbar';
import {Row, Col} from 'react-materialize';
import '../../css/Students/StudentProfile.css'
import {Redirect} from 'react-router';

export class StudentProfile extends Component {
    state={
        redirect:false,
        target:""
    }

    redirectToClassRecord = () => {
        this.setState({target:"/BOBO/studentProfile/classRecord/"+this.props.match.params.id,
                        redirect:true});
    }

    redirectToInstructorsNote = () => {
        this.setState({target:"/BOBO/studentProfile/instructorsNote/"+this.props.match.params.id,
                        redirect:true});
    }

    render() {
        if(this.state.redirect)
            return (<Redirect to={this.state.target}></Redirect>);
        return (
        <div style = {{width:"100%"}} className="content">
            <Topbar name="Profile" showBack={true} backTo = "/BOBO/"></Topbar>
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <Demographic />
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <div className="ButtonContainer">
                <button className="Button" 
                        onClick={this.redirectToClassRecord}>
                    Class Record
                </button>
                <br/>
                <button className="Button"
                        onClick={this.redirectToInstructorsNote}>
                    Instructor's Note
                </button>
            </div>
        </div>
        );
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
                <Row className="DemographicRow" style={{paddingTop: '15px', paddingBottom: '15px'}}>
                    <Col className="DemographicCol" s={5}>
                        <div className="ProfileImage" alt="logo"></div>
                    </Col>
                    <Col className="DemographicCol" s={7}>
                        <div className="ProfileTextWrapper">
                            <div className="ProfileText">
                                <span> Name: {this.state.Name}</span>
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
            </div>
        )
    }
}

export default StudentProfile