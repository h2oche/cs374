import React, { Component } from 'react'
import Topbar from '../Topbar';
import '../../css/Students/StudentProfile.css'
import '../../css/Students/InstructorsNote.css'
import {Redirect} from 'react-router';
import Demographic from './Demographic'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import {Checkbox} from 'react-materialize'

class DeletePopup extends Component {
    state={
        checked:false
    }

    check =(event)=> {
        console.log('pressed');
        var a = !this.state.checked;
        this.setState({checked:a});
        console.log(this.state.checked);
        this.forceUpdate();
    }

    render() {
        return (
            <Popup contentStyle={{width: '80%'}} trigger={<button>Delete</button>} position="top right">
              {close => (
                  <div className="NoteDeleteContainer">
                      <span className="NoteDeleteTitle">
                          Delete Note
                      </span>
                      <br/>
                      {/*<input type="checkbox" onChange={this.checked} checked={this.state.checked}></input>*/}
                      {this.state.checked? (<Checkbox className = "NoteDeleteCheckbox" onChange={this.check} checked/>) : 
                          (<Checkbox className = "NoteDeleteCheckbox" onChange={this.check}/>)}
                      <span className="NoteDeleteWarningText">I hereby understand that I can not recover the deleted note.</span>
                      <br/>
                      <br/>
                      <button >No</button>
                      {this.state.checked? (
                      <Link to={"/BOBO/studentProfile/instructorsNote/"+this.props.instructor+'/' +this.props.student+'/'}>
                          <button className="close pinkcancelbutton" style={{float:"right"}} onClick={close+this.check}>
                              Yes
                          </button>
                      </Link>) : null}
                  </div>
                )
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
                        <button>Modify</button>
                        <DeletePopup instructor={this.props.data.Instructor} student={this.props.data.Student}/>
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