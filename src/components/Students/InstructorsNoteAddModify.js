import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import '../../css/Students/InstructorsNote.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'
import {Textarea} from 'react-materialize';
import {Link} from 'react-router-dom';
import {Button} from 'react-materialize'

export class InstructorsNoteAddModify extends Component {

  state = {
    textcontent : ""
  }

  handlecontentChange = e=> {
    this.setState({textcontent: e.target.value});
  }

  confirm = ()=> {
    //TODO: UPDATE FIREBASE
    console.log(33);
  }

  render() {
    return (
    <div style = {{width:"100%"}} className="content InstructorsNoteContent">
        <div>
            <Topbar name="Instructor's Note" showBack={true} 
                  backTo = {"/BOBO/studentProfile/instructorsNote/"+this.props.match.params.instructor_id+"/"+
                                this.props.match.params.student_id}></Topbar>
        </div>
        <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
        <Demographic />
        <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
        <Textarea placeholder="Write note on this student"
          onChange={this.handlecontentChange} value={this.state.textcontent} />
          <Link to={"/BOBO/studentProfile/instructorsNote/"+this.props.match.params.instructor_id+"/"+
                      this.props.match.params.student_id}>
            <Button className="close pinkcancelbutton">
              Cancel
            </Button>
            <Button className="close pinkcancelbutton" style={{float:"right"}} onClick={this.confirm}>
              Confirm
            </Button>
          </Link>
    </div>
    );
  }
}

export default InstructorsNoteAddModify