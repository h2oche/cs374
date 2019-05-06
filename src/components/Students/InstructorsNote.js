import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import '../../css/Students/InstructorsNote.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'
import Popup from 'reactjs-popup'
import {Checkbox} from 'react-materialize'
import {Link} from 'react-router-dom'
import { fire, getFireDB, pushMultipleDB, pushDB, setDB, deleteDB} from '../../config/fire';
import '../../css/Common.css'

class DeletePopup extends Component {
  state={
    checked:false,
    open:false
  }

  constructor(props) {
    super(props);
  }

  check =(event)=> {
    this.setState({checked: !this.state.checked});
  }

  deleteNote = () => {
    console.log('/Note/'+this.props.student_id+'/'+this.props.instructor_id);
    deleteDB('/Note/'+this.props.student_id+'/'+this.props.instructor_id);
    window.location.reload();
  }

  closing = () => {
    this.setState({checked: false})
  }

  render() {
    return (
      <Popup contentStyle={{width: '80%'}} trigger={<button>Delete</button>} position="top right" onClose={this.closing}>
        { close => (
          <div className="NoteDeleteContainer">
              <span className="NoteDeleteTitle">
                  Delete Note
              </span>
              <br/>
                <Checkbox className = "NoteDeleteCheckbox" onChange={this.check} label="" value=""/>
              <span className="NoteDeleteWarningText">I hereby understand that I </span>
              <span className="NoteDeleteWarningTextImportant">cannot recover</span>
              <span className="NoteDeleteWarningText"> the deleted note.</span>
              <br/>
              <br/>
                <button className="close pinkcancelbutton" onClick={close}>
                    No
                </button>
              {this.state.checked? (
                <button className="close pinkcancelbutton" style={{float:"right"}} onClick={this.deleteNote}>
                    Yes
                </button>
              ) : null}
          </div>)
        }
      </Popup>
    )
  }
}

export class InstructorsNote extends Component {
    state={
      loaded: false,
      Notes: []
    }

    setNotes = ()=>{
      getFireDB('/Note/'+this.props.match.params.student_id).then(
        result => {
          let notes = [];
          let notesRaw = result.val();
          for(var key in notesRaw) {
            notes.push({Instructor: key, Content: notesRaw[key]});
          }
          this.setState({Notes: notes, loaded:true});
        }
      )
    }

    constructor(props) {
      super(props);
      this.setNotes();
    }

    renderNoteList = () => {
        if(this.state.loaded==false) {
          return (<div  style={{textAlign:"center", fontSize:"20px", fontWeight:"bold"}}>Loading...</div>)
        }

        var myNoteExists = false;
        var i =0;
        var noteList = this.state.Notes.map(_note => {
          console.log(_note);
          if(_note.Instructor!==this.props.match.params.instructor_id)
              return <Note instructor={_note.Instructor} student={this.props.match.params.student_id} 
                            content={_note.Content} key={i++}/>
          else
          {
              myNoteExists = true;
              return <MyNote instructor={_note.Instructor} student = {this.props.match.params.student_id} content={_note.Content} key={i++}/>
          }
        });

        if(!myNoteExists)
            noteList.push(
                <div className="AddButtonContainer" key = {i++}>
                  <Link to={"/BOBO/studentProfile/instructorsNoteAddModify/"+this.props.match.params.instructor_id+
                              '/'+this.props.match.params.student_id}>
                    <button className="AddButton">Add Note!</button>
                  </Link>
                </div>
            );
        return <div className="NoteContainer">{noteList}</div>;
    }

    render() {
        if(this.state.redirect)
            return (<Redirect to={this.state.target}></Redirect>);

        return (
        <div style = {{width:"100%"}} className="content InstructorsNoteContent">
            <div>
                <Topbar name="Instructor's Note" showBack={true} backTo = {"/BOBO/studentProfile/main/"+
                                  this.props.match.params.instructor_id+'/'+this.props.match.params.student_id}></Topbar>
            </div>
            <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <Demographic />
            <hr style = {{width: "100%", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            {this.renderNoteList()}
        </div>
        );
    }
}

class Note extends Component {
    render() {
        return (
            <div className="Note">
                <span className="NoteInstructor">{'• '+this.props.instructor+'\'s Note'}</span>
                <br/>
                <span className="NoteContent">&nbsp;&nbsp;&nbsp;{'- '+this.props.content}</span>
            </div>
        );
    }
}

class MyNote extends Component {
    render() {
        return (
            <div>
                <div className="Note">
                    <div className="MyNoteButton">
                      <Link to={"/BOBO/studentProfile/instructorsNoteAddModify/"+this.props.instructor+
                              '/'+this.props.student}>
                        <button>Modify</button>
                      </Link>
                      <DeletePopup instructor_id={this.props.instructor} student_id={this.props.student}/>
                    </div>
                    <span className="NoteInstructor">{'• '+this.props.instructor+'\'s Note'}</span>
                    <br/>
                    <span className="NoteContent">&nbsp;&nbsp;&nbsp;{'- '+this.props.content}</span>
                </div>
            </div>
        );
    }
}

export default InstructorsNote