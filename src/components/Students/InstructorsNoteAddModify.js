import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import '../../css/Students/InstructorsNote.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'
import {Textarea} from 'react-materialize';
import {Link} from 'react-router-dom';
import {Button} from 'react-materialize'
import { pushDB, deleteDB, updateChild } from '../../config/fire';
import '../../css/Common.css'
import {getFireDB} from '../../config/fire.js'

export class InstructorsNoteAddModify extends Component {

  state = {
    textcontent : "",
    loaded: false
  }

  constructor(props) {
    super(props);
    getFireDB('/Note/'+this.props.match.params.student_id+'/'+this.props.match.params.instructor_id).then(
      result => {
        this.setState({textcontent: result.val(), loaded: true})
      }
    )
  }

  handlecontentChange = e=> {
    this.setState({textcontent: e.target.value});
  }

  confirm = ()=> {
    if(this.state.textcontent.length!=0)
    {
      updateChild('/Note/'+this.props.match.params.student_id, this.props.match.params.instructor_id, this.state.textcontent);
      return;
    }
    else
    {
      deleteDB('/Note/'+this.props.match.params.student_id+'/'+this.props.match.params.instructor_id);
    }
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
        {this.state.loaded?
        <div className="NoteContainer">
          <div style={{width: "100%", display: "table", textAlign:"center"}}>
            <Textarea placeholder="Write note on this student" style={{width: "90%", display: "table-cell"}}
              onChange={this.handlecontentChange} value={this.state.textcontent} />
          </div>
          <Link to={"/BOBO/studentProfile/instructorsNote/"+this.props.match.params.instructor_id+"/"+
                      this.props.match.params.student_id}>
            <Button className="CommonButton" style={{marginLeft: "20px"}} >
              Cancel
            </Button>
            <Button className="CommonButton" style={{marginRight: "20px", float:"right"}} onClick={this.confirm}>
              Confirm
            </Button>
          </Link>
        </div> : (<div  style={{textAlign:"center", fontSize:"20px", fontWeight:"bold"}}>Loading...</div>)
        }
    </div>
    );
  }
}

export default InstructorsNoteAddModify