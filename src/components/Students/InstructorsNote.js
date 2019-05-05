import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import '../../css/Students/InstructorsNote.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'

var DeletePopup =  () => (
    <Popup trigger={<button>Delete</button>} position="top right">
      {close => (
        <div>
          <p>Are you sure to cancel?<br></br><br></br></p>
  
            <button className="close pinkcancelbutton" onClick={close}>No</button>
            <Link to="/BOBO">
              <button className="close pinkcancelbutton" style={{float:"right"}}>
                Yes
              </button>
            </Link>
        </div>
      )}
    </Popup>
)

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
        var noteList = this.state.Notes.map(_note => {
            if(_note.Instructor!==this.props.match.params.id)
                return <Note data={_note}/>
            else
            {
                myNoteExists = true;
                return <MyNote data={_note}/>
            }
        });

        if(!myNoteExists)
            noteList.push(
                <div className="AddButtonContainer">
                    <button className="AddButton">Add Note!</button>
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
                <Topbar name="Instructor's Note" showBack={true} backTo = {"/BOBO/studentProfile/main/"+this.props.match.params.id}></Topbar>
            </div>
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
            <Demographic />
            <hr style = {{width: "360px", border:'none', backgroundColor:'darkgray', height:'2px'}}/>
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
                        <button>Modify</button>
                        <DeletePopup/>
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