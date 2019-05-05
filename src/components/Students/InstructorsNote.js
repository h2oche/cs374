import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import '../../css/Students/InstructorsNote.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'
import Popup from 'reactjs-popup'
import {Checkbox} from 'react-materialize'
import {Link} from 'react-router-dom'

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
    //TODO: delete on firebase
    window.location.reload();
  }


  render() {
    return (
      <Popup contentStyle={{width: '80%'}} trigger={<button>Delete</button>} position="top right">
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
        Notes:
            [
                {
                    Instructor: 'amy11',
                    Student: 'jinjin',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                },
                {
                    Instructor: 'momo33',
                    Student: 'yujin',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                },
                {
                    Instructor: 'ake1',
                    Student: 'sarah',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                },
                {
                    Instructor: 'tommy11',
                    Student: 'jinjin',
                    Content: 'He is smart',
                    Date: '2019/05/03'
                }
            ]
    }

    renderNoteList = () => {
        var  myNoteExists = false;
        var i =0;
        var noteList = this.state.Notes.map(_note => {
            if(_note.Instructor!==this.props.match.params.instructor_id)
                return <Note data={_note} key={i++}/>
            else
            {
                myNoteExists = true;
                return <MyNote data={_note} key={i++}/>
            }
        });

        if(!myNoteExists)
            noteList.push(
                <div className="AddButtonContainer">
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
                <span className="NoteInstructor">{'• '+this.props.data.Instructor+'\'s Note'}</span>
                <br/>
                <span className="NoteContent">&nbsp;&nbsp;&nbsp;{'- '+this.props.data.Content}</span>
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
                      <Link to={"/BOBO/studentProfile/instructorsNoteAddModify/"+this.props.data.Instructor+
                              '/'+this.props.data.Student}>
                        <button>Modify</button>
                      </Link>
                      <DeletePopup instructor_id={this.props.data.Instructor} student_id={this.props.data.Student}/>
                    </div>
                    <span className="NoteInstructor">{'• '+this.props.data.Instructor+'\'s Note'}</span>
                    <br/>
                    <span className="NoteContent">&nbsp;&nbsp;&nbsp;{'- '+this.props.data.Content}</span>
                </div>
            </div>
        );
    }
}

export default InstructorsNote