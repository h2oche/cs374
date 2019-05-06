import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic';
import '../../css/Common.css'
import {Button} from 'react-materialize'

export class StudentProfile extends Component {
    state={
        redirect:false,
        target:""
    }

    redirectToClassRecord = () => {
        this.setState({target:"/BOBO/studentProfile/classRecord/"+this.props.match.params.instructor_id
                                  + '/' +this.props.match.params.student_id,
                        redirect:true});
    }

    redirectToInstructorsNote = () => {
        this.setState({target:"/BOBO/studentProfile/instructorsNote/"+this.props.match.params.instructor_id
                                  +'/'+this.props.match.params.student_id,
                        redirect:true});
    }

    render() {
        if(this.state.redirect)
            return (<Redirect to={this.state.target}></Redirect>);
        return (
        <div style = {{width:"100%"}} className="content studentProfileContent">
            <Topbar name="Profile" showBack={true} backTo = "/BOBO/"></Topbar>
            <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <Demographic />
            <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <div className="ButtonContainer">
                <Button className="Button CommonButton" 
                        onClick={this.redirectToClassRecord}>
                    Class Record
                </Button>
                <br/>
                <Button className="Button CommonButton"
                        onClick={this.redirectToInstructorsNote}>
                    Instructor's Note
                </Button>
            </div>
        </div>
        );
    }
}


export default StudentProfile